import { Request, Response } from "express";
import Member from "../models/members";

// Register a new member
export const registerMember = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone, password, address, city, state, postal_code, country } = req.body;

    // Check if email exists
    const existingMember = await Member.findOne({ where: { email } });
    if (existingMember) return res.status(400).json({ message: "Email already in use." });

    // Create member
    const newMember = await Member.create({
      first_name,
      last_name,
      email,
      phone,
      password, // Make sure to hash this later
      address,
      city,
      state,
      postal_code,
      country,
    });

    res.status(201).json({ message: "Member registered successfully!", member: newMember });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
