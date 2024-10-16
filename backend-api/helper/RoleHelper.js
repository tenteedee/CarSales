export const checkStaffRole = (staff, allowedRoles) => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!staff || !staff.role?.name) return false;
  return allowedRoles.includes(staff.role.name);
};
