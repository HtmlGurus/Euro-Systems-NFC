import { Admin } from '../models/admin.model.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { generateToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';
import { attachPresignedImageUrl } from '../utils/imageHelper.js';
import { formatAdminResponse } from '../utils/formatAdminResponse.js';

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError(HTTP_STATUS.BAD_REQUEST, 'Email and password are required'));
  }

  const normalizedEmail = email.trim().toLowerCase();

  const admin = await Admin.findOne({ email: normalizedEmail }).select('+password +email_verified');

  if (!admin) {
    return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Your email address or password is incorrect, please try again'));
  }

  if (admin.is_deleted) {
    return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Your account has been deactivated, please contact support'));
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Your email address or password is incorrect, please try again'));
  }

  const includeImage = admin.role !== 'super-admin';
  if (includeImage) {
    await attachPresignedImageUrl(admin);
  }

  const token = generateToken({ id: admin._id, role: admin.role });

  if (!admin.email_verified) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Please enter the verification code sent to your email to continue.',
      requires_verification: true,
      token,
      admin: formatAdminResponse(admin, includeImage),
    });
  }

  admin.last_login = new Date();
  await admin.save();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Login successful',
    token,
    admin: formatAdminResponse(admin, includeImage),
  });
});
