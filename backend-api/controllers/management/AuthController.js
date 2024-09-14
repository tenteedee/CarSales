import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";
import {handleErrors, handleValidationErrors} from "../../helper/Validation.js";
import Staff from "../../models/Staff.js";
import StaffRole from "../../models/StaffRole.js";

export const register = async (req, res) => {

};
export const verify_token = async (req, res) => {
    let errors = {};
    try{
        const user = req.user;
        const staff = await Staff.findOne({
            where: {id: user.id},
            include: [{
                model: StaffRole,
                as: 'role',
                attributes: ['id', 'name'] // Select the necessary fields from StaffRole
            }]
        });
        if (staff) {
            const staffData = staff.toJSON();  // Convert to plain object
            res.status(200).json(staffData);
        } else {
            errors.error = "Unauthorized";
            res.status(401).json(handleErrors(errors), errors.error)
        }
    } catch (err) {
        errors.error = err.message || "Exception error";
        res.status(500).json(errors);
    }

}

export const login = async (req, res) => {
    let errors = {};
    try {
        // Check validation results
        errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(handleValidationErrors(errors));
        }
        const {email, password} = req.body;
        errors = {};
        const staff = await Staff.findOne({
            where: {email: email},
            include: [{
                model: StaffRole,
                as: 'role',
                attributes: ['id', 'name'] // Select the necessary fields from StaffRole
            }]
        });
        if (!staff) {
            errors.email = "The provided credentials are incorrect";
            return res.status(422).json(handleErrors(errors, errors.email));
        }
        const staffData = staff.toJSON();  // Convert to plain object
        const isMatch = await bcrypt.compare(password, staffData.password);
        if (!isMatch) {
            errors.email = "The provided credentials are incorrect 1";
            return res.status(422).json(handleErrors(errors, errors.email));
        }
        const token = jwt.sign(staffData, process.env.JWT_SECRET);
        delete staffData.password;
        staffData.api_token = token
        res.status(200).json(staffData);
    } catch (err) {
        errors.error = err.message || "Exception error";
        res.status(500).json(errors);
    }
};