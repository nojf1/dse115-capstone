import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from 'sequelize'; 
import Member from "../models/members";
import { transporter, emailConfig } from '../config/email';
import crypto from 'crypto';
import { tokenStore } from '../utils/tokenStore';

// Register a new member
export const registerMember = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      city,
      state,
      postal_code,
      country,
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ 
        message: "First name, last name, email, and password are required" 
      });
    }

    // Check if email exists
    const existingMember = await Member.findOne({ where: { email } });
    if (existingMember) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create member with optional fields
    const newMember = await Member.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone: phone || null,
      address: address || null,
      city: city || null,
      state: state || null,
      postal_code: postal_code || null,
      country: country || null,
      is_admin: false
    });

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = newMember.toJSON();

    return res.status(201).json({
      message: "Member registered successfully",
      member: memberWithoutPassword
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      message: "Server error during registration",
      error: error.message 
    });
  }
};

// Login member
export const loginMember = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find member
    const member = await Member.findOne({ 
      where: { email },
      attributes: [
        'member_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_admin',
        'password'
      ]
    });

    if (!member) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, member.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: member.member_id,
        email: member.email,
        isAdmin: member.is_admin
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: "24h" }
    );

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = member.toJSON();

    res.json({
      message: "Login successful",
      token,
      member: memberWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get member profile
export const getMemberProfile = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const member = await Member.findByPk(memberId, {
      attributes: [
        'member_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_admin'
      ]
    });
    
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Profile retrieved successfully",
      member
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      message: "Error retrieving profile",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all members (admin only)
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const members = await Member.findAll({
      attributes: [
        'member_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'is_admin',
        'created_at'
      ],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      message: "Members retrieved successfully",
      members
    });

  } catch (error) {
    console.error('Error fetching members:', error);
    return res.status(500).json({ 
      message: "Error fetching members",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update member profile
export const updateMember = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id;
    const {
      first_name,
      last_name,
      phone,
      address,
      city,
      state,
      postal_code,
      country,
    } = req.body;

    // Check authorization
    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Update member
    await member.update({
      first_name: first_name || member.first_name,
      last_name: last_name || member.last_name,
      phone: phone || member.phone,
      address: address || member.address,
      city: city || member.city,
      state: state || member.state,
      postal_code: postal_code || member.postal_code,
      country: country || member.country,
    });

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = member.toJSON();

    res.status(200).json({
      message: "Profile updated successfully",
      member: memberWithoutPassword,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete member (admin only or self)
export const deleteMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const requestingUserId = req.user?.id;
    const isAdmin = req.user?.isAdmin;

    if (!requestingUserId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // Check if user is admin or deleting their own account
    if (!isAdmin && requestingUserId !== parseInt(id)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Check if member exists by finding member in db by primary key id
    const member = await Member.findByPk(id);
    if (!member) { // If no member is found display this message
      return res.status(404).json({ message: "Member not found" });
    }

    await member.destroy(); // Deletes member in db

    res.status(200).json({ // Message for successful delete
      message: "Member deleted successfully"
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const member = await Member.findOne({ where: { email } });

    if (!member) {
      return res.status(404).json({ message: 'No account with that email exists.' });
    }

    // Generate token
    const token = tokenStore.createToken(email);

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Send email
    await transporter.sendMail({
      ...emailConfig,
      to: email,
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `
    });

    res.json({ message: 'Password reset email sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending reset email.' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const email = tokenStore.validateToken(token);
    if (!email) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(400).json({ message: 'Member not found.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password
    await member.update({ password: hashedPassword });
    
    // Remove used token
    tokenStore.removeToken(token);

    res.json({ message: 'Password successfully reset!' });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error resetting password.',
      error: error.message 
    });
  }
};