// AUTHENTICATION ENDPOINT
export const LOGIN = "/auth/login"; // Login with email and password

// SUPER ADMIN ENDPOINTS
export const ADMIN = "/admins"; // Get, update and delete specific admin by ID
export const DELETE = "/deleted"; // Get all soft-deleted admins
export const RESET_PASSWORD = "/reset-password"; // Reset admin password by super-admin
export const RESTORE = "/restore"; // Restore soft-deleted admin

// ADMIN ENDPOINTS
export const EMAIL_VERIFICATION = "/admins/send-email-verification"; // Send email verification code to admin
export const VERIFY_EMAIL = "/admins/verify-email"; // Verify admin email using the code
export const CHANGE_PASSWORD = "/admins/change-password"; // Change password for logged-in admin

// DEPARTMENT ENDPOINT
export const DEPARTMENT = "/departments"; // Get all department, update and delete department by ID
export const DEPARTMENT_DROPDOWN = "/departments/dropdown"; // Get all department, update and delete department by ID

// EMPLOYEE ENDPOINT
export const EMPLOYEE = "/employees"; // Get all employees and update and delete employees by ID

// COMPANY PROFILE ENDPOINT
export const COMPANY_PROFILE = "/company-profile"; // Get, update and delete company profile

// REPORT ENDPOINT
export const EMPLOYEE_REPORTS = "/employees/reports";
// EMPLOYEES AND DEPARTMENT COUNT
export const GET_ALL_EMPLOYEES = "/employees/count";
export const GET_ALL_DEPARTMENTS = "/departments/count";
