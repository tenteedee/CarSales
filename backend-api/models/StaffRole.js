import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const StaffRole = db.define(
  'staff_role',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: 'staff_roles',
    timestamps: false,
    underscored: true,
  }
);
export default StaffRole;
