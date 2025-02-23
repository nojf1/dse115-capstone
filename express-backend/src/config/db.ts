import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Use Sequelize to connect to the database
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306, // Default MySQL port
    logging: false, // Disable logging SQL queries
  }
);

// Connect to the database + error handling message
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully, hallelujah no errors!");
  } catch (error) {
    console.error(":( Unable to connect to the database: ", error);
    process.exit(1);
  }
};
