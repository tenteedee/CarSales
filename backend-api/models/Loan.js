import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Customer from './Customer.js';

const Loan = db.define('loans', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    loan_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    duration_month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bank_id: {
        type: DataTypes.INTEGER,
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
        tableName: 'loans',
        timestamps: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

export default Loan;



