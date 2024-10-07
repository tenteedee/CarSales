import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import NewsCategory from "./NewsCategory.js";
import Staff from "./Staff.js";

const News = db.define(
  "news",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"), // Giả sử enum có các giá trị này
      allowNull: false,
    },
    is_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    posted_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Staff,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: NewsCategory,
        key: "id",
      },
    },
  },
  {
    tableName: "news",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
News.belongsTo(NewsCategory, {
  foreignKey: "category_id",
  as: "category",
});
News.belongsTo(Staff, {
  foreignKey: "posted_by",
  as: "posted",
});
export default News;
