import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {
  handleErrors,
  handleValidationErrors,
} from '../../helper/ValidationHelper.js';
import Staff from '../../models/Staff.js';
import StaffRole from '../../models/StaffRole.js';
import { JWT_SECRET } from '../../config/Config.js';

export const verify_token = async (req, res) => {
  let errors = {};
  try {
    const user = req.user;
    const staff = await Staff.findOne({
      where: { id: user.id },
      include: [
        {
          model: StaffRole,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (staff) {
      const staffData = staff.toJSON();
      const token = jwt.sign(staffData, JWT_SECRET);
      delete staffData.password;
      staffData.api_token = token;
      res.status(200).json(staffData);
    } else {
      errors.error = 'Unauthorized';
      res.status(401).json(handleErrors(errors), errors.error);
    }
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
    const staff = await Staff.findOne({
      where: { email: email },
      include: [
        {
          model: StaffRole,
          as: 'role',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!staff) {
      errors.email = 'Email is not registered';
      return res.status(422).json(handleErrors(errors, errors.email));
    }

    const staffData = staff.toJSON();
    //const isMatch = password == staffData.password;
    const isMatch = await bcrypt.compare(password, staffData.password);
    if (!isMatch) {
      errors.password = 'Password is incorrect';
      return res.status(422).json(handleErrors(errors, errors.password));
    }

    const token = jwt.sign(staffData, JWT_SECRET);
    delete staffData.password;
    staffData.api_token = token;
    res.status(200).json(staffData);
  } catch (err) {
    errors.error = err.message || 'Exception error';
    res.status(500).json(errors);
  }
};
