import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {validationResult} from "express-validator";
import Customer from "../../models/Customer.js";
import {handleErrors, handleValidationErrors} from "../../helper/Validation.js";

export const register = async (req, res) => {
    // try {
    //     const { fullname, email, password } = req.body;

    //     const salt = await bcrypt.genSalt();
    //     const passwordHash = await bcrypt.hash(password, salt);

    //     if (!fullname || !email || !password) {
    //         return res.status(400).json({ error: 'Please provide all required fields' });
    //     }

    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).json({ error: 'User with this email already exists' });
    //     }

    //     const newUser = new User({
    //         fullname,
    //         email,
    //         password: passwordHash,
    //     });
    //     const user = await newUser.save();

    //     return res.status(200).json(user);
    // } catch (error) {
    //     res.status(500).json({ error: 'Something went wrong' });
    // }
};


export const login = async (req, res) => {
    try {
        // Check validation results
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(handleValidationErrors(errors));
        }
        const {email, password} = req.body;
        errors = {};
        const customer = await Customer.findOne({where: {email: email}});
        if (!customer) {
            errors.email = "The provided credentials are incorrect";
            return res.status(422).json(handleErrors(errors, errors.email));
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            errors.email = "The provided credentials are incorrect";
            return res.status(422).json(handleErrors(errors, errors.email));
        }
        const customerData = customer.toJSON();  // Convert to plain object
        const token = jwt.sign({id: customer.id}, process.env.JWT_SECRET);
        delete customerData.password;
        customerData.api_token = token
        res.status(200).json(customerData);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};