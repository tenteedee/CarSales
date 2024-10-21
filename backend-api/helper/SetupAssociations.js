import Brand from '../models/Brand.js';
import Car from '../models/Car.js';
import CarColors from '../models/CarColors.js';
import CarImage from '../models/CarImage.js';
import CarType from '../models/CarType.js';
import Customer from '../models/Customer.js';
import News from '../models/News.js';
import NewsCategory from '../models/NewsCategory.js';
import OrderDetails from '../models/OrderDetails.js';
import Orders from '../models/Orders.js';
import Showroom from '../models/Showroom.js';
import Staff from '../models/Staff.js';
import StaffRole from '../models/StaffRole.js';
import TestDriveRequest from '../models/TestDriveRequest.js';
import Loan from '../models/Loan.js';

export function setupAssociations() {
  // Test-drive
  Customer.hasMany(TestDriveRequest, { foreignKey: 'customer_id' });
  TestDriveRequest.belongsTo(Customer, {
    foreignKey: 'customer_id',
  });

  Car.hasMany(TestDriveRequest, { foreignKey: 'car_id' });
  TestDriveRequest.belongsTo(Car, { foreignKey: 'car_id' });

  Staff.hasMany(TestDriveRequest, { foreignKey: 'sales_staff_id' });
  TestDriveRequest.belongsTo(Staff, {
    foreignKey: 'sales_staff_id',
  });

  // Staff
  Staff.belongsTo(StaffRole, { foreignKey: 'role_id', as: 'role' });
  Staff.belongsTo(Showroom, { foreignKey: 'showroom_id', as: 'showroom' });

  // Car
  Car.hasMany(CarImage, { foreignKey: 'car_id', as: 'images' });
  CarImage.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });
  Car.hasOne(Brand, { foreignKey: 'id', sourceKey: 'brand_id', as: 'brand' });
  Brand.belongsTo(Car, { foreignKey: 'id', targetKey: 'brand_id', as: 'car' });
  Car.hasOne(CarType, { foreignKey: 'id', sourceKey: 'type_id', as: 'type' });
  CarType.belongsTo(Car, { foreignKey: 'id', targetKey: 'type_id', as: 'car' });
  OrderDetails.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });
  Car.hasMany(Orders, { foreignKey: 'car_id', as: 'orders' });
  Orders.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });

  // CarColors
  CarColors.hasMany(OrderDetails, {
    foreignKey: 'car_color_id',
    as: 'order_details',
  });
  OrderDetails.belongsTo(CarColors, {
    foreignKey: 'car_color_id',
    as: 'car_color',
  });

  //Customer
  Customer.hasMany(Orders, { foreignKey: 'customer_id', as: 'orders' });
  Orders.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

  // Order
  Orders.hasMany(OrderDetails, { foreignKey: 'order_id', as: 'orderDetails' });
  OrderDetails.belongsTo(Orders, { foreignKey: 'order_id', as: 'order' });

  // News
  News.belongsTo(NewsCategory, { foreignKey: 'category_id', as: 'category' });
  News.belongsTo(Staff, { foreignKey: 'posted_by', as: 'posted' });
}
