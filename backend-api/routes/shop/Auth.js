import express from 'express';
import { validateLogin } from '../../helper/Validation.js';
import { login } from '../../controllers/shop/AuthController.js';

const router = express.Router();

router.post('/login', validateLogin, login);

export default router;