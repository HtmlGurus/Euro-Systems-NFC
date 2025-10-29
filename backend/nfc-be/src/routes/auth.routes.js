import express from 'express';
import { login } from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { validateLogin } from '../validators/auth.validator.js';
import { loginRateLimiter } from '../middlewares/rateLimiters.js';

export const authRoutes = express.Router();


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     description: Logs in an admin using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 requires_verification:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 admin:
 *                   type: object
 *       400:
 *         description: Missing or invalid input
 *       401:
 *         description: Unauthorized (invalid credentials or account issues)
 */

// Login Route
authRoutes.route('/login').post(loginRateLimiter, validateLogin, validateRequest, login);