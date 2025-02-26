import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Member from "../models/members";

// Register a new member
export const registerMember = async (req: Request, res: Response) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      address,
      city,
      state,
      postal_code,
      country,
    } = req.body;

    // Check if email exists
    const existingMember = await Member.findOne({ where: { email } });
    if (existingMember)
      return res.status(400).json({ message: "Email already in use." });

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create member
    const newMember = await Member.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
      address,
      city,
      state,
      postal_code,
      country,
    });

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = newMember.toJSON();

        // Send single response
        return res.status(201).json({
          message: "Member registered successfully!",
          member: memberWithoutPassword,
        });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Login member
export const loginMember = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if email exists in database
    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, member.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // TODO: JWT Token
    const token = jwt.sign(
      {
        id: member.member_id,
        email: member.email,
        isAdmin: member.is_admin,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" }
    );

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = member.toJSON();

    res.status(200).json({
      message: "Login successful",
      token,
      member: memberWithoutPassword,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Get member profile
export const getMemberProfile = async (req: Request, res: Response) => {
  try {
    const memberId = req.user?.id; // Get ID from JWT token

    if (!memberId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const member = await Member.findByPk(memberId);
    
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Remove password from response
    const { password: _, ...memberWithoutPassword } = member.toJSON();

    res.status(200).json({
      message: "Profile retrieved successfully",
      member: memberWithoutPassword,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Get all members (admin only)
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const members = await Member.findAll({
      attributes: { exclude: ['password'] } // Exclude password from results
    });

    res.status(200).json({
      message: "Members retrieved successfully",
      members
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
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