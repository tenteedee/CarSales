import Showroom from "../../models/Showroom.js";
import { validationResult } from "express-validator";

export const getAllShowrooms = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const showrooms = await Showroom.findAll({
            attributes: ['id', 'name', 'address', 'phone_number', 'email']
        });
        res.status(200).json({ data: showrooms });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}


