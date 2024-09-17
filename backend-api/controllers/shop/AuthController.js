import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validationResult} from "express-validator";
import {handleErrors, handleValidationErrors,} from "../../helper/ValidationHelper.js";
import Customer from "../../models/Customer.js";
import {OAuth2Client} from "google-auth-library";
import {GOOGLE_CLIENT_ID, JWT_SECRET} from "../../config/Config.js";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const verify_token = async (req, res) => {
    let errors = {};
    try {
        res.status(200).json(errors);
    } catch (err) {
        errors.error = err.message || "Exception error";
        res.status(500).json(errors);
    }
};
export const loginWithGoogle = async (req, res) => {
    let errors = {};
    try {
        const {token} = req.body;
        // Verify the token received from the client
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,  // Verify the audience matches your Google client ID
        });

        const {email, name} = ticket.getPayload();
    } catch (e) {

    }
};


export const login = async (req, res) => {
    let errors = {};
    try {
        errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(handleValidationErrors(errors));
        }

        const {email, password} = req.body;
        const customer = await Customer.findOne({where: {email: email}});

        if (!customer) {
            errors.email = "The provided credentials are incorrect";
            return res.status(422).json(handleErrors(errors, errors.email));
        }

        const customerData = customer.toJSON();
        //const isMatch = password === customerData.password;
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            errors.email = "The provided credentials are incorrect";
            return res.status(422).json(handleErrors(errors, errors.email));
        }

        const token = jwt.sign({id: customer.id}, JWT_SECRET, {
            expiresIn: "1h",
        });

        delete customerData.password;
        customerData.api_token = token;

        res.status(200).json(customerData);
    } catch (err) {
        errors.error = err.message || "Server error";
        res.status(500).json(errors);
    }
};
