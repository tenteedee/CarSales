import TestDriveRequest from '../../models/TestDriveRequest.js';
import Car from '../../models/Car.js';
import { verifyToken } from '../../middleware/Auth.js';

export const requestTestDrive = async (req, res) => {
  const { car_id, test_drive_date } = req.body;
  const user_id = req.user.id;

  if (!car_id || !test_drive_date) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const selectedDate = new Date(test_drive_date);
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 2);

  if (selectedDate < minDate) {
    return res
      .status(400)
      .json({ error: 'Test drive date must be at least 2 days from today.' });
  }

  try {
    const car = await Car.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    const testDriveRequest = await TestDriveRequest.create({
      customer_id: user_id,
      car_id: car_id,
      test_drive_date: test_drive_date,
    });

    res.status(201).json({
      message: 'Test drive request created successfully.',
      data: testDriveRequest,
    });
  } catch (error) {
    console.error('Error creating test drive request:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
