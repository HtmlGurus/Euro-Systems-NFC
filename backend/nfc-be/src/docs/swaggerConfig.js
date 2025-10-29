import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NFC Workforce Manager API',
      version: '1.0.0',
      description: 'API documentation for NFC Workforce Manager backend',
    },
    components: {
      schemas: {
        // Shared Schemas
        Image: {
          type: 'object',
          properties: {
            image_url: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com/image.png',
            },
          },
        },
        AuditFields: {
          type: 'object',
          properties: {
            created_by: {
              type: 'string',
              example: '60f6f8c1b917c82a88c2b019',
            },
            updated_by: {
              type: 'string',
              example: '60f6f8c1b917c82a88c2b019',
            },
          },
        },
        SocialLinks: {
          type: 'object',
          properties: {
            facebook: { type: 'string', format: 'uri' },
            twitter: { type: 'string', format: 'uri' },
            instagram: { type: 'string', format: 'uri' },
            youtube: { type: 'string', format: 'uri' },
          },
        },

        // Admin Schema
        Admin: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            full_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone_number: { type: 'string' },
            role: { type: 'string', enum: ['super-admin', 'admin'] },
            is_verified: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },

        // Employee Schema
        Employee: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            full_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone_number: { type: 'string' },
            cnic_number: { type: 'string' },
            gender: { type: 'string' },
            dob: { type: 'string', format: 'date' },
            address: { type: 'string' },
            nfc_code: { type: 'string' },
            department: { type: 'string' },
            joining_date: { type: 'string', format: 'date' },
            resigning_date: { type: 'string', format: 'date', nullable: true },
            profile_image: { $ref: '#/components/schemas/Image' },
            social_links: { $ref: '#/components/schemas/SocialLinks' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },

        // Department Schema
        Department: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            image: { $ref: '#/components/schemas/Image' },
            is_active: { type: 'boolean' },
            employee_count: { type: 'integer', example: 5 },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
            created_by: { type: 'string' },
            updated_by: { type: 'string' },
          },
        },

        // Company Profile Schema
        CompanyProfile: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            company_name: { type: 'string' },
            website_link: { type: 'string', format: 'uri' },
            established: { type: 'string' },
            address: { type: 'string' },
            button_name: { type: 'string' },
            button_redirect_url: { type: 'string', format: 'uri' },
            profile_image: { $ref: '#/components/schemas/Image' },
            created_by: { type: 'string' },
            updated_by: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

export const swaggerSpec = swaggerJsdoc(options);
