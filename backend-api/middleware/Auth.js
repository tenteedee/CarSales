import jwt from 'jsonwebtoken'
import {handleErrors} from "../helper/ValidationHelper.js";
import {JWT_SECRET} from "../config/Config.js";
import {checkStaffRole} from "../helper/RoleHelper.js";

export const verifyToken = async (req, res, next) => {
    let errors = {};
    try {
        let token = req.header("Authorization");
        if (!token) {
            errors.auth = "Unauthorized";
            res.status(401).json(handleErrors(errors), errors.auth)
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        errors.error = error.message || "Exception error";
        res.status(401).json(handleErrors(errors), errors.error)
    }
}
export const verifyStaffToken = (allowedRoles = []) => {
    return async (req, res, next) => {
        let errors = {};
        try {
            let token = req.header("Authorization");
            if (!token) {
                errors.auth = "Unauthorized";
                return res.status(401).json({error: errors.auth});
            }

            // Remove "Bearer " prefix from the token
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }

            // Verify the token using JWT
            const verified = jwt.verify(token, JWT_SECRET);
            req.user = verified;

            // If allowedRoles is empty, allow all roles; otherwise, check for specific role
            if (allowedRoles.length > 0 && !checkStaffRole(req.user, allowedRoles)) {
                return res.status(403).json({error: "You do not have access to this resource."});
            }

            next();
        } catch (error) {
            errors.error = error.message || "Exception error";
            return res.status(401).json({error: errors.error});
        }
    };
};