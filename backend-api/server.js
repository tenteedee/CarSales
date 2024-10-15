import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import db from './config/Database.js';
import shopRoutes from './routes/shop/index.js';
import staffRoutes from './routes/management/ManagementRoute.js';
import { setupAssociations } from './helper/SetupAssociations.js';
import { API_PORT, SESSION_SECRET } from './config/Config.js';
import session from 'express-session';
import path from 'path';

dotenv.config();
setupAssociations();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extented: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(
//   cors({
//     origin: [`http://localhost:8122`],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

app.use('/assets', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/shop', shopRoutes);
app.use('/api/management', staffRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, status: 404, message: 'Not found' });
});

const PORT = API_PORT || 6001;

try {
  await db.authenticate();
  console.log('Database Connected...');
} catch (error) {
  console.error(error);
}

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
