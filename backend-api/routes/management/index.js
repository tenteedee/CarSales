import express from 'express';
import {verifyToken} from '../../middleware/Auth.js';
import {validateLogin} from '../../helper/Validation.js';
import {login, verify_token} from '../../controllers/management/AuthController.js';

const router = express.Router();

// Define a base route for management API
router.get('/', (req, res) => {
    res.send('worked management api');
});

// Define authRouter for authentication routes
const authRouter = express.Router();
// Define routes in authRouter
authRouter.post('/login', validateLogin, login);
authRouter.post('/verify_token', verifyToken, verify_token);
// Use authRouter with /auth prefix
router.use('/auth', authRouter);

export default router;
