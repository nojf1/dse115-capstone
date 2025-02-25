import { Request, Response } from "express";
import Gallery from "../models/gallery";
import multer from "multer";
import path from "path";

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/gallery',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Images only!"));
  }
});

// Get all gallery images
export const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await Gallery.findAll({
      order: [['uploaded_at', 'DESC']]
    });

    res.status(200).json({
      message: "Gallery images retrieved successfully",
      images,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Upload new image (admin only)
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { caption } = req.body;
    const image_url = `/uploads/gallery/${req.file.filename}`;

    const newImage = await Gallery.create({
      image_url,
      caption
    });

    res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Update image caption (admin only)
export const updateImage = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const { caption } = req.body;

    const image = await Gallery.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.update({ caption });

    res.status(200).json({
      message: "Image updated successfully",
      image,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

// Delete image (admin only)
export const deleteImage = async (req: Request, res: Response) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const { id } = req.params;
    const image = await Gallery.findByPk(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await image.destroy();

    res.status(200).json({
      message: "Image deleted successfully"
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};