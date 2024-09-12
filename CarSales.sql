CREATE DATABASE CarSales;
GO

-- USE master
-- DROP DATABASE CarSales

USE CarSales;
GO

-- Người dùng
CREATE TABLE [User] (
    [UserID] INT IDENTITY(1,1) PRIMARY KEY,
    [FullName] NVARCHAR(100) NOT NULL,
    [Email] NVARCHAR(100) NOT NULL,
    [PhoneNumber] NVARCHAR(20) NOT NULL,
    [Address] NVARCHAR(200),
    [DateOfBirth] DATE,
    [Password] NVARCHAR(50) NOT NULL,
    [Role] BIT NOT NULL 
);
GO

-- Ô tô
CREATE TABLE [Car] (
    [CarID] INT IDENTITY(1,1) PRIMARY KEY,
    [ModelName] NVARCHAR(100) NOT NULL,
    [Brand] NVARCHAR(100) NOT NULL,
    [Price] DECIMAL(18,2) NOT NULL,
    [Description] NVARCHAR(1000),
    [Warranty] INT
);
GO

-- Hình ảnh xe
CREATE TABLE [CarImage] (
    [ImageID] INT IDENTITY(1,1) PRIMARY KEY,
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [ImageURL] NVARCHAR(200) NOT NULL
);
GO

-- Showroom
CREATE TABLE [Showroom] (
    [ShowroomID] INT IDENTITY(1,1) PRIMARY KEY,
    [ShowroomName] NVARCHAR(100) NOT NULL,
    [Location] NVARCHAR(200) NOT NULL
);
GO

-- Yêu cầu lái thử
CREATE TABLE [TestDriveRequest] (
    [TestDriveID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT FOREIGN KEY REFERENCES [User]([UserID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [ScheduledDate] DATETIME NOT NULL,
    [ShowroomID] INT FOREIGN KEY REFERENCES [Showroom]([ShowroomID]),
    [Status] NVARCHAR(50) CHECK ([Status] IN ('Pending', 'Confirmed', 'Completed')) NOT NULL
);
GO

-- Đơn hàng
CREATE TABLE [Order] (
    [OrderID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT FOREIGN KEY REFERENCES [User]([UserID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [OrderDate] DATETIME NOT NULL,
    [TotalAmount] DECIMAL(18,2) NOT NULL
);
GO

-- Chi tiết đơn hàng
CREATE TABLE [OrderDetail] (
    [OrderDetailID] INT IDENTITY(1,1) PRIMARY KEY,
    [OrderID] INT FOREIGN KEY REFERENCES [Order]([OrderID]),
    [ItemType] NVARCHAR(50) NOT NULL, -- 'Car', 'Insurance', 'Loan'
    [Amount] DECIMAL(18,2) NOT NULL
);
GO

-- Thanh toán
CREATE TABLE [Payment] (
    [PaymentID] INT IDENTITY(1,1) PRIMARY KEY,
    [OrderID] INT FOREIGN KEY REFERENCES [Order]([OrderID]),
    [PaymentDate] DATETIME NOT NULL,
    [Amount] DECIMAL(18,2) NOT NULL,
    [PaymentMethod] NVARCHAR(50) NOT NULL -- 'Credit Card', 'Bank Transfer'
);
GO

-- Nhà cung cấp bảo hiểm
CREATE TABLE [InsuranceProvider] (
    [ProviderID] INT IDENTITY(1,1) PRIMARY KEY,
    [ProviderName] NVARCHAR(100) NOT NULL,
    [ContactInfo] NVARCHAR(200)
);
GO

-- Chính sách bảo hiểm ô tô
CREATE TABLE [CarInsurancePolicy] (
    [PolicyID] INT IDENTITY(1,1) PRIMARY KEY,
    [ProviderID] INT FOREIGN KEY REFERENCES [InsuranceProvider]([ProviderID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [CoverageDetails] NVARCHAR(1000)
);
GO

-- Ngân hàng
CREATE TABLE [Bank] (
    [BankID] INT IDENTITY(1,1) PRIMARY KEY,
    [BankName] NVARCHAR(100) NOT NULL,
    [InterestRate] DECIMAL(5,2) NOT NULL
);
GO

-- Khoản vay
CREATE TABLE [Loan] (
    [LoanID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT FOREIGN KEY REFERENCES [User]([UserID]),
    [BankID] INT FOREIGN KEY REFERENCES [Bank]([BankID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [LoanAmount] DECIMAL(18,2) NOT NULL,
    [LoanDuration] INT NOT NULL -- Months
);
GO

-- Thanh toán khoản vay
CREATE TABLE [LoanPayment] (
    [PaymentID] INT IDENTITY(1,1) PRIMARY KEY,
    [LoanID] INT FOREIGN KEY REFERENCES [Loan]([LoanID]),
    [PaymentDate] DATETIME NOT NULL,
    [Amount] DECIMAL(18,2) NOT NULL
);
GO

-- Dự toán chi phí
CREATE TABLE [Estimate] (
    [EstimateID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT FOREIGN KEY REFERENCES [User]([UserID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [PolicyID] INT FOREIGN KEY REFERENCES [CarInsurancePolicy]([PolicyID]),
    [LoanID] INT FOREIGN KEY REFERENCES [Loan]([LoanID]),
    [TotalCost] DECIMAL(18,2) NOT NULL
);
GO

-- Khuyến mãi
CREATE TABLE [Promotion] (
    [PromotionID] INT IDENTITY(1,1) PRIMARY KEY,
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [Description] NVARCHAR(200),
    [DiscountAmount] DECIMAL(18,2)
);
GO

-- Phản hồi
CREATE TABLE [Feedback] (
    [FeedbackID] INT IDENTITY(1,1) PRIMARY KEY,
    [UserID] INT FOREIGN KEY REFERENCES [User]([UserID]),
    [CarID] INT FOREIGN KEY REFERENCES [Car]([CarID]),
    [Content] NVARCHAR(1000),
    [Rating] INT CHECK ([Rating] BETWEEN 1 AND 5)
);
GO
