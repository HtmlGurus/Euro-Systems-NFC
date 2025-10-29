import { body, param } from 'express-validator';
import mongoose from 'mongoose';

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);
const isValidEmployeeIdentifier = (value) =>
  mongoose.Types.ObjectId.isValid(value) || /^ES\d+$/i.test(value);

export const validateCreateEmployee = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Employee name is required')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Name can be up to 100 characters')
    .bail()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .withMessage('Name must contain only alphabetic characters and optional single spaces'),

  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[0-9\-]+$/)
    .withMessage('Phone number must contain only digits, hyphens, and an optional leading +')
    .custom((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        throw new Error('Phone number must be between 7 and 15 digits');
      }
      return true;
    }),

  body('second_phone_number')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\-]+$/)
    .withMessage('Second phone number must contain only digits, hyphens, and an optional leading +')
    .custom((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        throw new Error('Second phone number must be between 7 and 15 digits');
      }
      return true;
    }),

  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .bail()
    .isNumeric()
    .withMessage('Age must be a number')
    .bail()
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be between 18 and 100'),

  body('joining_date')
    .notEmpty()
    .withMessage('Joining date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid joining date'),

  body('designation')
    .trim()
    .notEmpty()
    .withMessage('Designation is required')
    .bail()
    .custom((value) => {
      if (/^\d+$/.test(value)) {
        throw new Error('Designation cannot be only numbers');
      }
      return true;
    }),

  body('department_id')
    .notEmpty()
    .withMessage('Department is required')
    .custom((value) => isValidObjectId(value))
    .withMessage('Invalid department ID'),

  body('about_me')
    .trim()
    .notEmpty()
    .withMessage('About me is required')
    .isLength({ max: 500 })
    .withMessage('About me can be up to 500 characters'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10, max: 300 })
    .withMessage('Address must be between 10 and 300 characters'),

  body('social_links.facebook')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Facebook URL'),

  body('social_links.twitter')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Twitter URL'),

  body('social_links.instagram')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Instagram URL'),

  body('social_links.youtube')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid YouTube URL'),

  body('social_links.linkedin')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Linkedin URL'),
];

export const validateUpdateEmployee = [
  param('id')
    .custom((value) => isValidEmployeeIdentifier(value))
    .withMessage('Invalid employee ID (must be a valid ObjectId or ES code)'),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Employee name is required')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Name can be up to 100 characters')
    .bail()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
    .withMessage('Name must contain only alphabetic characters and optional single spaces'),

  body('email')
    .optional()
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  body('phone_number')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[0-9\-]+$/)
    .withMessage('Phone number must contain only digits, hyphens, and an optional leading +')
    .custom((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        throw new Error('Phone number must be between 7 and 15 digits');
      }
      return true;
    }),

  body('second_phone_number')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\-]+$/)
    .withMessage('Second phone number must contain only digits, hyphens, and an optional leading +')
    .custom((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        throw new Error('Second phone number must be between 7 and 15 digits');
      }
      return true;
    }),

  body('age')
    .optional()
    .notEmpty()
    .withMessage('Age is required')
    .bail()
    .isNumeric()
    .withMessage('Age must be a number')
    .bail()
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be between 18 and 100'),

  body('joining_date')
    .optional()
    .notEmpty()
    .withMessage('Joining date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid joining date'),

  body('designation')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Designation is required')
    .bail()
    .custom((value) => {
      if (/^\d+$/.test(value)) {
        throw new Error('Designation cannot be only numbers');
      }
      return true;
    }),

  body('department_id')
    .optional()
    .notEmpty()
    .withMessage('Department is required')
    .custom((value) => isValidObjectId(value))
    .withMessage('Invalid department ID'),

  body('about_me')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('About me is required')
    .isLength({ max: 500 })
    .withMessage('About me can be up to 500 characters'),

  body('address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 10, max: 300 })
    .withMessage('Address must be between 10 and 300 characters'),

  body('social_links.facebook')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Facebook URL'),

  body('social_links.twitter')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Twitter URL'),

  body('social_links.instagram')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Instagram URL'),

  body('social_links.youtube')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid YouTube URL'),

  body('social_links.linkedin')
    .optional({ checkFalsy: true })
    .trim()
    .toLowerCase()
    .isURL()
    .withMessage('Invalid Linkedin URL'),
];

export const validateEmployeeId = [
  param('id')
    .custom((value) => isValidEmployeeIdentifier(value))
    .withMessage('Invalid employee ID (must be a valid ObjectId or ES code)'),
];
