import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Customer from './Customer.js';
import Car from './Car.js';
import Showroom from './Showroom.js';


const Orders = db.define(
  'orders',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
    },
    car_id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
    },
    payment_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },

    order_status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    showroom_id: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  },
  {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Orders;
