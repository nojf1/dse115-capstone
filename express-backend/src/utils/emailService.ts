import { transporter, emailConfig } from '../config/email';

/**
 * Sends a password reset email with the reset link
 * @param to Recipient email address
 * @param resetLink The password reset link
 * @returns Promise resolving to the nodemailer info object
 */
export const sendPasswordResetEmail = async (to: string, resetLink: string): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: `Timeless Style Salon <${emailConfig.from}>`,
      to,
      subject: emailConfig.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Password Reset</h1>
          </div>
          
          <div style="color: #555; font-size: 16px; line-height: 1.5;">
            <p>Hello,</p>
            <p>We received a request to reset your password for your Timeless Style Salon account.</p>
            <p>Please click the button below to set a new password:</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            
            <p>Best regards,<br>Timeless Style Salon Team</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #888; text-align: center;">
            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all;">${resetLink}</p>
          </div>
        </div>
      `
    });

    console.log('Password reset email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

/**
 * Sends a notification when a password has been successfully reset
 * @param to Recipient email address
 * @returns Promise resolving to the nodemailer info object
 */
export const sendPasswordResetConfirmationEmail = async (to: string): Promise<boolean> => {
  try {
    const info = await transporter.sendMail({
      from: `Timeless Style Salon <${emailConfig.from}>`,
      to,
      subject: 'Password Reset Successful - Timeless Style Salon',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Password Reset Successful</h1>
          </div>
          
          <div style="color: #555; font-size: 16px; line-height: 1.5;">
            <p>Hello,</p>
            <p>Your password for your Timeless Style Salon account has been successfully reset.</p>
            <p>If you did not make this change or believe this was done in error, please contact our support team immediately.</p>
            
            <p>Best regards,<br>Timeless Style Salon Team</p>
          </div>
        </div>
      `
    });

    console.log('Password reset confirmation email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
    return false;
  }
};