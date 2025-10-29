import { body, param } from 'express-validator';

export const validateCreateAdmin = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters')
    .matches(/^[A-Za-z][A-Za-z0-9\s]*$/)
    .withMessage('Name must start with a letter and can include letters, numbers, and spaces'),

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

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least one special character'),
];

export const validateUpdateAdmin = [
  param('id').isMongoId().withMessage('Invalid admin ID'),

  (req, res, next) => {
    const updatableFields = ['full_name', 'email', 'phone_number'];
    const hasValidField = updatableFields.some((field) => {
      const value = req.body[field];
      return typeof value === 'string' && value.trim() !== '';
    });

    if (!hasValidField && !req.file) {
      return res.status(400).json({
        success: false,
        message:
          'At least one non-empty field (full_name, email, or phone_number) or profile image must be provided to update',
      });
    }

    next();
  },

  body('password').custom((value) => {
    if (value) {
      throw new Error('Password cannot be updated from this route');
    }
    return true;
  }),

  body('full_name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Full name cannot be empty')
    .isLength({ min: 3, max: 100 })
    .withMessage('Full name must be between 3 and 100 characters')
    .matches(/^[A-Za-z][A-Za-z0-9\s]*$/)
    .withMessage('Full name must start with a letter and can include letters, numbers, and spaces'),

  body('email')
    .optional()
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Invalid email address'),

  body('phone_number')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Phone number cannot be empty')
    .matches(/^\+?[0-9\-]+$/)
    .withMessage('Phone number must contain only digits, hyphens, and an optional leading +')
    .custom((value) => {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        throw new Error('Phone number must be between 7 and 15 digits');
      }
      return true;
    }),
];


export const validateAdminId = [param('id').isMongoId().withMessage('Invalid admin ID')];

export const validateResetAdminPassword = [
  param('id').isMongoId().withMessage('Invalid admin ID'),
  body('new_password')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[\W_]/)
    .withMessage('Password must contain a special character'),
];

export const validateChangeOwnPassword = [
  body('current_password').notEmpty().withMessage('Current password is required'),

  body('new_password')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[\W_]/)
    .withMessage('Password must contain a special character'),
];
