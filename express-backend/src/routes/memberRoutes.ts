import { Router } from "express";
import { registerMember, loginMember } from "../controllers/memberController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Define member registration route
router.post("/register", registerMember);
// Define member login route
router.post("/login", loginMember);

// Protected route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
