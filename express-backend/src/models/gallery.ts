import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Gallery extends Model {
  public id!: number;
  public image_url!: string;
  public caption!: string;
  public uploaded_at!: Date;
}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        isUrl: true,
      }
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'uploaded_at' // Explicitly specify the column name
    }
  },
  {
    sequelize,
    modelName: 'Gallery',
    tableName: 'gallery',
    timestamps: false, 
    underscored: true 
  }
);

export default Gallery;