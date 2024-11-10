import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {
  handleErrors,
  handleValidationErrors,
} from "../../helper/ValidationHelper.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";
import { JWT_SECRET } from "../../config/Config.js";
import Showroom from "../../models/Showroom.js";

// Hàm lấy thông tin người dùng đang đăng nhập
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy ID người dùng từ token
    const staff = await Staff.findByPk(userId, {
      attributes: ["id", "fullname", "email", "phone_number", "address"],
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

    if (!staff) {
      return res.status(404).json(handleErrors({ error: "User not found" }));
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Hàm cập nhật thông tin hồ sơ
export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(handleValidationErrors(errors));
  }

  const userId = req.user.id;
  const { fullname, email, phone_number, address } = req.body;

  try {
    const staff = await Staff.findByPk(userId);

    if (!staff) {
      return res.status(404).json(handleErrors({ error: "User not found" }));
    }

    await staff.update({ fullname, email, phone_number, address });
    res.status(200).json({ message: "Profile updated successfully", staff });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Hàm thay đổi mật khẩu
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const staff = await Staff.findByPk(userId);
    if (!staff) {
      return res.status(404).json(handleErrors({ error: "Staff not found." }));
    }

    const isMatch = await bcrypt.compare(oldPassword, staff.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(handleErrors({ error: "Old password is incorrect." }));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await staff.update({ password: hashedNewPassword });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
