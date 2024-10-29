import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const CarType = db.define(
  "car_type",
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
    tableName: "car_types",
    timestamps: false,
    underscored: true,
  }
);

export default CarType;
