// Models are used to interact with the database, part of the MVC structure
// The model is used to interact with the database, such as querying, inserting, updating, and deleting data
// U can think of it as a class that represents a table in the database

// Sequelize is an ORM (Object-Relational Mapping) library that simplifies the interaction with databases
// It allows you to define models that represent tables in the database
// Sequelize's Model class is used to define models, DataTypes is used to define the data types of the columns

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Extend attributes to include is_admin
interface MemberAttributes {
  member_id?: number;
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
  is_admin?: boolean; // New admin column
  created_at?: Date;
}

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
  public is_admin!: boolean;
  public readonly created_at!: Date;
}

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
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to non-admin
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "members",
    timestamps: false,
  }
);

export default Member;
