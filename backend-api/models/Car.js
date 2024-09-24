import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import CarImage from './CarImage.js';

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
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT(1000),
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

Car.hasMany(CarImage, {
  foreignKey: 'car_id',
  as: 'images',
});

CarImage.belongsTo(Car, {
  foreignKey: 'car_id',
  as: 'car',
});

export default Car;