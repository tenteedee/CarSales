import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Brand = db.define(
  "brand",
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
  },
  {
    tableName: "brands",
    timestamps: false,
    underscored: true,
  }
);

export default Brand;
