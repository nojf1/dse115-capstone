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
    // logging: console.log, // Enable logging temporarily for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Connect to the database + error handling message
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully, hallelujah no errors!!!");
    
    // // Test database structure
    // const [results] = await sequelize.query('SHOW TABLES LIKE "products"');
    // console.log("Products table exists:", results.length > 0);
    
    // if (results.length > 0) {
    //   const [columns] = await sequelize.query('DESCRIBE products');
    //   console.log("Products table structure:", columns);
    // }
  } catch (error) {
    console.error("The crappy database has a connection error:", error);
    process.exit(1);
  }
};
