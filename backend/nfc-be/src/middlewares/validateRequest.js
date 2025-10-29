import { validationResult } from 'express-validator';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationError = new CustomError(
      HTTP_STATUS.BAD_REQUEST,
      errors.array()[0].msg
    );
    validationError.array = () => errors.array();
    return next(validationError);
  }

  next();
};