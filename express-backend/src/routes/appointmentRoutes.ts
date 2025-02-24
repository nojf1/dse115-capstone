import { Router } from "express";
import { 
  getAllAppointments,
  getMemberAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment 
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Routes
router.get("/all", getAllAppointments); // Admin only
router.get("/my-appointments", getMemberAppointments);
router.post("/create", createAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;