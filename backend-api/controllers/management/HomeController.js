import db from "../../config/Database.js";
import { checkStaffRole } from "../../helper/RoleHelper.js";

const allowedTables = ["news", "users"];
const allowedColumns = ["status"];

const tableRoles = {
  news: ["Director"],
  users: ["Director"],
};

export const updateState = async (req, res) => {
  try {
    const { table, column, id, checked } = req.body;
    const user = req.user;
    if (!table || !column || !id || checked === undefined) {
      return res.status(400).json({ error: "Thiếu các trường bắt buộc" });
    }
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: "Tên bảng không hợp lệ" });
    }
    if (!allowedColumns.includes(column)) {
      return res.status(400).json({ error: "Tên cột không hợp lệ" });
    }
    const allowedRolesForTable = checkStaffRole(user, tableRoles[table]);
    if (!allowedRolesForTable) {
      return res
        .status(403)
        .json({ error: "Bạn không có quyền cập nhật bảng này" });
    }
    let state = checked == false ? 0 : 1;
    const formattedSql = `UPDATE ${table} SET ${column} = ${db.escape(
      state
    )} WHERE id = ${db.escape(id)}`;
    const [results] = await db.query(formattedSql, [state, id]);
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy bản ghi với id tương ứng" });
    }
    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Lỗi máy chủ" });
  }
};
