import { body, check } from "express-validator";
export const validateCreateInsuranceProvider = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("name").notEmpty().withMessage("Name showroom is required."),
];
export const validateUpdateInsuranceProvider = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("name").notEmpty().withMessage("Name showroom is required."),
];
export const validateCreateShowroom = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("name").notEmpty().withMessage("Name showroom is required."),
  body("address").notEmpty().withMessage("Name showroom is required."),
];
export const validateUpdateShowroom = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("name").notEmpty().withMessage("Name showroom is required."),
  body("address").notEmpty().withMessage("Name showroom is required."),
];
export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long."),
];
export const createStaffValidation = [
  body("fullname").notEmpty().withMessage("Please provide a valid name"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  // body("password")
  //   .isLength({ min: 6, max: 30 })
  //   .withMessage("Mật khẩu phải có từ 6 đến 30 ký tự")
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  //   .withMessage(
  //     "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
  //   ),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("role_id").optional().isInt().withMessage("Vai trò không hợp lệ"),
  body("showroom_id").optional().isInt().withMessage("Showroom không hợp lệ"),
];

export const updateStaffValidation = [
  body("fullname").notEmpty().withMessage("Please provide a valid name"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  // body("password")
  //   .optional({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long")
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  //   .withMessage(
  //     "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
  //   ),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("role_id").optional().isInt().withMessage("Vai trò không hợp lệ"),
  body("showroom_id").optional().isInt().withMessage("Showroom không hợp lệ"),
];
export const createCustomerValidation = [
  body("fullname").notEmpty().withMessage("Please provide a valid name"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  // body("password")
  //   .optional({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long")
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  //   .withMessage(
  //     "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
  //   ),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
];
export const updateCustomerValidation = [
  body("fullname").notEmpty().withMessage("Please provide a valid name"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  // body("password")
  //   .optional({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage("Password must be at least 6 characters long")
  //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
  //   .withMessage(
  //     "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
  //   ),
  body("phone_number")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
];
export const validateRegister = [
  check("fullname", "Fullname is required").not().isEmpty(),
  check("email", "Please provide a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  check("phone_number", "Phone number is required").not().isEmpty(),
  check("address", "Address is required").not().isEmpty(),
  check("dob", "Date of birth is required").not().isEmpty(),
  check("dob", "Invalid date").isDate({ format: "DD-MM-YYYY" }),
];
// export const validateRegister = [
//   body('email').isEmail().withMessage('Please provide a valid email.'),
//   body('password')
//     .isLength({ min: 4 })
//     .withMessage('Password must be at least 4 characters long.'),
// ];
export const handleValidationErrors = (errors, message) => {
  return {
    message: message || "Validation errors",
    errors: errors.array().reduce((acc, error) => {
      acc[error.path] = error.msg;
      return acc;
    }, {}),
  };
};

export const handleErrors = (errors, message) => {
  return {
    message: message || "Errors",
    errors: errors || {},
  };
};