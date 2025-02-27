import { Router } from "express";
import { registerMember, loginMember, getMemberProfile, getAllMembers, updateMember, deleteMember, forgotPassword, resetPassword } from "../controllers/memberController";
import { authMiddleware } from "../middleware/auth";

const router = Router();



// Define member registration route
router.post("/register", registerMember);
// Define member login route
router.post("/login", loginMember);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/profile", authMiddleware, getMemberProfile);
router.get("/all", authMiddleware, getAllMembers); // Admin only route
router.put("/update", authMiddleware, updateMember);
router.delete("/:id", authMiddleware, deleteMember); // Admin only or own account

export default router;
