import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Car from "./Car.js";

const OrderDetails = db.define(
  "order_details",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    car_id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_details",
    timestamps: false, // Assuming you don't need timestamps based on your diagram
    underscored: true,
  }
);

export default OrderDetails;
