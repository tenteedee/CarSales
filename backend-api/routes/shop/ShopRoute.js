import express from 'express';
import { validateLogin } from '../../helper/Validation.js';
import { verifyToken } from '../../middleware/Auth.js';
import {
  login, loginWithGoogle,
  verify_token,
} from '../../controllers/shop/AuthController.js';

const authRouter = express.Router();  // This should be where you define your routes
// Define routes in authRouter
authRouter.post('/login', validateLogin, login);
authRouter.post('/verify_token', verifyToken, verify_token);
authRouter.post('/google/callback', loginWithGoogle);

// Use the authRouter with /auth prefix
const router = express.Router();
router.use('/auth', authRouter);

export default router;
