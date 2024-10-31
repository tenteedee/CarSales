import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const InsuranceProvider = db.define(
  "insurance_providers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "insurance_providers",
    timestamps: false,
    underscored: true,
  }
);

export default InsuranceProvider;
