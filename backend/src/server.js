import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine.js';
import initWebRoutes from './routes/web.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

const app = express();

// config
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// viewEngine(app);
// initWebRoutes(app);
app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
