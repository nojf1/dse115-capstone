// Models are used to interact with the database, part of the MVC structure
// The model is used to interact with the database, such as querying, inserting, updating, and deleting data
// U can think of it as a class that represents a table in the database

// Sequelize is an ORM (Object-Relational Mapping) library that simplifies the interaction with databases
// It allows you to define models that represent tables in the database
// Sequelize's Model class is used to define models, DataTypes is used to define the data types of the columns

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Member extends Model {
  public member_id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public address?: string;
  public city?: string;
  public state?: string;
  public postal_code?: string;
  public country?: string;
  public is_admin!: boolean;
  public readonly created_at!: Date;
}

Member.init({
  member_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Member',
  tableName: 'members',
  timestamps: false
});

export default Member;
