import { Router } from "express";
import { connectDB, sequelize } from "../config/db";
import memberRoutes from "./memberRoutes";
import serviceRoutes from "./serviceRoutes";
import stylistRoutes from "./stylistRoutes";
import appointmentRoutes from "./appointmentRoutes";
import productRoutes from "./productRoutes";

const router = Router();

// Connect to the database
connectDB();

// Sync Sequelize models with the database
sequelize.sync({ force: false, logging: console.log }).then(() => {
  console.log("Database synchronized");
}).catch(error => {
  console.error("Sync error:", error);
});

// Use routes
router.use("/members", memberRoutes);
router.use("/services", serviceRoutes);
router.use("/stylists", stylistRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/products", productRoutes);

export default router;