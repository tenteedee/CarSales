import express from "express";
import { login,register } from "../../controllers/management/AuthController.js";
import {validateLogin} from "../../helper/Validation.js";
const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", register);

export default router;