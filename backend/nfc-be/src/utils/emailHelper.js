import nodemailer from 'nodemailer';
import { envConfig } from '../config/envConfig.js';

import path from 'path';
import { fileURLToPath } from 'url';

// These two lines make __dirname work in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: envConfig.smtp.host,
  port: envConfig.smtp.port,
  secure: envConfig.smtp.port === 465, // true for 465, false for other ports
  auth: {
    user: envConfig.smtp.user,
    pass: envConfig.smtp.pass,
  },
});

// Verification email for new admins
export const sendVerificationEmail = async ({ to, name, code }) => {
  const mailOptions = {
    from: `"${envConfig.smtp.fromName}" <${envConfig.smtp.from}>`,
    to,
    subject: 'Verify Your Email Address',
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../../assets/logo.png'),
        cid: 'companylogo',
      },
    ],
    html: `
    <div style="text-align:center; margin-bottom:20px;">
      <img 
        src="cid:companylogo"
        alt="Company Logo"
        style="max-width:150px; height:auto;"
      />
    </div>
    <div style="background:#f9fafb;padding:20px;font-family:Arial,sans-serif;">
      <div style="width:100%;max-width:500px;margin:0 auto;background:#ffffff;padding:20px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#2563eb;text-align:center;margin-bottom:20px;font-size:20px;">Verify Your Email</h2>
        <p style="color:#374151;font-size:16px;line-height:1.5;">Hello ${name},</p>
        <p style="color:#374151;font-size:16px;line-height:1.5;">Your verification code is:</p>
        <div style="font-size:28px;font-weight:bold;color:#2563eb;text-align:center;margin:20px 0;">
          ${code}
        </div>
        <p style="color:#6b7280;font-size:14px;line-height:1.5;">This code will expire in 10 minutes.</p>
      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Admin restoration notification email
export const sendAdminRestorationEmail = async ({ to, name }) => {
  const mailOptions = {
    from: `"${envConfig.smtp.fromName}" <${envConfig.smtp.from}>`,
    to,
    subject: 'Your Admin Account Has Been Restored',
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../../assets/logo.png'),
        cid: 'companylogo',
      },
    ],
    html: `
    <div style="text-align:center; margin-bottom:20px;">
      <img 
        src="cid:companylogo"
        alt="Company Logo"
        style="max-width:150px; height:auto;"
      />
    </div>
    <div style="background:#f9fafb;padding:20px;font-family:Arial,sans-serif;">
      <div style="width:100%;max-width:500px;margin:0 auto;background:#ffffff;padding:20px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#2563eb;text-align:center;margin-bottom:20px;font-size:20px;">Admin Account Restored</h2>
        <p style="color:#374151;font-size:16px;line-height:1.5;">Hello ${name},</p>
        <p style="color:#374151;font-size:16px;line-height:1.5;">
          Your admin account has been <strong>restored</strong> by the system administrator.
        </p>
        <p style="color:#374151;font-size:16px;line-height:1.5;">
          You can now log in again and continue using the system.
        </p>
        <div style="text-align:center;margin-top:30px;">
          <a href="${envConfig.appUrl}/login" style="background:#2563eb;color:#ffffff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:16px;display:inline-block;">
            Login Now
          </a>
        </div>
      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendAdminDeletionEmail = async ({ to, name }) => {
  const mailOptions = {
    from: `"${envConfig.smtp.fromName}" <${envConfig.smtp.from}>`,
    to,
    subject: 'Your Admin Account Has Been Deactivated',
    attachments: [
      {
        filename: 'logo.png',
        path: path.join(__dirname, '../../assets/logo.png'),
        cid: 'companylogo',
      },
    ],
    html: `
    <div style="text-align:center; margin-bottom:20px;">
      <img 
        src="cid:companylogo"
        alt="Company Logo"
        style="max-width:150px; height:auto;"
      />
    </div>
    <div style="background:#f9fafb;padding:20px;font-family:Arial,sans-serif;">
      <div style="width:100%;max-width:500px;margin:0 auto;background:#ffffff;padding:20px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#dc2626;text-align:center;margin-bottom:20px;font-size:20px;">Admin Account Deactivated</h2>
        <p style="color:#374151;font-size:16px;line-height:1.5;">Hello ${name},</p>
        <p style="color:#374151;font-size:16px;line-height:1.5;">
          Your admin account has been <strong>deactivated</strong> by the system administrator.
        </p>
        <p style="color:#6b7280;font-size:14px;line-height:1.5;">
          If you believe this was done in error, please contact support.
        </p>
      </div>
    </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
