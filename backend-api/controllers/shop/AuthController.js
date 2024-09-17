import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {
  handleErrors,
  handleValidationErrors,
} from "../../helper/Validation.js";
import Customer from "../../models/Customer.js";

export const login = async (req, res) => {
  let errors = {};
  try {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(handleValidationErrors(errors));
    }

    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email: email } });

    if (!customer) {
      errors.email = "The provided credentials are incorrect";
      return res.status(422).json(handleErrors(errors, errors.email));
    }

    const customerData = customer.toJSON();
    //const isMatch = password === customerData.password;
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      errors.email = "The provided credentials are incorrect";
      return res.status(422).json(handleErrors(errors, errors.email));
    }

    const token = jwt.sign({ id: customer.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete customerData.password;
    customerData.api_token = token;

    res.status(200).json(customerData);
  } catch (err) {
    errors.error = err.message || "Server error";
    res.status(500).json(errors);
  }
};
