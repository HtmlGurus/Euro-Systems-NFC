import { CompanyProfile } from '../models/companyProfile.model.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  replaceImage,
  removeImage,
  attachPresignedImageUrl,
} from '../utils/imageHelper.js';
import { Department } from '../models/department.model.js';
import { Employee } from '../models/employee.model.js';
import { Admin } from '../models/admin.model.js';

// Create Company Profile
export const createCompanyProfile = asyncWrapper(async (req, res, next) => {
  const { company_name, website_link, established, address, button_name, button_redirect_url } =
    req.body;

  if (!req.file) {
    return next(new CustomError(HTTP_STATUS.BAD_REQUEST, 'Profile image is required'));
  }

  const existingProfile = await CompanyProfile.findOne();
  if (existingProfile) {
    return next(new CustomError(HTTP_STATUS.BAD_REQUEST, 'Company profile already exists'));
  }

  const companyProfile = new CompanyProfile({
    company_name,
    website_link,
    established,
    address,
    button_name,
    button_redirect_url,
    created_by: req.admin.id,
  });

  await replaceImage(companyProfile, req.file.buffer, 'company-profile', 'profile_image');
  await companyProfile.save();
  await attachPresignedImageUrl(companyProfile, 'profile_image');

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: 'Company profile created successfully',
    company_profile: companyProfile,
  });
});

// Get Company Profile
export const getCompanyProfile = asyncWrapper(async (req, res, next) => {
  const companyProfile = await CompanyProfile.findOne()
    .populate('created_by', 'full_name email')
    .populate('updated_by', 'full_name email');

  if (!companyProfile) {
    return next(new CustomError(HTTP_STATUS.NOT_FOUND, 'Company profile not found'));
  }

  await attachPresignedImageUrl(companyProfile, 'profile_image');

  res.status(HTTP_STATUS.OK).json({
    success: true,
    company_profile: companyProfile,
  });
});

// Update Company Profile
export const updateCompanyProfile = asyncWrapper(async (req, res, next) => {
  const { company_name, address } = req.body;

  const companyProfile = await CompanyProfile.findOne();
  if (!companyProfile) {
    return next(new CustomError(HTTP_STATUS.NOT_FOUND, 'Company profile not found'));
  }

  let updated = false;

  if (company_name && company_name !== companyProfile.company_name) {
    companyProfile.company_name = company_name;
    updated = true;
  }

  if (address && address !== companyProfile.address) {
    companyProfile.address = address;
    updated = true;
  }

  const optionalFields = ['website_link', 'established', 'button_name', 'button_redirect_url'];
  for (const field of optionalFields) {
    if (field in req.body && req.body[field] !== companyProfile[field]) {
      companyProfile[field] = req.body[field];
      updated = true;
    }
  }

  if (req.file) {
    await replaceImage(companyProfile, req.file.buffer, 'company-profile', 'profile_image');
    updated = true;
  } else if (
    'profile_image' in req.body &&
    (!req.body.profile_image || req.body.profile_image === 'null')
  ) {
    await removeImage(companyProfile, 'profile_image');
    updated = true;
  }

  if (!updated) {
    await attachPresignedImageUrl(companyProfile, 'profile_image');
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Company profile updated successfully',
      company_profile: companyProfile,
    });
  }

  companyProfile.updated_by = req.admin.id;
  await companyProfile.save();
  await attachPresignedImageUrl(companyProfile, 'profile_image');

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Company profile updated successfully',
    company_profile: companyProfile,
  });
});


// Delete Company Profile
export const deleteCompanyProfile = asyncWrapper(async (req, res, next) => {
  const companyProfile = await CompanyProfile.findOne();
  if (!companyProfile) {
    return next(new CustomError(HTTP_STATUS.NOT_FOUND, 'Company profile not found'));
  }

  const hasDepartments = await Department.exists({});
  const hasAdmins = await Admin.exists({ role: 'admin' });
  const hasEmployees = await Employee.exists({});

  if (hasDepartments || hasAdmins || hasEmployees) {
    return next(
      new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        'Cannot delete company profile while departments, admins, or employees exist'
      )
    );
  }

  await removeImage(companyProfile, 'profile_image');
  await companyProfile.deleteOne();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: 'Company profile deleted successfully',
  });
});
