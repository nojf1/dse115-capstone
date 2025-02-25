import { Router } from "express";
import { 
  getAllStylists, 
  getStylistById, 
  createStylist,
  updateStylist,
  deleteStylist,
  upload 
} from "../controllers/stylistController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/all", getAllStylists);
router.get("/:id", getStylistById);

// Protected routes (admin only)
router.post("/create", authMiddleware, upload.single('profile_picture'), createStylist);
router.put("/:id", authMiddleware, upload.single('profile_picture'), updateStylist);
router.delete("/:id", authMiddleware, deleteStylist);

export default router;