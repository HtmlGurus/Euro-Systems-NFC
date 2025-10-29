import inquirer from 'inquirer';
import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

import { Admin } from '../src/models/admin.model.js';
import { connectDB } from '../src/db/connection.js';
import { envConfig } from '../src/config/envConfig.js';

const promptForSecret = async (expectedSecret) => {
  let attempts = 0;

  while (attempts < 3) {
    const { secret } = await inquirer.prompt([
      {
        type: 'password',
        name: 'secret',
        message: `\nEnter super admin creation secret:`,
        mask: '*',
        validate: (input) => {
          if (!input.trim()) return 'Secret is required';
          return true;
        },
      },
    ]);

    const entered = Buffer.from(secret);
    const actual = Buffer.from(expectedSecret);

    if (entered.length === actual.length && crypto.timingSafeEqual(entered, actual)) {
      return true;
    }

    console.log('Invalid secret. Try again.');
    attempts++;
  }

  console.log('\nToo many failed attempts. Access denied.');
  return false;
};

export const createSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await Admin.findOne({ role: 'super-admin' });
    if (existingSuperAdmin) {
      console.log('✅ A super-admin already exists.');
      return;
    }

    const secretPassed = await promptForSecret(envConfig.superAdmin.secret);
    if (!secretPassed) return;

    console.log('\nSecret verified. Proceeding with Super Admin Creation Wizard.\n');

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'full_name',
        message: 'Full Name:',
        validate: (input) => {
          const trimmed = input.trim();
          if (!trimmed) return 'Full name is required';
          if (trimmed.length < 3 || trimmed.length > 100) {
            return 'Full name must be between 3 and 100 characters';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: (input) => {
          const trimmed = input.trim();
          if (!trimmed) return 'Email is required';
          return validator.isEmail(trimmed) || 'Please enter a valid email address';
        },
      },
      {
        type: 'input',
        name: 'phone_number',
        message: 'Phone Number:',
        validate: (input) => {
          const trimmed = input.trim();
          if (!trimmed) return 'Phone number is required';
          const digitsOnly = trimmed.replace(/\D/g, '');
          const phoneRegex = /^\+?[0-9\-]+$/;
          if (digitsOnly.length < 7 || digitsOnly.length > 15 || !phoneRegex.test(trimmed)) {
            return 'Phone number must be 7 to 15 digits and may include "+" or hyphens';
          }
          return true;
        },
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        mask: '*',
        validate: (input) => {
          if (!input.trim()) return 'Password is required';
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/;
          return (
            passwordRegex.test(input) ||
            'Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character'
          );
        },
      },
    ]);

    const existing = await Admin.findOne({
      $or: [{ email: answers.email }, { phone_number: answers.phone_number }],
    });

    if (existing) {
      console.log('\nAn admin with this email or phone number already exists.');
      return;
    }

    const admin = new Admin({
      ...answers,
      role: 'super-admin',
      is_active: true,
      is_deleted: false,
      email_verified: true,
      verified_email_at: new Date(),
    });

    await admin.save();

    console.log('\n✅ Super admin created successfully!');
  } catch (err) {
    console.error('\n❌ Error creating super admin:', err.message);
  }
};

// Standalone execution when run directly
const runStandalone = async () => {
  try {
    await connectDB();
    await createSuperAdmin();
  } catch (err) {
    console.error('\nError:', err.message);
  } finally {
    mongoose.connection.close();
  }
};

// Only run standalone if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runStandalone();
}
