import express from 'express';
import route from './AuthRoute.js';
import carRouter from './CarRoute.js';

const router = express.Router();
router.use('/auth', route);
router.use('/car', carRouter);

export default router;
