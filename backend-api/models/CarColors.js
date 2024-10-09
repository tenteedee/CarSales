import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import OrderDetails from "./OrderDetails.js";

const CarColors = db.define(
    "car_colors",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        color_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },

    },
    {
        tableName: 'car_colors',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);
CarColors.hasMany(OrderDetails, {
    foreignKey: "car_color_id",
    as: "order_details",
});

OrderDetails.belongsTo(CarColors, {
    foreignKey: "car_color_id",
    as: "car_color",
});


export default CarColors;

