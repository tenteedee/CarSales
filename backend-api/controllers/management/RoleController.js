import StaffRole from "../../models/StaffRole.js";

export const queryRoles = async (req, res) => {
  const roles = await StaffRole.findAll({});
  res.json({
    data: roles,
  });
};