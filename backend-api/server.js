import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import db from './config/Database.js';
import shopRoutes from './routes/shop/ShopRoute.js';
import staffRoutes from './routes/management/ManagementRoute.js';
import { API_PORT } from './config/Config.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(bodyParser.json({ limit: '30mb', extented: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: [`http://localhost:8122`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// /* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         const date = new Date().getTime();
//         const filename = file.originalname.replace(/\s+/g, "-");
//         const newFilename = `${date}-${filename}`;
//         req.body.picturePath = newFilename;
//         cb(null, newFilename);
//     },
// });
// const upload = multer({ storage });

// /* ROUTES WITH FILES */
// app.post("/auth/register", upload.single("picture"), register);

//app.use("/auth", authRoutes);
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
