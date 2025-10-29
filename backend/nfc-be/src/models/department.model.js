import mongoose from 'mongoose';
import validator from 'validator';
import { imageSchema } from './shared/imageSchema.js';
import { auditFields } from './shared/auditFields.js';
import { baseSchemaOptions } from './shared/baseSchemaOptions.js';

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Department name is required'],
      trim: true,
      maxlength: [100, 'Department name must not exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Invalid email address',
      },
    },
    image: {
      type: imageSchema,
    },
    banner_image: {
      type: imageSchema,
    },
    ...auditFields,
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyProfile',
      required: true,
    },
  },
  baseSchemaOptions
);

departmentSchema.virtual('employees', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'department_id',
});

departmentSchema.virtual('employee_count', {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'department_id',
  count: true,
});

departmentSchema.index({ name: 1 }, { unique: true });
departmentSchema.index({ email: 1 }, { unique: true });

export const Department = mongoose.model('Department', departmentSchema);
