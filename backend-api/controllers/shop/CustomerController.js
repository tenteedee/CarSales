import Customer from '../../models/Customer.js';

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
