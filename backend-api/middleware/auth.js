import jwt from 'jsonwebtoken'
import {handleErrors} from "../helper/Validation.js";

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
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        errors.error = error.message || "Exception error";
        res.status(401).json(handleErrors(errors), errors.error)
    }
}