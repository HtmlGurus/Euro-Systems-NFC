import { CompanyProfile } from '../models/companyProfile.model.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const companyProfileExists = asyncWrapper(async (req, res, next) => {
  const companyProfile = await CompanyProfile.findOne();
  if (!companyProfile) {
    return next(
      new CustomError(HTTP_STATUS.FORBIDDEN, 'You need to create a company profile to continue')
    );
  }
  req.companyProfile = companyProfile;
  next();
});
