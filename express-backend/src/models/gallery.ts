import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

// Define interface for Gallery attributes
interface GalleryAttributes {
  id?: number;
  image_url: string;
  caption?: string;
  uploaded_at?: Date;
}

// Extend Sequelize's Model class
class Gallery extends Model<GalleryAttributes> implements GalleryAttributes {
  public id!: number;
  public image_url!: string;
  public caption!: string;
  public readonly uploaded_at!: Date;
}

// Initialize the model
Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "gallery",
    timestamps: false, 
  }
);

export default Gallery;