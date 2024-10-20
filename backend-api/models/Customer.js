import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import TestDriveRequest from './TestDriveRequest.js';
import Orders from './Orders.js';

const Customer = db.define(
  'customer',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
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
    tableName: 'customers',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

Customer.hasMany(Orders, { foreignKey: "customer_id", as: "customerOrders" });
Orders.belongsTo(Customer, { foreignKey: "customer_id", as: "orderCustomer" }); // Changed alias to "orderCustomer"

Customer.hasMany(TestDriveRequest, {
  foreignKey: 'customer_id',
  as: 'test_drive_requests',
});
TestDriveRequest.belongsTo(Customer, {
  foreignKey: 'customer_id',
  as: 'customer',
});

export default Customer;
