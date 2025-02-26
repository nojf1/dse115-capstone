import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Define interface for Product attributes
interface ProductAttributes {
  product_id?: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock_quantity: number;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Extend Sequelize's Model class
class Product extends Model<ProductAttributes> implements ProductAttributes {
  public product_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public stock_quantity!: number;
  public image_url!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Initialize the model
Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id' // Match your database column name
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
    underscored: true
  }
);

export default Product;