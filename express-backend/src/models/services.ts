import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Define an interface for the model
interface ServiceAttributes {
  service_id?: number;
  name: string;
  description?: string;
  price?: number;
  created_at?: Date;
}

// Extend Sequelize's Model class
class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public service_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public readonly created_at!: Date;
}

// Initialize the model
Service.init(
  {
    service_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "services",
    timestamps: false, // Since we're using created_at manually
  }
);

export default Service;
