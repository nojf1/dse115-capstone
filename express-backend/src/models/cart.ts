import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Member from './members';
import Product from './products';

class CartItem extends Model {
  public id!: number;
  public cart_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  
  // Timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

CartItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carts',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'cart_items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

class Cart extends Model {
  public id!: number;
  public member_id!: number;
  public total!: number;
  
  // Timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow null for guest carts
    references: {
      model: 'members',
      key: 'id'
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  sequelize,
  tableName: 'carts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define relationships
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Cart.belongsTo(Member, { foreignKey: 'member_id' });

export { Cart, CartItem };