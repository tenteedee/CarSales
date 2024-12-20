import express from "express";
import { verifyStaffToken } from "../../middleware/Auth.js";
import {
  createCustomerValidation,
  updateCustomerValidation,
  validateCreateInsuranceProvider,
  validateCreateShowroom,
  validateLogin,
  validateUpdateInsuranceProvider,
  validateUpdateShowroom,
} from "../../helper/ValidationHelper.js";
import {
  login,
  loginWithGoogle,
  verify_token,
} from "../../controllers/management/AuthController.js";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  query,
  updateCustomer,
} from "../../controllers/management/UserController.js";
import {
  queryStaff,
  deleteStaff,
  getStaff,
  updateStaff,
  createStaff,
  updateStaffAvatar,
} from "../../controllers/management/StaffController.js";
import { queryRoles } from "../../controllers/management/RoleController.js";
import {
  createShowroom,
  deleteShowroom,
  getShowroom,
  queryShowrooms,
  updateShowroom,
} from "../../controllers/management/ShowroomController.js";
import {
  querySettings,
  updateSettings,
} from "../../controllers/management/SettingController.js";
import {
  queryCategories,
  deleteCategories,
  getCategory,
  updateCategory,
  createCategory,
} from "../../controllers/management/CategoryController.js";
import {
  queryNews,
  deleteNews,
  getNews,
  updateNews,
  createNews,
} from "../../controllers/management/NewsController.js";
import {
  getTopSellingCars,
  homeStatistic,
  updateState,
  uploadFile,
} from "../../controllers/management/HomeController.js";

import {
  createStaffValidation,
  updateStaffValidation,
} from "../../helper/ValidationHelper.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import {
  createTestDrive,
  deleteTestDrive,
  getTestDrive,
  queryTestDrive,
  updateTestDrive,
} from "../../controllers/management/TestDriveController.js";
import {
  createNewCar,
  deleteCar,
  getAllBrands,
  getAllTypes,
  getCarById,
  queryCars,
  updateCar,
} from "../../controllers/management/CarController.js";
import {
  createInsurance,
  createInsuranceProvider,
  deleteInsurance,
  deleteInsuranceProvider,
  getInsurance,
  getInsuranceProvider,
  queryInsurance,
  queryInsuranceProvider,
  updateInsurance,
  updateInsuranceProvider,
} from "../../controllers/management/InsuranceController.js";
import {
  deleteOrders,
  getOrder,
  queryOrder,
  updateOrder,
} from "../../controllers/management/OrdersController.js";
import {
  changePassword,
  getProfile,
  updateProfile,
} from "../../controllers/management/ProfileController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const date = new Date().getTime();
    const filename = file.originalname.replace(/\s+/g, "-");
    const ext = path.extname(file.originalname);

    const newFilename = `${date}-${filename}`;
    //const newFilename = `${uuidv4()}${ext}`;

    cb(null, newFilename);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = "Chỉ có thể upload hình ảnh";
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});
const router = express.Router();

router.get("/", (req, res) => {
  res.send("worked management api");
});

const homeRouter = express.Router();
homeRouter.post("/uploads", upload.single("upload"), uploadFile);
homeRouter.post("/update-state", verifyStaffToken([]), updateState);
homeRouter.get("/statistic", verifyStaffToken([]), homeStatistic);
homeRouter.get(
  "/car/statistic",
  verifyStaffToken(["Director"]),
  getTopSellingCars
);

router.use("/home", homeRouter);

const authRouter = express.Router();
authRouter.post("/login", validateLogin, login);
authRouter.post("/login-google", loginWithGoogle);
authRouter.post("/verify_token", verifyStaffToken([]), verify_token);
router.use("/auth", authRouter);

const staffProfile = express.Router();
staffProfile.get("/", getProfile);
staffProfile.post("/update", updateProfile);
staffProfile.post("/password", changePassword);
router.use("/profile", verifyStaffToken([]), staffProfile);

const userRouter = express.Router();
userRouter.get("/query", query);
userRouter.post("/create", createCustomerValidation, createCustomer);
userRouter.delete("/delete", deleteCustomer);
userRouter.get("/:id", getCustomer);
userRouter.post("/:id", updateCustomerValidation, updateCustomer);
router.use("/customers", verifyStaffToken(["Director"]), userRouter);

const staffRoute = express.Router();
staffRoute.get("/query", queryStaff);
staffRoute.delete("/delete", deleteStaff);
staffRoute.post("/create", createStaffValidation, createStaff);
staffRoute.get("/:id", getStaff);
staffRoute.post("/:id", updateStaffValidation, updateStaff);
staffRoute.post("/:id/avatar", upload.single("avatar_url"), updateStaffAvatar);
router.use("/staffs", verifyStaffToken(["Director"]), staffRoute);

const roleRoute = express.Router();
roleRoute.get("/", queryRoles);
router.use("/roles", verifyStaffToken(["Director"]), roleRoute);

const showroomRoute = express.Router();
showroomRoute.get("/query", queryShowrooms);
showroomRoute.delete("/delete", deleteShowroom);
showroomRoute.post("/create", validateCreateShowroom, createShowroom);
showroomRoute.get("/:id", getShowroom);
showroomRoute.post("/:id", validateUpdateShowroom, updateShowroom);
router.use("/showrooms", verifyStaffToken(["Director"]), showroomRoute);

const settingsRoute = express.Router();
settingsRoute.get("/", querySettings);
settingsRoute.post("/", upload.any(), updateSettings);
router.use("/settings", verifyStaffToken(["Director"]), settingsRoute);

const categoriesRoute = express.Router();
categoriesRoute.get("/query", queryCategories);
categoriesRoute.delete("/delete", deleteCategories);
categoriesRoute.post("/create", createCategory);
categoriesRoute.get("/:id", getCategory);
categoriesRoute.post("/:id", updateCategory);
router.use("/categories", verifyStaffToken(["Director"]), categoriesRoute);

const newsRoute = express.Router();
newsRoute.get("/query", queryNews);
newsRoute.delete("/delete", deleteNews);
newsRoute.post("/create", createNews);
newsRoute.get("/:id", getNews);
newsRoute.post("/:id", updateNews);
router.use("/news", verifyStaffToken(["Director"]), newsRoute);

const orderRoute = express.Router();
orderRoute.get("/query", queryOrder);
orderRoute.delete("/delete", deleteOrders);
// orderRoute.post("/create", createOrder);
orderRoute.get("/:id", getOrder);
orderRoute.post("/:id", verifyStaffToken(["Director"]), updateOrder);
router.use("/orders", verifyStaffToken([]), orderRoute);

const testDriveRoute = express.Router();
testDriveRoute.get("/query", queryTestDrive);
testDriveRoute.delete("/delete", deleteTestDrive);
testDriveRoute.post("/create", createTestDrive);
testDriveRoute.get("/:id", getTestDrive);
testDriveRoute.post("/:id", updateTestDrive);
router.use(
  "/test-drive",
  verifyStaffToken(["Director", "Sale"]),
  testDriveRoute
);

const insuranceRoute = express.Router();
const insuranceProviderRoute = express.Router();
insuranceProviderRoute.get("/query", queryInsuranceProvider);
insuranceProviderRoute.delete("/delete", deleteInsuranceProvider);
insuranceProviderRoute.post(
  "/create",
  validateCreateInsuranceProvider,
  createInsuranceProvider
);
insuranceProviderRoute.get("/:id", getInsuranceProvider);
insuranceProviderRoute.post(
  "/:id",
  validateUpdateInsuranceProvider,
  updateInsuranceProvider
);
insuranceRoute.use(
  "/providers",
  verifyStaffToken(["Director"]),
  insuranceProviderRoute
);

const insuranceBaseRoute = express.Router();
insuranceBaseRoute.get("/query", queryInsurance);
insuranceBaseRoute.delete("/delete", deleteInsurance);
insuranceBaseRoute.post("/create", createInsurance);
insuranceBaseRoute.get("/:id", getInsurance);
insuranceBaseRoute.post("/:id", updateInsurance);
insuranceRoute.use("/base", verifyStaffToken(["Director"]), insuranceBaseRoute);

router.use(
  "/insurances",
  verifyStaffToken(["Director", "Insurance"]),
  insuranceRoute
);

const carRoute = express.Router();
carRoute.get("/query", queryCars);

const protectedCarRoute = express.Router();
protectedCarRoute.route("/detail/:id").get(getCarById);
protectedCarRoute.route("/delete").delete(deleteCar);
protectedCarRoute.route("/edit/:id").patch(upload.any(), updateCar); // Apply upload.any() middleware here
protectedCarRoute.post("/create", createNewCar);
protectedCarRoute.route("/brand").get(getAllBrands);
protectedCarRoute.route("/type").get(getAllTypes);
router.use("/cars", carRoute);
router.use("/cars", verifyStaffToken(["Director"]), protectedCarRoute);
export default router;
