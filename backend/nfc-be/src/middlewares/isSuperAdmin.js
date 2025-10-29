import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const isSuperAdmin = (req, res, next) => {
  const admin = req.admin;

  if (!admin || admin.role !== 'super-admin' || !admin.email_verified) {
    return next(new CustomError(HTTP_STATUS.FORBIDDEN, 'Access denied, you are not allowed to access this resource!'));
  }

  next();
};
