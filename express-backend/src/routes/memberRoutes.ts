import { Router } from "express";
import { registerMember } from "../controllers/memberController";

const router = Router();

// Define member registration route
router.post("/register", registerMember);

export default router;
