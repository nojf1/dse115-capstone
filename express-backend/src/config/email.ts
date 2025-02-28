import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'outlook',
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // false for TLS - port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

export const emailConfig = {
  from: process.env.EMAIL_USER,
  subject: 'Password Reset - Timeless Style Salon',
};