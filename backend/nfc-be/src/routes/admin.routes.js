import express from 'express';
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changePassword,
  resetPasswordBySuperAdmin,
  sendEmailVerificationCode,
  verifyEmailCode,
  restoreAdmin,
  getDeletedAdmins,
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isSuperAdmin } from '../middlewares/isSuperAdmin.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { upload } from '../middlewares/imageUpload.js';
import {
  validateCreateAdmin,
  validateUpdateAdmin,
  validateAdminId,
  validateResetAdminPassword,
  validateChangeOwnPassword,
} from '../validators/admin.validator.js';
import {
  emailVerificationRateLimiter,
  resetPasswordRateLimiter,
  changePasswordRateLimiter,
} from '../middlewares/rateLimiters.js';
import { companyProfileExists } from '../middlewares/companyProfileExists.js';

export const adminRoutes = express.Router();

/**
 * @swagger
 * /api/admins/send-email-verification:
 *   post:
 *     summary: Send email verification code to admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *       429:
 *         description: Too many requests
 *       401:
 *         description: Unauthorized
 */

adminRoutes
  .route('/send-email-verification')
  .post(verifyToken, emailVerificationRateLimiter, sendEmailVerificationCode);

/**
 * @swagger
 * /api/admins/verify-email:
 *   post:
 *     summary: Verify admin email using the code
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired code
 *       401:
 *         description: Unauthorized
 */

adminRoutes.route('/verify-email').post(verifyToken, verifyEmailCode);


/**
 * @swagger
 * /api/admins/change-password:
 *   put:
 *     summary: Change password for logged-in admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

// Logged-in admin: Change own password
adminRoutes
  .route('/change-password')
  .put(
    verifyToken,
    changePasswordRateLimiter,
    validateChangeOwnPassword,
    validateRequest,
    changePassword
  );

// Super admin-only routes
adminRoutes.use(verifyToken, isSuperAdmin, companyProfileExists);


/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Create a new admin (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: 
 *              - full_name
 *              - email
 *              - phone_number
 *              - password
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     summary: Get all admins (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of records per page (default is 10, max is 100)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword to search across name, email, or phone fields
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [full_name, email, phone_number, created_at, updated_at]
 *         description: Field to sort by (default is created_at)
 *       - in: query
 *         name: sort_order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (default is desc)
 *     responses:
 *       200:
 *         description: List of admins
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total_count:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     total_pages:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */

// Create admin / Get all admins
adminRoutes
  .route('/')
  .post(upload.single('profile_image'), validateCreateAdmin, validateRequest, createAdmin)
  .get(getAllAdmins);


/**
 * @swagger
 * /api/admins/deleted:
 *   get:
 *     summary: Get all soft-deleted admins (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deleted admins
 *       401:
 *         description: Unauthorized
 */

// Get deleted admins
adminRoutes.route('/deleted').get(getDeletedAdmins);
  

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Get admin by ID (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin found
 *       404:
 *         description: Admin not found
 *
 *   patch:
 *     summary: Update admin by ID (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               profile_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       404:
 *         description: Admin not found
 *
 *   delete:
 *     summary: Delete admin by ID (Super-admin only)
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: S.Admin123#
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       400:
 *         description: Re-entered password missing or incorrect
 */

// Get / Update / Delete specific admin by ID
adminRoutes
  .route('/:id')
  .get(validateAdminId, validateRequest, getAdminById)
  .patch(
    validateAdminId,
    upload.single('profile_image'),
    validateUpdateAdmin,
    validateRequest,
    updateAdmin
  )
  .delete(
    validateAdminId,
    validateRequest,
    deleteAdmin
  );

/**
 * @swagger
 * /api/admins/{id}/reset-password:
 *   put:
 *     summary: Reset admin password by super-admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       404:
 *         description: Admin not found
 */

// Reset password for specific admin
adminRoutes
  .route('/:id/reset-password')
  .put(
    resetPasswordRateLimiter,
    validateResetAdminPassword,
    validateRequest,
    resetPasswordBySuperAdmin
  );

/**
 * @swagger
 * /api/admins/{id}/restore:
 *   put:
 *     summary: Restore soft-deleted admin
 *     tags: [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Admin ID
 *     responses:
 *       200:
 *         description: Admin restored successfully
 *       404:
 *         description: Admin not found
 */

// Restore soft-deleted admin
adminRoutes.route('/:id/restore').put(validateAdminId, validateRequest, restoreAdmin);
