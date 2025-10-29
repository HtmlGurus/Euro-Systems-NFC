# NFC – Backend

This is the backend for the **NFC** system. It provides a secure admin panel for managing company profiles, departments, employees, and role-based users (super-admin & admins).

---

## 🏗️ Tech Stack

- **Node.js** (ESM Modules)
- **Express.js** – REST API Framework
- **MongoDB** + **Mongoose**
- **JWT** – Authentication
- **AWS S3** – File uploads (via `aws-sdk`)
- **Multer** – Upload middleware
- **Swagger** – API Documentation
- **Nodemailer** – Email service
- **Helmet**, **Rate Limiting** – Security
- **Prettier**, **ESLint** – Code formatting

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/eSpark-Consultants/nfc-be.git
cd nfc-be
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Rename `.env.sample` to `.env` and fill in all required values:

```env
# Basic Setup
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d

# AWS S3 (Optional - for file uploads)
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_BUCKET=your_bucket_name
S3_REGION=your_region
S3_ENDPOINT=your_s3_endpoint

# Super Admin Creation
SUPER_ADMIN_CREATION_SECRET=secure_creation_secret

# Email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
EMAIL_FROM=no-reply@example.com
EMAIL_FROM_NAME=NFC System
```

### 4. Start the Server

```bash
# For development with auto-reload
npm run dev
```

---

## 🔐 Create Super Admin (One-Time Setup)

Before using the system, you need to create a **super-admin**:

```bash
npm run create-super-admin
```

You will be prompted to enter the `SUPER_ADMIN_CREATION_SECRET` defined in your `.env`.

This user will have access to all modules including:
- Admins
- Company Profile
- Departments
- Employees

---

## 📦 API Modules Overview

### ✅ Company Profile
- Required before accessing any other module
- Can be created/updated only by the **super-admin**
- Associated with all other modules

### ✅ Admins
- Managed only by the **super-admin**
- Admins can manage employees and departments only
- Cannot access company profile or other admins

### ✅ Departments
- Full CRUD available
- One Department can have multiple employees

### ✅ Employees
- Full CRUD available
- Multiple employees can belong to a single department

---

## 👥 Role-Based Access

| Role         | Access                                                 |
|--------------|--------------------------------------------------------|
| Super Admin  | All modules: Company, Admins, Employees, Departments   |
| Admin        | Only Employees & Departments                           |

---

## 📚 API Documentation

Once the server is running, visit:

```
http://localhost:5000/api-docs
```

This opens the Swagger UI with complete documentation of available endpoints, parameters, responses, and security.

---

## 📂 Scripts

| Command                       | Description                         |
|------------------------------|-------------------------------------|
| `npm run dev`                | Start server with `nodemon`         |
| `npm start`                  | Start server (production)           |
| `npm run create-super-admin` | CLI to create super admin           |
| `npm run lint`               | Lint code with ESLint               |
| `npm run format`             | Format code with Prettier           |

---

## 🤝 Frontend Integration Notes

- Send the **JWT token** in the `Authorization` header:
  ```http
  Authorization: Bearer <token>
  ```
- Company profile must be created before accessing any module.
- Refer to Swagger for all request/response formats.
- Respect role-based access logic:
  - Admins have limited access
  - Super Admin has full access

---

---

**Author**: [Owais Shaikh](https://github.com/eSpark-Consultants)
