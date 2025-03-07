import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Define an interface for the model
interface StylistAttributes {
  stylist_id?: number;
  name: string;
  expertise?: string;
  experience_years?: number;
  profile_picture?: string;
  created_at?: Date;
  education?: string;      // Add education
  career_interest?: string; // Add career_interest
  description?: string;    // Add description
}

// Extend Sequelize's Model class
class Stylist extends Model<StylistAttributes> implements StylistAttributes {
  public stylist_id!: number;
  public name!: string;
  public expertise!: string;
  public experience_years!: number;
  public profile_picture!: string;
  public readonly created_at!: Date;
  public education!: string;      // Add education
  public career_interest!: string; // Add career_interest
  public description!: string;    // Add description
}

// Initialize the model
Stylist.init(
  {
    stylist_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    expertise: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    education: { // Add education field
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    career_interest: { // Add career_interest field
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: { // Add description field
      type: DataTypes.TEXT, // Use TEXT for longer descriptions
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "stylists",
    timestamps: false, // Since we're using created_at manually
  }
);

export default Stylist;