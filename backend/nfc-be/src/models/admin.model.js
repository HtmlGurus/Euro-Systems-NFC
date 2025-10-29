import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { imageSchema } from './shared/imageSchema.js';
import { auditFields } from './shared/auditFields.js';
import { baseSchemaOptions } from './shared/baseSchemaOptions.js';

const adminSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [3, 'Full name must be at least 3 characters long'],
      maxlength: [100, 'Full name must not exceed 100 characters'],
      validate: {
        validator: function (value) {
          return /^[A-Za-z][A-Za-z0-9\s]*$/.test(value);
        },
        message: 'Full name must start with a letter and can include letters, numbers, and spaces',
      },
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
    phone_number: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function (v) {
          const digitsOnly = v.replace(/\D/g, '');
          const phoneRegex = /^\+?[0-9\-]+$/;
          return digitsOnly.length >= 7 && digitsOnly.length <= 15 && phoneRegex.test(v);
        },
        message: 'Invalid phone number format',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      validate: {
        validator: (pw) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/.test(pw),
        message:
          'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character',
      },
      select: false,
    },
    role: {
      type: String,
      enum: ['super-admin', 'admin'],
      default: 'admin',
      immutable: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    profile_image: imageSchema,
    email_verified: {
      type: Boolean,
      default: false,
    },

    email_verification_code: {
      type: String,
      default: null,
      select: false,
    },
    email_verification_expires: {
      type: Date,
      default: null,
      select: false,
    },
    verified_email_at: {
      type: Date,
      default: null,
    },
    ...auditFields,
    last_login: {
      type: Date,
      default: null,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CompanyProfile',
      required: function () {
        return this.role === 'admin';
      },
    },
  },
  baseSchemaOptions
);

adminSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { is_deleted: false },
    name: 'partial_unique_email',
  }
);

adminSchema.index(
  { phone_number: 1 },
  {
    unique: true,
    partialFilterExpression: { is_deleted: false },
    name: 'partial_unique_phone_number',
  }
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update?.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }
  this.setOptions({ runValidators: true });
  next();
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Admin = mongoose.model('Admin', adminSchema);
