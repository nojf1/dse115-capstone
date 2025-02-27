import { Router } from "express";
import { 
  getAllImages, 
  createImage, 
  updateImage, 
  deleteImage 
} from "../controllers/galleryController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/all", getAllImages);

// Protected routes (admin only)
router.post("/create", authMiddleware, createImage);
router.put("/:id", authMiddleware, updateImage);
router.delete("/:id", authMiddleware, deleteImage);

export default router;