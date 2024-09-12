import db from '../models/db.js';

export const login = (req, res) => {
  const { Email, Password } = req.body;

  const query = 'SELECT * FROM `User` WHERE Email = ? AND Password = ?';
  db.query(query, [Email, Password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      const user = results[0];

      if (user.Role === 0) {
        // Role = 0 => Customer
        return res.json({ message: 'Login successful', redirect: '/customer' });
      } else if (user.Role === 1) {
        // Role = 1 => Admin
        return res.json({ message: 'Login successful', redirect: '/admin' });
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};
