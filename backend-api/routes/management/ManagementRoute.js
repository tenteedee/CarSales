import express from "express";
import { verifyStaffToken } from "../../middleware/Auth.js";
import { validateLogin } from "../../helper/ValidationHelper.js";
import {
  login,
  verify_token,
} from "../../controllers/management/AuthController.js";
import { query } from "../../controllers/management/UserController.js";
import {
  queryStaff,
  deleteStaff,
  getStaff,
  updateStaff,
  createStaff,
} from "../../controllers/management/StaffController.js";
import { queryRoles } from "../../controllers/management/RoleController.js";
import { queryShowrooms } from "../../controllers/management/ShowroomController.js";
import {
  querySettings,
  updateSettings,
} from "../../controllers/management/SettingController.js";

const router = express.Router();

// Define a base route for management API
router.get("/", (req, res) => {
  res.send("worked management api");
});

// Define authRouter for authentication routes
const authRouter = express.Router();
// Define routes in authRouter
authRouter.post("/login", validateLogin, login);
authRouter.post("/verify_token", verifyStaffToken([]), verify_token);
// Use authRouter with /auth prefix
router.use("/auth", authRouter);

// Define users for authentication routes
const userRouter = express.Router();
userRouter.get("/query", query);
router.use("/users", verifyStaffToken(["Director"]), userRouter);

const staffRoute = express.Router();
staffRoute.get("/query", queryStaff);
staffRoute.delete("/delete", deleteStaff);
staffRoute.post("/create", createStaff);
staffRoute.get("/:id", getStaff);
staffRoute.post("/:id", updateStaff);
router.use("/staffs", verifyStaffToken(["Director"]), staffRoute);

const roleRoute = express.Router();
roleRoute.get("/", queryRoles);
router.use("/roles", verifyStaffToken(["Director"]), roleRoute);

const showroomRoute = express.Router();
showroomRoute.get("/", queryShowrooms);
router.use("/showrooms", verifyStaffToken(["Director"]), showroomRoute);

const settingsRoute = express.Router();
settingsRoute.get("/", querySettings);
settingsRoute.post("/", updateSettings);

router.use("/settings", verifyStaffToken(["Director"]), settingsRoute);

export default router;
