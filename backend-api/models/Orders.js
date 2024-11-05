import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Customer from './Customer.js';
import Car from './Car.js';



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
    
    
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00  // Set a default value if appropriate
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
      allowNull: true, // Allow null for showroom_id
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
Car.hasMany(Orders, { foreignKey: 'car_id' });
  Orders.belongsTo(Car, { foreignKey: 'car_id' });

export default Orders;
