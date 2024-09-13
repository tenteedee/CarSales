import { user, password, host, database, port } from './dbConfig.js';
import { Sequelize } from 'sequelize';

export const db = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

export const connection = async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
