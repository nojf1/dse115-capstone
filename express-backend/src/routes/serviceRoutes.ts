import { Router } from "express";
import { 
  getAllServices, 
  getServiceById, 
  createService,
  updateService,
  deleteService 
} from "../controllers/serviceController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/all", getAllServices);
router.get("/:id", getServiceById);

// Protected routes (admin only)
router.post("/create", authMiddleware, createService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;