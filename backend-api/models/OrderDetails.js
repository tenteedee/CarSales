import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Car from './Car.js';



const OrderDetails = db.define(
    'order_details',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,

            primaryKey: true,
        },
        car_id: {
            type: DataTypes.INTEGER,

            primaryKey: true,
        },

        price: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        color_id: {
            type: DataTypes.INTEGER,

            primaryKey: true,
        },


    },
    {
        tableName: 'order_details',
        timestamps: false,  // Assuming you don't need timestamps based on your diagram
        underscored: true,
    }
);


export default OrderDetails;
