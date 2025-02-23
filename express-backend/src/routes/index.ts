import { Router } from "express";
import { connectDB, sequelize } from "../config/db";
import memberRoutes from "./memberRoutes";

const router = Router();

// Connect to the database
connectDB();

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("All models synchronized with MySQL.");
});

// Use member routes
router.use("/members", memberRoutes);

export default router;