import {body} from 'express-validator';

export const validateLogin = [
    body('email').isEmail().withMessage('Please provide a valid email.'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long.')
];

export const handleValidationErrors = (errors, message) => {
    return {
        message: message || "Validation errors",
        errors: errors.array().reduce((acc, error) => {
            acc[error.path] = [error.msg];
            return acc;
        }, {})
    };
};

export const handleErrors = (errors, message) => {
    return {
        message: message || "Errors",
        errors: errors || {}
    };
};
