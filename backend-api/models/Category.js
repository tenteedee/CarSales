import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Category = db.define(
  "category",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "news_categories",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Category;
