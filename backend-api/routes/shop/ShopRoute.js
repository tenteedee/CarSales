import express from 'express';
import authRouter from './AuthRoute.js';
import carRouter from './CarRoute.js';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/car', carRouter);

export default router;
