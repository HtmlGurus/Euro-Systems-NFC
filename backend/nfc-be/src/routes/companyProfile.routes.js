import express from 'express';
import {
  createCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
  deleteCompanyProfile,
} from '../controllers/companyProfile.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js';
import { upload } from '../middlewares/imageUpload.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  validateCreateCompanyProfile,
  validateUpdateCompanyProfile,
} from '../validators/companyProfile.validator.js';

export const companyProfileRoutes = express.Router();

companyProfileRoutes.get('/', getCompanyProfile);

// Only super admin can access company profile routes
companyProfileRoutes.use(verifyToken, isSuperAdmin);

/**
 * @swagger
 * tags:
 *   name: Company Profile
 *   description: Company Profile management (Super Admin only)
 */

/**
 * @swagger
 * /api/company-profile:
 *   post:
 *     summary: Create a new company profile
 *     tags: [Company Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - company_name
 *               - address
 *               - profile_image
 *             properties:
 *               company_name:
 *                 type: string
 *               website_link:
 *                 type: string
 *               established:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               button_name:
 *                 type: string
 *               button_redirect_url:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Company profile created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/company-profile:
 *   get:
 *     summary: Get the company profile
 *     tags: [Company Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company profile retrieved successfully
 *       404:
 *         description: Company profile not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/company-profile:
 *   patch:
 *     summary: Update the company profile
 *     tags: [Company Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               website_link:
 *                 type: string
 *               established:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               button_name:
 *                 type: string
 *               button_redirect_url:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Company profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company profile not found
 */

/**
 * @swagger
 * /api/company-profile:
 *   delete:
 *     summary: Delete the company profile
 *     tags: [Company Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company profile deleted successfully
 *       400:
 *         description: Invalid password
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Company profile not found
 */

// All CRUD operations on the same '/' route
companyProfileRoutes
  .route('/')
  .post(
    upload.single('profile_image'),
    validateCreateCompanyProfile,
    validateRequest,
    createCompanyProfile
  )
  .patch(
    upload.single('profile_image'),
    validateUpdateCompanyProfile,
    validateRequest,
    updateCompanyProfile
  )
  .delete(deleteCompanyProfile);
