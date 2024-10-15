import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import StaffRole from './StaffRole.js'; // Import the StaffRole model
import Showroom from './Showroom.js';

const Staff = db.define(
  'staff',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: StaffRole,
        key: "id",
      },
    },
    showroom_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Showroom,
        key: "id",
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
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
    tableName: 'staffs',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Staff;
