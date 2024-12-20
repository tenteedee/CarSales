import Brand from "../models/Brand.js";
import Car from "../models/Car.js";
import CarImage from "../models/CarImage.js";
import CarType from "../models/CarType.js";
import Customer from "../models/Customer.js";
import Showroom from "../models/Showroom.js";
import Staff from "../models/Staff.js";
import StaffRole from "../models/StaffRole.js";
import TestDriveRequest from "../models/TestDriveRequest.js";
import Orders from "../models/Orders.js";
import OrderDetails from "../models/OrderDetails.js";
import Loan from "../models/Loan.js";
import CarColors from "../models/CarColors.js";
import NewsCategory from "../models/NewsCategory.js";
import News from "../models/News.js";
import Insurance from "../models/Insurance.js";
import InsuranceProvider from "../models/InsuranceProvider.js";
import InsuranceContract from "../models/InsuranceContract.js";
import Feedback from '../models/Feedback.js';

export function setupAssociations() {
  // News
  NewsCategory.hasMany(News, { foreignKey: "category_id" });
  News.belongsTo(NewsCategory, {
    foreignKey: "category_id",
    as: "category",
  });
  News.belongsTo(Staff, {
    foreignKey: "posted_by",
    as: "posted",
  });

  // Test-drive
  Customer.hasMany(TestDriveRequest, { foreignKey: "customer_id" });
  TestDriveRequest.belongsTo(Customer, {
    foreignKey: "customer_id",
  });

  Car.hasMany(TestDriveRequest, { foreignKey: "car_id" });
  TestDriveRequest.belongsTo(Car, { foreignKey: "car_id" });

  Staff.hasMany(TestDriveRequest, { foreignKey: "sales_staff_id" });
  TestDriveRequest.belongsTo(Staff, {
    foreignKey: "sales_staff_id",
  });

  // Staff
  Staff.belongsTo(StaffRole, { foreignKey: "role_id", as: "role" });
  Staff.belongsTo(Showroom, { foreignKey: "showroom_id", as: "showroom" });

  // Car
  Car.hasMany(CarImage, { foreignKey: "car_id", as: "images" });
  //CarImage.belongsTo(Car, { foreignKey: "car_id", as: "carImages" });
  Car.belongsTo(CarColors, { foreignKey: "color_id", as: "colors" });
  CarColors.hasMany(Car, { foreignKey: "color_id", as: "carColors" });
  Car.belongsTo(CarType, { foreignKey: "type_id", as: "type" });
  Car.belongsTo(Brand, { foreignKey: "brand_id", as: "brand" });

  //Order
  Customer.hasMany(Orders, { foreignKey: "customer_id", as: "order" });
  Orders.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
  Orders.hasMany(OrderDetails, { foreignKey: "order_id", as: "order_details" });
  OrderDetails.belongsTo(Orders, { foreignKey: "order_id", as: "order" });

  Orders.belongsTo(Loan, { foreignKey: "loan_id", as: "loan" });
  Loan.hasMany(Orders, { foreignKey: "loan_id", as: "order" });

  Customer.hasMany(Loan, { foreignKey: "customer_id", as: "loans" });
  Loan.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

  Car.hasMany(Orders, { foreignKey: "car_id" });
  Orders.belongsTo(Car, { foreignKey: "car_id" });

  Orders.belongsTo(Staff, {
    foreignKey: "sales_staff_id",
    as: "sales_staff",
  });
  Orders.belongsTo(Staff, {
    foreignKey: "technical_staff_id",
    as: "technical_staff",
  });
  Orders.belongsTo(Staff, {
    foreignKey: "insurance_staff_id",
    as: "insurance_staff",
  });

  //Showroom
  Showroom.hasMany(Orders, { foreignKey: "showroom_id" });
  Orders.belongsTo(Showroom, { foreignKey: "showroom_id" });
  Showroom.hasMany(Staff, { foreignKey: "showroom_id", as: "staff" });
  CarType.belongsTo(Car, { foreignKey: "id", targetKey: "type_id", as: "car" });

  TestDriveRequest.belongsTo(Showroom, { foreignKey: "showroom_id" });
  Showroom.hasMany(TestDriveRequest, { foreignKey: "showroom_id" });

  // Insurance
  Insurance.belongsTo(InsuranceProvider, {
    foreignKey: "insurance_provider_id",
    as: "provider",
  });
  Insurance.hasMany(InsuranceContract, {
    foreignKey: "insurance_id",
    as: "contracts",
  });
  InsuranceContract.belongsTo(InsuranceProvider, {
    foreignKey: "provider_id",
    as: "provider",
  });
  InsuranceContract.belongsTo(Insurance, {
    foreignKey: "insurance_id",
    as: "insurance",
  });

  // Feedback
  Feedback.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });
  Car.hasMany(Feedback, { foreignKey: 'car_id', as: 'feedbacks' });

  Feedback.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });
  Customer.hasMany(Feedback, { foreignKey: 'customer_id', as: 'feedbacks' });
}
