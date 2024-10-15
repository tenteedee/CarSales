import Brand from "../models/Brand.js";
import Car from "../models/Car.js";
import CarImage from "../models/CarImage.js";
import CarType from "../models/CarType.js";
import Customer from "../models/Customer.js";
import Showroom from "../models/Showroom.js";
import Staff from "../models/Staff.js";
import StaffRole from "../models/StaffRole.js";
import TestDriveRequest from "../models/TestDriveRequest.js";

export function setupAssociations() {
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
  CarImage.belongsTo(Car, { foreignKey: "car_id", as: "car" });
  Car.hasOne(Brand, { foreignKey: "id", sourceKey: "brand_id", as: "brand" });
  Brand.belongsTo(Car, { foreignKey: "id", targetKey: "brand_id", as: "car" });
  Car.hasOne(CarType, { foreignKey: "id", sourceKey: "type_id", as: "type" });
  CarType.belongsTo(Car, { foreignKey: "id", targetKey: "type_id", as: "car" });
}
