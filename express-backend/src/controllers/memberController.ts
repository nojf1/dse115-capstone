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
    res.status(201).json({
      message: "Member registered successfully!",
      member: memberWithoutPassword,
    });

    res
      .status(201)
      .json({ message: "Member registered successfully!", member: newMember });
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
