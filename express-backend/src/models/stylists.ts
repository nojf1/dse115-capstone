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
}

// Extend Sequelize's Model class
class Stylist extends Model<StylistAttributes> implements StylistAttributes {
  public stylist_id!: number;
  public name!: string;
  public expertise!: string;
  public experience_years!: number;
  public profile_picture!: string;
  public readonly created_at!: Date;
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
  },
  {
    sequelize,
    tableName: "stylists",
    timestamps: false, // Since we're using created_at manually
  }
);

export default Stylist;