import express from "express";
import {login, register, verify_token} from "../../controllers/management/AuthController.js";
import {validateLoginManagement} from "../../helper/Validation.js";
import {verifyToken} from "../../middleware/Auth.js";
const router = express.Router();

router.post("/login", validateLoginManagement, login);
router.post("/verify_token", verifyToken, verify_token);

router.post("/register", register);

export default router;