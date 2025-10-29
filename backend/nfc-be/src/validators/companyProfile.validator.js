import { body } from 'express-validator';
import validator from 'validator';

export const validateCreateCompanyProfile = [
  body('company_name')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 150 })
    .withMessage('Company name must not exceed 150 characters'),

  body('website_link')
    .optional()
    .trim()
    .custom((value) => !value || validator.isURL(value))
    .withMessage('Invalid website URL')
    .customSanitizer((value) => value?.toLowerCase()),

  body('established')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Established field must not exceed 30 characters'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),

  body('button_name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Button name must not exceed 50 characters'),

  body('button_redirect_url')
    .optional()
    .trim()
    .custom((value) => !value || validator.isURL(value))
    .withMessage('Invalid redirect URL')
    .customSanitizer((value) => value?.toLowerCase()),
];

export const validateUpdateCompanyProfile = [
  body('company_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Company name cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Company name must not exceed 150 characters'),

  body('website_link')
    .optional()
    .trim()
    .custom((value) => !value || validator.isURL(value))
    .withMessage('Invalid website URL')
    .customSanitizer((value) => value?.toLowerCase()),

  body('established')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Established field must not exceed 30 characters'),

  body('address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Address must not exceed 500 characters'),

  body('button_name')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Button name must not exceed 50 characters'),

  body('button_redirect_url')
    .optional()
    .trim()
    .custom((value) => !value || validator.isURL(value))
    .withMessage('Invalid redirect URL')
    .customSanitizer((value) => value?.toLowerCase()),
];
