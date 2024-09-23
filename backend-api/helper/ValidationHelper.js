import { body, check } from "express-validator";

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
