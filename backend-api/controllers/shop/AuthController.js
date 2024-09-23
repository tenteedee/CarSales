import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {
  handleErrors,
  handleValidationErrors,
} from '../../helper/ValidationHelper.js';
import Customer from '../../models/Customer.js';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../../config/Config.js';
import moment from 'moment';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const verify_token = async (req, res) => {
  let errors = {};
  try {
    res.status(200).json(errors);
  } catch (err) {
    errors.error = err.message || 'Exception error';
    res.status(500).json(errors);
  }
};
export const loginWithGoogle = async (req, res) => {
  let errors = {};
  try {
    const { token } = req.body;
    // Verify the token received from the client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID, // Verify the audience matches your Google client ID
    });
    const { email, name } = ticket.getPayload();
  } catch (e) {}
};

export const login = async (req, res) => {
  let errors = {};
  try {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(handleValidationErrors(errors));
    }
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email: email } });
    errors = {};
    if (!customer) {
      errors.email = 'Email is not registered';
      return res.status(422).json(handleErrors(errors, errors.email));
    }

    const customerData = customer.toJSON();
    //const isMatch = password == customerData.password;
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      errors.password = 'Password is incorrect';
      return res.status(422).json(handleErrors(errors, errors.password));
    }

    const token = jwt.sign({ id: customer.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    delete customerData.password;

    res.status(200).json({ user: customerData, token });
  } catch (err) {
    errors.error = err.message || 'Server error';
    res.status(500).json(errors);
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { fullname, email, password, phone_number, address, dob } = req.body;

    // Try to parse the dob
    const parsedDob = moment(
      dob,
      ['MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'],
      true
    );

    // Check if the date is valid
    if (!parsedDob.isValid()) {
      return res
        .status(422)
        .json({ errors: [{ msg: 'Invalid date', path: 'dob' }] });
    }

    // Format the date for storage
    const formattedDob = parsedDob.format('YYYY-MM-DD');

    // Check existing email
    const existingUser = await Customer.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newCustomer = await Customer.create({
      fullname,
      email,
      password: passwordHash,
      phone_number,
      address,
      date_of_birth: formattedDob, // Store the formatted date
    });

    const token = jwt.sign({ id: newCustomer.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const customerData = newCustomer.toJSON();
    delete customerData.password;
    customerData.api_token = token;

    res.status(200).json(customerData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
