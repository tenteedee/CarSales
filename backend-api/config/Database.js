import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Make sure this line is there to load environment variables from .env file
const db = new Sequelize(process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION
});
export default db;