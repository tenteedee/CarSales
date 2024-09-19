import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Setting = db.define(
  'setting',
  {
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'setting',
    timestamps: true,
    underscored: true,
  }
);

export default Setting;
