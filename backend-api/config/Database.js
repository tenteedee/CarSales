import {Sequelize} from "sequelize";
import {DB_CONNECTION, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME, NODE_ENV} from "./Config.js";

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST || "localhost",
    dialect: DB_CONNECTION || "mysql",
    logging: NODE_ENV === "development" ? console.log : false // Log only in development
});
export default db;