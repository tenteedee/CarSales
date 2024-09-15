import express from 'express';
import customerRouter from './customerRoutes.js';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Main shop');
});
router.use('/customer', customerRouter);

export default router;
