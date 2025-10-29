import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { adminRoutes } from './routes/admin.routes.js';
import { departmentRoutes } from './routes/department.routes.js';
import { employeeRoutes } from './routes/employee.routes.js';
import { companyProfileRoutes } from './routes/companyProfile.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { globalRateLimiter } from './middlewares/rateLimiters.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swaggerConfig.js';

export const app = express();

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://d1r99jyhffgkk4.cloudfront.net',
  'https://www.eurosystemsint.com',
  'https://eurosystemsint.com',
];

// 1) CORS first
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin) return cb(null, true); // Postman / curl
      return cb(null, ALLOWED_ORIGINS.includes(origin));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cache-Control',
    ],
    // ⚠️ If you are NOT using cookies, keep credentials: false (simpler for CORS)
    credentials: false,
  })
);

// 2) Explicit preflight (Express 5-safe)
app.options('/*', (req, res) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control'
    );
    // res.setHeader('Access-Control-Allow-Credentials', 'true'); // only if you use cookies
    return res.sendStatus(204);
  }
  return res.sendStatus(403);
});

// 3) Helmet AFTER cors
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.use(globalRateLimiter);

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ✅ Swagger Docs (no need to manually set headers)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/company-profile', companyProfileRoutes);

// ✅ 404 Catch-All
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Global Error Handler
app.use(errorHandler);
