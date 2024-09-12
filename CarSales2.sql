CREATE DATABASE `CarSales`;
USE `CarSales`;
-- DROP DATABASE `CarSales`

-- Người dùng
CREATE TABLE `User` (
    `UserID` INT AUTO_INCREMENT PRIMARY KEY,
    `FullName` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `PhoneNumber` VARCHAR(20) NOT NULL,
    `Address` VARCHAR(200),
    `DateOfBirth` DATE,
    `Password` VARCHAR(50) NOT NULL,
    `Role` TINYINT(1) NOT NULL
);

-- Ô tô
CREATE TABLE `Car` (
    `CarID` INT AUTO_INCREMENT PRIMARY KEY,
    `ModelName` VARCHAR(100) NOT NULL,
    `Brand` VARCHAR(100) NOT NULL,
    `Price` DECIMAL(18,2) NOT NULL,
    `Description` VARCHAR(1000),
    `Warranty` INT
);

-- Hình ảnh xe
CREATE TABLE `CarImage` (
    `ImageID` INT AUTO_INCREMENT PRIMARY KEY,
    `CarID` INT,
    `ImageURL` VARCHAR(200) NOT NULL,
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);

-- Showroom
CREATE TABLE `Showroom` (
    `ShowroomID` INT AUTO_INCREMENT PRIMARY KEY,
    `ShowroomName` VARCHAR(100) NOT NULL,
    `Location` VARCHAR(200) NOT NULL
);

-- Yêu cầu lái thử
CREATE TABLE `TestDriveRequest` (
    `TestDriveID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `CarID` INT,
    `ScheduledDate` DATETIME NOT NULL,
    `ShowroomID` INT,
    `Status` VARCHAR(50) NOT NULL CHECK (`Status` IN ('Pending', 'Confirmed', 'Completed')),
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`),
    FOREIGN KEY (`ShowroomID`) REFERENCES `Showroom`(`ShowroomID`)
);

-- Đơn hàng
CREATE TABLE `Order` (
    `OrderID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `CarID` INT,
    `OrderDate` DATETIME NOT NULL,
    `TotalAmount` DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);

-- Chi tiết đơn hàng
CREATE TABLE `OrderDetail` (
    `OrderDetailID` INT AUTO_INCREMENT PRIMARY KEY,
    `OrderID` INT,
    `ItemType` VARCHAR(50) NOT NULL,
    `Amount` DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`)
);

-- Thanh toán
CREATE TABLE `Payment` (
    `PaymentID` INT AUTO_INCREMENT PRIMARY KEY,
    `OrderID` INT,
    `PaymentDate` DATETIME NOT NULL,
    `Amount` DECIMAL(18,2) NOT NULL,
    `PaymentMethod` VARCHAR(50) NOT NULL,
    FOREIGN KEY (`OrderID`) REFERENCES `Order`(`OrderID`)
);

-- Nhà cung cấp bảo hiểm
CREATE TABLE `InsuranceProvider` (
    `ProviderID` INT AUTO_INCREMENT PRIMARY KEY,
    `ProviderName` VARCHAR(100) NOT NULL,
    `ContactInfo` VARCHAR(200)
);

-- Chính sách bảo hiểm ô tô
CREATE TABLE `CarInsurancePolicy` (
    `PolicyID` INT AUTO_INCREMENT PRIMARY KEY,
    `ProviderID` INT,
    `CarID` INT,
    `CoverageDetails` VARCHAR(1000),
    FOREIGN KEY (`ProviderID`) REFERENCES `InsuranceProvider`(`ProviderID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);

-- Ngân hàng
CREATE TABLE `Bank` (
    `BankID` INT AUTO_INCREMENT PRIMARY KEY,
    `BankName` VARCHAR(100) NOT NULL,
    `InterestRate` DECIMAL(5,2) NOT NULL
);

-- Khoản vay
CREATE TABLE `Loan` (
    `LoanID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `BankID` INT,
    `CarID` INT,
    `LoanAmount` DECIMAL(18,2) NOT NULL,
    `LoanDuration` INT NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`),
    FOREIGN KEY (`BankID`) REFERENCES `Bank`(`BankID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);

-- Thanh toán khoản vay
CREATE TABLE `LoanPayment` (
    `PaymentID` INT AUTO_INCREMENT PRIMARY KEY,
    `LoanID` INT,
    `PaymentDate` DATETIME NOT NULL,
    `Amount` DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (`LoanID`) REFERENCES `Loan`(`LoanID`)
);

-- Dự toán chi phí
CREATE TABLE `Estimate` (
    `EstimateID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `CarID` INT,
    `PolicyID` INT,
    `LoanID` INT,
    `TotalCost` DECIMAL(18,2) NOT NULL,
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`),
    FOREIGN KEY (`PolicyID`) REFERENCES `CarInsurancePolicy`(`PolicyID`),
    FOREIGN KEY (`LoanID`) REFERENCES `Loan`(`LoanID`)
);

-- Khuyến mãi
CREATE TABLE `Promotion` (
    `PromotionID` INT AUTO_INCREMENT PRIMARY KEY,
    `CarID` INT,
    `Description` VARCHAR(200),
    `DiscountAmount` DECIMAL(18,2),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);

-- Phản hồi
CREATE TABLE `Feedback` (
    `FeedbackID` INT AUTO_INCREMENT PRIMARY KEY,
    `UserID` INT,
    `CarID` INT,
    `Content` VARCHAR(1000),
    `Rating` INT CHECK (`Rating` BETWEEN 1 AND 5),
    FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`),
    FOREIGN KEY (`CarID`) REFERENCES `Car`(`CarID`)
);
