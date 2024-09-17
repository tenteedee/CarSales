export const checkStaffRole = (staff, allowedRoles) => {
    // If allowedRoles is empty or undefined, allow all roles
    if (!allowedRoles || allowedRoles.length === 0) return true;

    // Check if staff exists and has a role
    if (!staff || !staff.role?.name) return false;

    // Check if the staff's role is in the allowedRoles array
    return allowedRoles.includes(staff.role.name);
};
