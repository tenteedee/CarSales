import TestDriveRequest from '../../models/TestDriveRequest.js';
import Car from '../../models/Car.js';
import { verifyToken } from '../../middleware/Auth.js';
import Customer from '../../models/Customer.js';
import Brand from '../../models/Brand.js';
import CarType from '../../models/CarType.js';
import Staff from '../../models/Staff.js';

export const requestTestDrive = async (req, res) => {
  const { car_id, test_drive_date, showroom_id, customer_info, customer_id } =
    req.body;

  // Basic validation for required fields
  if (!car_id || !test_drive_date || !showroom_id) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Date validation to ensure at least 2 days from today
  const selectedDate = new Date(test_drive_date);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);

  if (selectedDate < minDate) {
    return res
      .status(400)
      .json({ error: 'Test drive date must be at least 2 days from today.' });
  }

  try {
    let finalCustomerId = customer_id; // Use customer_id if provided (logged-in user)

    // For non-logged-in users, create a new customer
    if (!customer_id && customer_info) {
      const { fullname, email, phone_number } = customer_info;

      // Ensure customer info is complete
      if (!fullname || !email || !phone_number) {
        return res
          .status(400)
          .json({ error: 'Customer information is incomplete.' });
      }

      // Check if a customer already exists with this email and phone number
      let customer = await Customer.findOne({ where: { email, phone_number } });

      if (!customer) {
        // Create a new customer if not found
        customer = await Customer.create({
          fullname,
          email,
          phone_number,
          password: '123@Aa',
        });
        console.log('New customer created with ID:', customer.id);
      } else {
        console.log('Existing customer found with ID:', customer.id);
      }

      // Use the new or existing customer's ID
      finalCustomerId = customer.id;
    }

    // Ensure finalCustomerId is set
    if (!finalCustomerId) {
      return res
        .status(400)
        .json({ error: 'Customer ID could not be determined.' });
    }

    // Verify the selected car exists
    const car = await Car.findByPk(car_id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }

    // Retrieve available sales staff for the selected showroom
    const salesStaff = await Staff.findAll({
      where: { role_id: 2, showroom_id: showroom_id },
    });
    if (!salesStaff.length) {
      return res
        .status(404)
        .json({ error: 'No sales staff available for the selected showroom.' });
    }

    // Randomly assign one of the available sales staff
    const randomSalesStaff =
      salesStaff[Math.floor(Math.random() * salesStaff.length)];

    // Create the test drive request record
    const testDriveRequest = await TestDriveRequest.create({
      customer_id: finalCustomerId,
      car_id,
      test_drive_date,
      showroom_id,
      sales_staff_id: randomSalesStaff.id,
    });

    // Return a successful response
    return res.status(201).json({
      data: testDriveRequest,
      message: 'Test drive request successfully created.',
    });
  } catch (error) {
    console.error(
      'Error creating test drive request:',
      error.message,
      error.stack
    );
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getAllTestDriveRequests = async (req, res) => {
  try {
    const testDriveRequests = await TestDriveRequest.findAll({
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    res.status(200).json(testDriveRequests);
  } catch (error) {
    console.error('Error fetching test drive requests:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getTestDriveRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const testDriveRequest = await TestDriveRequest.findByPk(id, {
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    if (!testDriveRequest) {
      return res.status(404).json({ error: 'Test drive request not found.' });
    }
    res.status(200).json(testDriveRequest);
  } catch (error) {
    console.error('Error fetching test drive request:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getTestDriveRequestByCustomerId = async (req, res) => {
  const customer_id = req.query.customer;
  try {
    const testDriveRequests = await TestDriveRequest.findAll({
      where: { customer_id },
      include: [
        {
          model: Car,
          attributes: ['model'],
          include: [
            {
              model: Brand,
              as: 'brand',
              attributes: ['name'],
            },
            {
              model: CarType,
              as: 'type',
              attributes: ['name'],
            },
          ],
        },
        {
          model: Customer,
          attributes: ['fullname', 'email', 'phone_number'],
        },
      ],
    });
    res.status(200).json(testDriveRequests);
  } catch (error) {
    console.error('Error fetching test drive requests:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
