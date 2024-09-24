import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Showroom = db.define(
  "showroom",
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "showrooms",
    timestamps: false,
    underscored: true,
  }
);
export default Showroom;
