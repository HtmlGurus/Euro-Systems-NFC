import express from 'express';
import {
  createEmployee,
  getEmployees,
  getEmployeeCount,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeReports,
} from '../controllers/employee.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { upload } from '../middlewares/imageUpload.js';
import {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateEmployeeId,
} from '../validators/employee.validator.js';
import { companyProfileExists } from '../middlewares/companyProfileExists.js';

export const employeeRoutes = express.Router();

// Apply authentication middleware to all routes
employeeRoutes.use(verifyToken, companyProfileExists);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone_number
 *               - address
 *               - department_id
 *               - age
 *               - designation
 *               - about_me
 *               - joining_date
 *               - profile_image
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               second_phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               department_id:
 *                 type: string
 *               designation:
 *                 type: string
 *               age:
 *                 type: number
 *               about_me:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               profile_image:
 *                 type: string
 *                 format: binary
 *               facebook:
 *                 type: string
 *                 format: uri
 *               twitter:
 *                 type: string
 *                 format: uri
 *               instagram:
 *                 type: string
 *                 format: uri
 *               youtube:
 *                 type: string
 *                 format: uri
 *               linkedin:
 *                 type: string
 *                 format: uri
 *               website_url:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
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
 *         description: Keyword to search across employee fields like name, email, or phone
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [full_name, email, phone_number, second_phone_number, department, created_at, updated_at]
 *         description: Field to sort by (default is created_at)
 *       - in: query
 *         name: sort_order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (default is desc)
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
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

// Create and get all employees
employeeRoutes
  .route('/')
  .post(upload.single('profile_image'), validateCreateEmployee, validateRequest, createEmployee)
  .get(getEmployees);

/**
 * @swagger
 * /api/employees/count:
 *   get:
 *     summary: Get total number of employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total number of employees fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total employee count fetched successfully
 *                 total_employees:
 *                   type: integer
 *                   example: 120
 *       401:
 *         description: Unauthorized
 */

employeeRoutes.route('/count').get(getEmployeeCount);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   patch:
 *     summary: Update an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone_number:
 *                 type: string
 *               second_phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               department_id:
 *                 type: string
 *               designation:
 *                 type: string
 *               age:
 *                 type: number
 *               about_me:
 *                 type: string
 *               joining_date:
 *                 type: string
 *                 format: date
 *               profile_image:
 *                 type: string
 *                 format: binary
 *               facebook:
 *                 type: string
 *                 format: uri
 *               twitter:
 *                 type: string
 *                 format: uri
 *               instagram:
 *                 type: string
 *                 format: uri
 *               youtube:
 *                 type: string
 *                 format: uri
 *               linkedin:
 *                 type: string
 *                 format: uri
 *               website_url:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
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
 *         description: Employee deleted successfully
 *       400:
 *         description: Invalid input or password
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */

/**
 * @swagger
 * /api/employees/reports:
 *   get:
 *     summary: Get employee reports (name, designation, view count, and profile image)
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee reports fetched successfully
 */
employeeRoutes.route('/reports').get(getEmployeeReports);

// Get, update, and delete employee by ID
employeeRoutes
  .route('/:id')
  .get(validateEmployeeId, validateRequest, getEmployeeById)
  .patch(
    validateEmployeeId,
    upload.single('profile_image'),
    validateUpdateEmployee,
    validateRequest,
    updateEmployee
  )
  .delete(validateEmployeeId, validateRequest, deleteEmployee);
