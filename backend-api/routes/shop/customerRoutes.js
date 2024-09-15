import express from 'express';
import { validateLogin } from '../../helper/Validation.js';
import { customerLogin } from '../../controllers/shop/customerController.js';

const router = express.Router();

router.post('/login', validateLogin, customerLogin);

export default router;
