import express from 'express';
import {
  validateLogin,
  validateRegister,
} from '../../helper/ValidationHelper.js';
import { verifyToken } from '../../middleware/Auth.js';
import {
  login,
  verify_token,
  register,
  changePassword,
  loginGoogle,
} from '../../controllers/shop/AuthController.js';
import { getStaff } from '../../controllers/management/StaffController.js';
const router = express.Router();
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/change-password', verifyToken, changePassword);
router.post('/verify_token', verifyToken, verify_token);
router.post('/google', loginGoogle);
// router.post('/google', googleAuthInit);
// router.get('/google/callback', googleAuthCallback);
// router.get('/logout', logout);

export default router;
