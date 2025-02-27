import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use an app-specific password
  }
});

export const emailConfig = {
  from: process.env.EMAIL_USER,
  subject: 'Password Reset - Timeless Style Salon',
};