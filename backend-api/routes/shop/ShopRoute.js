import express from 'express';
import {
  validateLogin,
  validateRegister,
} from '../../helper/ValidationHelper.js';
import { verifyToken } from '../../middleware/Auth.js';
import {
  login,
  loginWithGoogle,
  verify_token,
  register,
} from '../../controllers/shop/AuthController.js';
import { getCarById } from '../../controllers/shop/CarInfoController.js';

const authRouter = express.Router();
// Define routes in authRouter
authRouter.post('/register', validateRegister, register);
authRouter.post('/login', validateLogin, login);
authRouter.post('/verify_token', verifyToken, verify_token);
authRouter.post('/google/callback', loginWithGoogle);
authRouter.post('/register', validateRegister, register);

// Use the authRouter with /auth prefix
const router = express.Router();
router.use('/auth', authRouter);
router.get('/car/:id', getCarById);

export default router;
