import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db"; // Import the Sequelize instance

// Define an interface for the model
interface MemberAttributes {
  member_id?: number; // Auto-incremented primary key
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at?: Date;
}

// Extend Sequelize's Model class
class Member extends Model<MemberAttributes> implements MemberAttributes {
  public member_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public postal_code!: string;
  public country!: string;
  public readonly created_at!: Date;
}

// Initialize the model
Member.init(
  {
    member_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize, // Database connection instance
    tableName: "members", // Explicitly set the table name
    timestamps: false, // Since created_at is already defined manually
  }
);

export default Member;
