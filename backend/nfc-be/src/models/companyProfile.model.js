import mongoose from 'mongoose';
import validator from 'validator';
import { imageSchema } from './shared/imageSchema.js';
import { auditFields } from './shared/auditFields.js';
import { baseSchemaOptions } from './shared/baseSchemaOptions.js';

const companyProfileSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [150, 'Company name must not exceed 150 characters'],
    },
    website_link: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: 'Invalid website URL',
      },
    },
    established: {
      type: String,
      trim: true,
      maxlength: [30, 'Established field must not exceed 30 characters'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxlength: [500, 'Address must not exceed 500 characters'],
      trim: true,
    },
    button_name: {
      type: String,
      trim: true,
      maxlength: [50, 'Button name must not exceed 50 characters'],
    },
    button_redirect_url: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => !value || validator.isURL(value),
        message: 'Invalid redirect URL',
      },
    },
    profile_image: {
      type: imageSchema,
    },
    ...auditFields,
  },
  baseSchemaOptions
);

export const CompanyProfile = mongoose.model('CompanyProfile', companyProfileSchema);
