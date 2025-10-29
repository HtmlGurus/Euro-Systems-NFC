import jwt from 'jsonwebtoken';
import { envConfig } from '../config/envConfig.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { CustomError } from '../utils/customError.js';
import { Admin } from '../models/admin.model.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const verifyToken = asyncWrapper(async (req, res, next) => {

if (
  req.method === 'GET' &&
  /^\/api\/employees\/[a-fA-F0-9]{24}$/.test(req.originalUrl.split('?')[0])
) {
  return next();
}

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Missing authorization token'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, envConfig.jwt.secret);
    const admin = await Admin.findById(decoded.id).select(
      req.includePassword ? '+password' : '-password'
    );

    if (!admin || admin.is_deleted) {
      return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Access Denied!'));
    }

    req.admin = admin;

    // Allow unverified admins to access only email verification routes
    const allowedPaths = ['/api/admins/send-email-verification', '/api/admins/verify-email'];
    const requestPath = req.originalUrl.split('?')[0];
    const isVerificationRoute = allowedPaths.some((path) => requestPath.endsWith(path));

    // Block regular admins who haven't verified their email
    if (admin.role === 'admin' && !admin.email_verified && !isVerificationRoute) {
      return next(
        new CustomError(
          HTTP_STATUS.FORBIDDEN,
          'Please verify your email address before accessing this resource'
        )
      );
    }

    next();
  } catch (error) {
    return next(new CustomError(HTTP_STATUS.UNAUTHORIZED, 'Invalid or expired token'));
  }
});