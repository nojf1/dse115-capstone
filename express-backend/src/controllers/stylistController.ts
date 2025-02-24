import { Request, Response } from "express";
import Stylist from "../models/stylists";

// Get all stylists
export const getAllStylists = async (req: Request, res: Response) => {
  try {
    const stylists = await Stylist.findAll();
    res.status(200).json({
      message: "Stylists retrieved successfully",
      stylists,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Get stylist by ID
export const getStylistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const stylist = await Stylist.findByPk(id);

    if (!stylist) {
      return res.status(404).json({ message: "Stylist not found" });
    }

    res.status(200).json({
      message: "Stylist retrieved successfully",
      stylist,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Create new stylist (admin only)
export const createStylist = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { name, expertise, experience_years, profile_picture } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Create new stylist
    const newStylist = await Stylist.create({
      name,
      expertise,
      experience_years,
      profile_picture,
    });

    res.status(201).json({
      message: "Stylist created successfully",
      stylist: newStylist,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Update stylist (admin only)
export const updateStylist = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const { name, expertise, experience_years, profile_picture } = req.body;

    const stylist = await Stylist.findByPk(id);
    if (!stylist) {
      return res.status(404).json({ message: "Stylist not found" });
    }

    // Update stylist
    await stylist.update({
      name: name || stylist.name,
      expertise: expertise || stylist.expertise,
      experience_years: experience_years || stylist.experience_years,
      profile_picture: profile_picture || stylist.profile_picture,
    });

    res.status(200).json({
      message: "Stylist updated successfully",
      stylist,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete stylist (admin only)
export const deleteStylist = async (req: Request, res: Response) => {
  try {
    // Check if user is admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const stylist = await Stylist.findByPk(id);

    if (!stylist) {
      return res.status(404).json({ message: "Stylist not found" });
    }

    await stylist.destroy();

    res.status(200).json({
      message: "Stylist deleted successfully",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};
