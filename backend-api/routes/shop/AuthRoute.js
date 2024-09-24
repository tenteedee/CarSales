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
  changePassword,
} from '../../controllers/shop/AuthController.js';

const route = express.Router();
route.post('/register', validateRegister, register);
route.post('/login', validateLogin, login);
route.post('/change-password', verifyToken, changePassword);
route.post('/verify_token', verifyToken, verify_token);
route.post('/google/callback', loginWithGoogle);

export default route;
