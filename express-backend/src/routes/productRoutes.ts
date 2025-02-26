import { Router } from "express";
import { 
  getAllProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct 
} from "../controllers/productController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (admin only)
router.post("/create", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;