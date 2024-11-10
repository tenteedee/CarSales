import Customer from '../../models/Customer.js';
import { JWT_SECRET } from '../../config/Config.js';
import jwt from 'jsonwebtoken';

export const getCustomerProfile = async (req, res) => {
  try {
    console.log(req.user);
    const user = await Customer.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const customerId = decoded.id;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { phone_number, address, date_of_birth } = req.body;
    customer.phone_number = phone_number;
    customer.address = address;
    customer.date_of_birth = new Date(date_of_birth);

    await customer.save();

    res.status(200).json({ message: 'Profile updated successfully', customer });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
