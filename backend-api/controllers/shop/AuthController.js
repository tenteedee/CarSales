import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {
  handleErrors,
  handleValidationErrors,
} from '../../helper/ValidationHelper.js';
import Customer from '../../models/Customer.js';
import { OAuth2Client } from 'google-auth-library';
import {
  GOOGLE_CLIENT_ID,
  JWT_SECRET,
  FRONTEND_PORT,
} from '../../config/Config.js';
import moment from 'moment';

import dotenv from 'dotenv';
import passport from '../../config/PassportConfig.js';
dotenv.config();

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
    // const isMatch = password == customerData.password;
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      errors.password = 'Password is incorrect';
      return res.status(422).json(handleErrors(errors, errors.password));
    }

    const token = jwt.sign({ id: customer.id }, JWT_SECRET);

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

    const parsedDob = moment(
      dob,
      ['MM-DD-YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD'],
      true
    );

    if (!parsedDob.isValid()) {
      return res
        .status(422)
        .json({ errors: [{ msg: 'Invalid date', path: 'dob' }] });
    }

    const formattedDob = parsedDob.format('YYYY-MM-DD');

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
      date_of_birth: formattedDob,
    });

    // eslint-disable-next-line no-undef
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

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await Customer.findByPk(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const googleAuthInit = () => {
//   return passport.authenticate('google', { scope: ['profile', 'email'] });
// };

// export const googleAuthCallback = async (req, res, next) => {
//   try {
//     passport.authenticate('google', {
//       failureRedirect: '/login',
//       session: true,
//     })(req, res, next);

//     res.redirect(`http://localhost:${FRONTEND_PORT}/`);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const logout = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.redirect(`http://localhost:${FRONTEND_PORT}/login`);
//   });
// };

export const loginGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let customer = await Customer.findOne({ where: { googleId: sub } });

    if (!customer) {
      customer = await Customer.create({
        googleId: sub,
        fullname: name,
        email,
      });
    }
    const customerData = customer.toJSON();
    const token = jwt.sign({ id: customer.id }, JWT_SECRET);
    res.status(200).json({ user: customerData, token });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).send('Invalid token');
  }
};
