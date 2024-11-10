import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {
  handleErrors,
  handleValidationErrors,
} from "../../helper/ValidationHelper.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../../config/Config.js";
import Showroom from "../../models/Showroom.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const loginWithGoogle = async (req, res) => {
  let errors = {};
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const { email, name } = ticket.getPayload();
    const staff = await Staff.findOne({
      where: { email: email },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!staff) {
      errors.email = "Email is not registered";
      return res.status(422).json(handleErrors(errors, errors.email));
    }
    const staffData = staff.toJSON();
    const apiToken = jwt.sign(staffData, JWT_SECRET);
    delete staffData.password;
    staffData.api_token = apiToken;
    res.status(200).json(staffData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const verify_token = async (req, res) => {
  let errors = {};
  try {
    const user = req.user;
    const staff = await Staff.findOne({
      where: { id: user.id },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
        {
          model: Showroom,
          as: "showroom",
          attributes: ["id", "name"],
        },
      ],
    });
    if (staff) {
      const staffData = staff.toJSON();
      const token = jwt.sign(staffData, JWT_SECRET);
      delete staffData.password;
      staffData.auth = {};
      staffData.auth.api_token = token;
      res.status(200).json(staffData);
    } else {
      errors.error = "Unauthorized";
      res.status(401).json(handleErrors(errors), errors.error);
    }
  } catch (err) {
    errors.error = err.message || "Exception error";
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
    errors = {};
    const { email, password } = req.body;
    const staff = await Staff.findOne({
      where: { email: email },
      include: [
        {
          model: StaffRole,
          as: "role",
          attributes: ["id", "name"],
        },
      ],
    });
    if (!staff) {
      errors.email = "Email is not registered";
      return res.status(422).json(handleErrors(errors, errors.email));
    }

    const staffData = staff.toJSON();
    const isMatch = await bcrypt.compare(password, staffData.password);
    if (!isMatch) {
      errors.password = "Password is incorrect";
      return res.status(422).json(handleErrors(errors, errors.password));
    }

    const token = jwt.sign(staffData, JWT_SECRET);
    delete staffData.password;
    staffData.api_token = token;
    res.status(200).json(staffData);
  } catch (err) {
    errors.error = err.message || "Exception error";
    res.status(500).json(errors);
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Lấy ID người dùng từ token đã xác thực

  let errors = {};
  try {
    // Tìm nhân viên theo ID
    const staff = await Staff.findByPk(userId);
    if (!staff) {
      errors.error = "Staff not found.";
      return res.status(404).json(handleErrors(errors, errors.error));
    }

    // So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, staff.password);
    if (!isMatch) {
      errors.error = "Old password is incorrect.";
      return res.status(400).json(handleErrors(errors, errors.error));
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    staff.password = hashedNewPassword; 
    await staff.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    errors.error = error.message || "Server error";
    res.status(500).json(errors);
  }
};
