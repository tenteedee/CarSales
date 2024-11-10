import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import CarImage from './CarImage.js';
import Brand from './Brand.js';
import CarType from './CarType.js';
import OrderDetails from './OrderDetails.js';
import Orders from './Orders.js';
import CarColors from './CarColors.js';
import TestDriveRequest from './TestDriveRequest.js';

const Car = db.define(
  'car',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CarColors',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT(1000),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT(10000),
      allowNull: true,
    },
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cars',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Car;
