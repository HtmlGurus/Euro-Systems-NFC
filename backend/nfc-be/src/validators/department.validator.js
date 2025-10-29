import { body, param } from 'express-validator';

export const validateCreateDepartment = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({ max: 100 })
    .withMessage('Name can be up to 100 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Department name must include at least one alphabet character'),

  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
];



export const validateUpdateDepartment = [
  param('id').isMongoId().withMessage('Invalid department ID'),

  (req, res, next) => {
    const updatableFields = ['name', 'email'];
    const hasValidField = updatableFields.some((field) => field in req.body);
    if (!hasValidField && !req.file) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (name or email) must be provided to update',
      });
    }
    next();
  },

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({ max: 100 })
    .withMessage('Name can be up to 100 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('Department name must include at least one alphabet character'),

  body('email')
    .optional()
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
];

export const validateDepartmentId = [param('id').isMongoId().withMessage('Invalid department ID')];
