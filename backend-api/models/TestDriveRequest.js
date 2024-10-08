import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Car from './Car.js';
import Customer from './Customer.js';
import Staff from './Staff.js';

const TestDriveRequest = db.define(
  'test_drive_request',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    test_drive_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sales_staff_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'test_drive_requests',
    timestamps: true,
    underscored: true,
  }
);

export default TestDriveRequest;
