import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
// Import your controller functions
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController";

const router = Router();

// Add this GET route handler for the root path
router.get("/", authMiddleware, getCart); 

// Your other existing routes
router.post("/add", authMiddleware, addToCart);
router.put("/item/:itemId", authMiddleware, updateCartItem);
router.delete("/item/:itemId", authMiddleware, removeFromCart);
router.delete("/", authMiddleware, clearCart);

export default router;