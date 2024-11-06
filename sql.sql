/*
 Navicat Premium Data Transfer

 Source Server         : 103.239.66.182
 Source Server Type    : MySQL
 Source Server Version : 100703 (10.7.3-MariaDB-log)
 Source Host           : 103.239.66.182:3306
 Source Schema         : swp391_g4

 Target Server Type    : MySQL
 Target Server Version : 100703 (10.7.3-MariaDB-log)
 File Encoding         : 65001

 Date: 05/11/2024 07:42:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banks
-- ----------------------------
DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `interest_rate` decimal(5, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of banks
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of brands
-- ----------------------------
BEGIN;
INSERT INTO `brands` (`id`, `name`) VALUES (1, 'Hyundai');
COMMIT;

-- ----------------------------
-- Table structure for car_colors
-- ----------------------------
DROP TABLE IF EXISTS `car_colors`;
CREATE TABLE `car_colors`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `color_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_colors
-- ----------------------------
BEGIN;
INSERT INTO `car_colors` (`id`, `color_name`, `created_at`, `updated_at`) VALUES (1, 'Red', '2024-10-22 00:14:36', '2024-10-22 00:14:36'), (2, 'Blue', '2024-10-22 00:14:36', '2024-10-22 00:14:36'), (3, 'Green', '2024-10-22 00:14:36', '2024-10-22 00:14:36'), (7, 'Grey', '2024-10-22 00:15:59', '2024-10-22 00:15:59');
COMMIT;

-- ----------------------------
-- Table structure for car_images
-- ----------------------------
DROP TABLE IF EXISTS `car_images`;
CREATE TABLE `car_images`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  CONSTRAINT `car_images_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_images
-- ----------------------------
BEGIN;
INSERT INTO `car_images` (`id`, `car_id`, `image_url`, `created_at`, `updated_at`) VALUES (1, 1, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/68/blocks/1/1.jpg', '2024-09-17 23:38:24', '2024-09-17 23:38:24'), (4, 3, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/47/blocks/1/tucson-nx4-fmc-highlights-step-in-stand-out-pc.webp', '2024-09-19 00:45:59', '2024-09-19 00:45:59'), (5, 3, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/47/blocks/1/tucson-nx4-highlights-gallery-01-pc.webp', '2024-09-19 00:45:59', '2024-09-19 00:45:59'), (6, 4, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/94/blocks/1/QXI_PE_2022_P_GUIDE_GEN_LHD_EXTERIOR.jpg', '2024-09-26 00:27:47', '2024-09-26 00:27:47'), (7, 5, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/93/blocks/3/0R1A0281%20copy.jpg', '2024-09-26 00:28:22', '2024-09-26 00:28:22'), (8, 6, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/85/blocks/1/STARGAZER-X-Galeri_4%20(1).jpg', '2024-09-26 00:28:55', '2024-09-26 00:28:55'), (9, 7, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/91/blocks/6/ioniq5-german-awards-winner-pc.jpg', '2024-09-26 08:20:11', '2024-09-26 08:20:11'), (10, 8, 'https://hyundaithanhhoa.org/wp-content/uploads/2020/08/hyundai-starex-van-3-cho-may-dau-826782j24860.jpg', '2024-09-26 08:22:13', '2024-09-26 08:22:13'), (11, 9, 'https://drive.gianhangvn.com/image/2aoewdx-2648026j30542.jpg', '2024-09-26 08:23:19', '2024-09-26 08:23:19'), (12, 10, 'https://drive.gianhangvn.com/image/hyundai-elantra-2-0-at-cao-cap-2487694j32675.jpg', '2024-09-26 08:23:51', '2024-09-26 08:23:51'), (13, 11, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/106/blocks/1/banner-3-1200x600.png', '2024-09-26 08:24:38', '2024-09-26 08:24:38'), (14, 12, 'https://hyundai-api.thanhcong.vn/storage/uploads/product/banner-1425x540.png', '2024-09-26 08:25:32', '2024-09-26 08:25:32');
COMMIT;

-- ----------------------------
-- Table structure for car_options
-- ----------------------------
DROP TABLE IF EXISTS `car_options`;
CREATE TABLE `car_options`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `option_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `price` decimal(15, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_options
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for car_types
-- ----------------------------
DROP TABLE IF EXISTS `car_types`;
CREATE TABLE `car_types`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_types
-- ----------------------------
BEGIN;
INSERT INTO `car_types` (`id`, `name`) VALUES (1, 'SUV'), (2, 'MPV'), (3, 'EV'), (4, 'Mini Van'), (5, 'Travel Car'), (6, 'Comercial EU5');
COMMIT;

-- ----------------------------
-- Table structure for cars
-- ----------------------------
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `brand_id` int NOT NULL,
  `type_id` int NOT NULL,
  `price` decimal(15, 2) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `stock` int NULL DEFAULT 0,
  `color_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `fk_car_color`(`color_id` ASC) USING BTREE,
  UNIQUE INDEX `unique_color_id`(`color_id` ASC) USING BTREE,
  INDEX `type`(`type_id` ASC) USING BTREE,
  INDEX `brand`(`brand_id` ASC) USING BTREE,
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `car_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cars_ibfk_3` FOREIGN KEY (`color_id`) REFERENCES `car_colors` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of cars
-- ----------------------------
BEGIN;
INSERT INTO `cars` (`id`, `model`, `brand_id`, `type_id`, `price`, `content`, `description`, `stock`, `color_id`, `created_at`, `updated_at`) VALUES (1, 'Creta', 1, 1, 500000000.00, '<figure class=\"table\"><table><tbody><tr><td colspan=\"2\"><strong>Kích thước &amp; Trọng lượng</strong></td></tr><tr><td><strong>Kích thước tổng thể (DxRxC) (mm)</strong></td><td>4315 x 1790 x 1660</td></tr><tr><td><strong>Chiều dài cơ sở (mm)</strong></td><td>2610</td></tr><tr><td><strong>Khoảng sáng gầm xe (mm)</strong></td><td>200</td></tr><tr><td><strong>Dung tích bình nhiên liệu (Lít)</strong></td><td>40</td></tr></tbody></table></figure><figure class=\"table\"><table><tbody><tr><td colspan=\"2\"><strong>Động Cơ, Hộp số &amp; Vận hành</strong></td></tr><tr><td><strong>Động cơ</strong></td><td>SmartStream G1.5</td></tr><tr><td><strong>Dung tích xi lanh (cc)</strong></td><td>1497</td></tr><tr><td><strong>Công suất cực đại (PS/rpm)</strong></td><td>115/6300</td></tr><tr><td><strong>Mô men xoắn cực đại (Nm/rpm)</strong></td><td>144/ 4500</td></tr><tr><td><strong>Hộp số</strong></td><td>IVT</td></tr><tr><td><strong>Hệ thống dẫn động</strong></td><td>FWD</td></tr><tr><td><strong>Phanh trước/sau</strong></td><td>Đĩa/Đĩa</td></tr><tr><td><strong>Hệ thống treo trước</strong></td><td>McPherson</td></tr><tr><td><strong>Hệ thống treo sau</strong></td><td>Thanh cân bằng</td></tr><tr><td><strong>Trợ lực lái</strong></td><td>Điện</td></tr><tr><td><strong>Thông số lốp</strong></td><td>215/60R17</td></tr><tr><td><strong>Chất liệu lazang</strong></td><td>Hợp kim nhôm</td></tr></tbody></table></figure>', ' The Hyundai Creta offers a blend of style, comfort, and efficiency, making it a great choice for family adventures or city commuting. With its spacious interior and modern tech, it provides a smooth and enjoyable driving experience', 5, NULL, '2024-09-17 23:37:51', '2024-10-31 08:25:43'), (3, 'Tucson', 1, 1, 500000000.00, NULL, '\r\n The Hyundai Tucson stands out with its bold design and robust performance. Equipped with cutting-edge technology and safety features, it ensures a confident and connected drive', 5, NULL, '2024-09-19 00:45:59', '2024-10-22 00:10:30'), (4, 'Venue', 1, 1, 300000000.00, NULL, 'Hyundai Venue is a combination of advanced technology, outstanding performance and new-age style.', 10, NULL, '2024-09-19 01:00:29', '2024-10-21 21:29:33'), (5, 'Custin', 1, 2, 700000000.00, NULL, 'The \"Parametric Dynamics\" design style on Hyundai Custin combined with sophisticated modern lines creates a unique youthful beauty.', 7, NULL, '2024-09-19 01:01:31', '2024-10-21 21:29:37'), (6, 'Stargazer X', 1, 2, 650000000.00, NULL, 'Hyundai STARGAZER X with bold, new design, equipped with amenities, engine power and maximum safety brings comfort, convenience and safety to every trip', 3, NULL, '2024-09-19 01:02:22', '2024-10-22 00:30:28'), (7, 'IONIQ 5', 1, 3, 350000000.00, NULL, NULL, 10, NULL, '2024-09-19 01:03:10', '2024-10-21 21:29:42'), (8, 'Starex', 1, 4, 300000000.00, NULL, NULL, 0, NULL, '2024-09-19 01:04:07', '2024-10-21 21:29:44'), (9, 'Grand i10', 1, 5, 300000000.00, NULL, 'Grand i10 has the largest size in its segment, providing maximum comfort. In addition, it is meticulous and sophisticated in details and utilities.', 15, NULL, '2024-09-19 01:04:59', '2024-10-21 21:29:46'), (10, 'Elantra', 1, 5, 500000000.00, NULL, 'Dare to challenge reality and find the courage to fail. Open the world of tomorrow by your own standards, not the world\'s. Dare to be yourself.', 10, NULL, '2024-09-19 01:06:09', '2024-10-21 21:29:49'), (11, 'W11 Series', 1, 6, 1000000000.00, NULL, 'Hyundai Mighty W11 Series is a comprehensive transportation solution with high flexibility and optimal cost savings.', 3, NULL, '2024-09-19 01:07:25', '2024-10-21 21:30:00'), (12, 'Solati', 1, 6, 500000000.00, NULL, 'Standard shuttle bus.', 6, NULL, '2024-09-19 01:09:11', '2024-10-21 21:29:56'), (13, 'toyota', 1, 1, 100000000.00, NULL, 'Toyota', 1, NULL, '2024-10-26 11:48:57', '2024-10-26 11:48:57');
COMMIT;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `date_of_birth` date NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
BEGIN;
INSERT INTO `customers` (`id`, `google_id`, `fullname`, `password`, `email`, `created_at`, `updated_at`, `phone_number`, `address`, `date_of_birth`) VALUES (1, NULL, 'Tran Duc', '123456', 'duc@gmail.com', '2024-09-13 16:10:32', '2024-09-17 10:41:14', '0987654321', 'hanoi', '2004-10-12'), (3, NULL, 'customer123', '$2b$10$Qhn6vuqMZnFbLg7Z/ahGQ.YFX/mILM3p6HMK1pKY9Su7Mxf4Hnd4W', 'vtd.junoo@gmail.com', '2024-09-17 10:39:33', '2024-10-29 09:39:33', '0987654321', 'Nam Dinh', '2000-10-09'), (4, NULL, 'duc', '$2b$10$8T2B.w2KhVFTTfWS7ml2EOywHomplAqAb8UL8ONQ2612ie5O8kS7a', 'duc123@gmail.com', '2024-09-19 07:36:58', '2024-09-19 07:36:58', '0987654321', 'vn', '2000-10-09'), (9, NULL, 'user', '$2b$10$09FvUCDg15.r4A0x00/icuALuHaQnci5T4jtjMYzGa2yTtBumAHPq', 'user@gmail.com', '2024-09-24 00:40:15', '2024-09-29 16:18:08', '0987654321', 'vn', '2000-10-18'), (11, NULL, 'user2', '$2b$10$4VseS5JkPna6MV.p34Ot2eBlKB5Tl9KaG8oe/nqoIE31UpR8yPGYi', 'user2@gmail.com', '2024-10-01 11:16:28', '2024-10-29 12:02:05', '0987654321', 'Hà Nội', '2000-10-10'), (12, NULL, 'abc_123', '$2b$10$iohv5uGQQur4ShoS8ZDmsOWkc7c7KxRr09iCwTd8TElJV.4clR/Y2', 'sanic0395640@gmail.com', '2024-10-02 21:16:41', '2024-10-02 21:27:28', '0395640700', 'hà nội', '1997-05-03'), (13, NULL, 'user3', '$2b$10$6zgs1zDabhwVOKhpnqSHDunKy0cg2y0yiy99eEXzE3.YhgbumakJu', 'user3@gmail.com', '2024-10-02 23:48:32', '2024-10-02 23:48:32', '0987654321', 'Hà Nội', '2000-10-10'), (14, NULL, 'abc_124', '$2b$10$BgGKi7lF56u9Y1Qup4ughu.s4oslvfU//LwU.eyPb1ozBySV8xrCe', 'nguyenthucanh0004@gmail.com', '2024-10-04 19:10:41', '2024-10-04 19:10:41', '0395640700', 'hà nội', '2004-05-03'), (15, NULL, 'abc_123', '$2b$10$VfA/fmo8XZG9x3CW0iTEqOACHlW73B2wlXbI.z6sA2z3e.whZcf46', 'nguyenthucanh0000@gmail.com', '2024-10-07 02:09:14', '2024-10-07 02:39:01', '0395640700', 'hà nội', '1155-05-03'), (16, '107607863509256257146', 'Tran Tien Duc', NULL, 'tranduc2004nd01@gmail.com', '2024-10-10 08:25:29', '2024-10-22 07:33:48', '0987654431', 'VN', '2004-10-12'), (19, NULL, 'abc', '123@Aa', 'guest@gmail.com', '2024-11-04 23:48:52', '2024-11-04 23:48:52', '0886672025', NULL, NULL), (20, NULL, 'Tran Tien Duc', '123@Aa', 'tranduc248nd@gmail.com', '2024-11-05 00:36:30', '2024-11-05 00:36:30', '0886672025', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for insurance_contracts
-- ----------------------------
DROP TABLE IF EXISTS `insurance_contracts`;
CREATE TABLE `insurance_contracts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int NULL DEFAULT NULL,
  `provider_id` int NULL DEFAULT NULL,
  `contract_number` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(15, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `insurance_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `provider_id`(`provider_id` ASC) USING BTREE,
  INDEX `insurance_type_id`(`insurance_id` ASC) USING BTREE,
  CONSTRAINT `insurance_contracts_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_contracts_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `insurance_providers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_contracts_ibfk_3` FOREIGN KEY (`insurance_id`) REFERENCES `insurances` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_contracts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for insurance_providers
-- ----------------------------
DROP TABLE IF EXISTS `insurance_providers`;
CREATE TABLE `insurance_providers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_providers
-- ----------------------------
BEGIN;
INSERT INTO `insurance_providers` (`id`, `name`, `phone_number`, `email`, `created_at`, `updated_at`) VALUES (1, 'MIC', '0983673716', 'mic@gmail.com', '2024-10-28 21:31:26', '2024-10-28 21:32:09'), (2, 'Pjico', '0932476234', 'pjico@gmail.com', '2024-10-28 21:32:05', '2024-10-28 21:32:27'), (3, 'Petro', '02345272453', 'petro@gmail.com', '2024-10-28 21:33:26', '2024-10-28 21:33:26'), (4, 'Bảo Việt1', '022748127422', 'baoviet@gmail.com1', '2024-10-28 21:33:57', '2024-10-31 08:39:59'), (5, '12', '07623526732', 'vtd.junoo@iclo2ud.com', '2024-10-31 08:50:59', '2024-10-31 09:19:36');
COMMIT;

-- ----------------------------
-- Table structure for insurances
-- ----------------------------
DROP TABLE IF EXISTS `insurances`;
CREATE TABLE `insurances`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `insurance_provider_id` int NULL DEFAULT NULL,
  `type` int NULL DEFAULT NULL COMMENT '1 -> bắt buộc\r\n2 -> thân vỏ',
  `type_price` int NULL DEFAULT NULL COMMENT 'cách tính tiền bảo hiểm, 1 là theo % giá xe,2 là số tiền trực tiếp',
  `price` bigint NULL DEFAULT NULL COMMENT 'số tiền bh,nếu là 1 -> tính theo % xe,2 là tính giá bth',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurances
-- ----------------------------
BEGIN;
INSERT INTO `insurances` (`id`, `name`, `description`, `insurance_provider_id`, `type`, `type_price`, `price`) VALUES (1, 'Bảo hiểm TNDS', 'Bảo hiểm trách nhiệm dân sự, bắt buộc khi mua xe.', 4, 1, 1, 481000), (2, 'Bảo hiểm thân vỏ MIC', 'Bảo hiểm thân vỏ MIC', 1, 2, 2, 5), (3, 'Bảo hiểm thân vỏ Pjico', 'Bảo hiểm thân vỏ Pjico', 2, 2, 2, 7), (4, 'Bảo hiểm thân vỏ PVI', 'Bảo hiểm thân vỏ PVI', 3, 2, 1, 6250000);
COMMIT;

-- ----------------------------
-- Table structure for loans
-- ----------------------------
DROP TABLE IF EXISTS `loans`;
CREATE TABLE `loans`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `loan_amount` decimal(15, 2) NOT NULL,
  `duration_months` int NOT NULL,
  `customer_id` int NULL DEFAULT NULL,
  `bank_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `bank_id`(`bank_id` ASC) USING BTREE,
  CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of loans
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `heading` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `image` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `status` int NOT NULL DEFAULT 0,
  `is_pin` int NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `posted_by` int NULL DEFAULT NULL,
  `category_id` int NULL DEFAULT NULL,
  `views` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_author_staff`(`posted_by` ASC) USING BTREE,
  INDEX `fk_category_news`(`category_id` ASC) USING BTREE,
  CONSTRAINT `fk_author_staff` FOREIGN KEY (`posted_by`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_category_news` FOREIGN KEY (`category_id`) REFERENCES `news_categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 127 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of news
-- ----------------------------
BEGIN;
INSERT INTO `news` (`id`, `title`, `content`, `heading`, `image`, `status`, `is_pin`, `created_at`, `updated_at`, `posted_by`, `category_id`, `views`) VALUES (1, 'Tiêu đề đây này', '<p>3</p>', NULL, 'https://photo-baomoi.bmcdn.me/w700_r16x9/2024_10_15_594_50452304/a1e461f9c4b62de874a7.jpg.webp', 1, 0, '2024-10-07 10:59:53', '2024-10-15 11:20:36', 1, 3, 0), (125, '7 biệt thự trên khu đất \'vàng\' ở TP HCM bỏ hoang nhiều năm', '<p>Tính đến ngày 22/10, hơn 21 triệu người Mỹ đã bỏ phiếu sớm, trong đó lượng cử tri tham gia ở hai bang chiến trường Georgia, Bắc Carolina cao kỷ lục. Lượng cử tri đảng Cộng hòa tham gia bầu cử sớm năm nay tăng đáng kể, có thể là do lời kêu gọi từ ứng viên tổng thống Donald Trump.</p><p>\"Tôi cần các bạn đến hòm phiếu trước ngày bầu cử, vì họ sẽ tìm cách giữ chân các bạn ở nhà vào ngày đó\", ông Trump tuyên bố tại Bắc Carolina ngày 21/10, nhưng không đưa ra bằng chứng.</p><figure class=\"image\"><img style=\"aspect-ratio:300/300;\" src=\"http://localhost:3001/assets/images/1729734448595-300-2.jpg\" width=\"300\" height=\"300\"></figure>', 'Đảng Dân chủ mất dần lợi thế từ bỏ phiếu sớm', 'http://localhost:3001/assets/images/1729734453986-300-1.jpg', 0, 0, '2024-10-24 08:47:35', '2024-10-24 08:47:35', 6, 4, 0), (126, 'Hôm nay, loạt chính sách BHYT ảnh hưởng tới hàng triệu người được Quốc hội thảo luận', 'Theo chương trình của Kỳ họp thứ 8, Quốc hội khóa XV, trong phiên làm việc buổi sáng 31/10, Quốc hội sẽ nghe các Tờ trình và thẩm tra về dự thảo Nghị quyết tổ chức chính quyền đô thị tại TP Hải Phòng và Tờ trình về thành lập TP Huế trực thuộc Trung ương. Sau đó, Quốc hội sẽ tiến hành thảo luận ở Tổ về 2 nội dung trên.\r\n\r\nBuổi chiều, Quốc hội dành thời gian để thảo luận ở hội trường về dự án Luật sửa đổi, bổ sung một số điều của Luật BHYT. Cuối phiên thảo luận, chủ tọa sẽ mời Bộ trưởng Bộ Y tế Đào Hồng Lan giải trình, làm rõ một số ý kiến ĐBQH nêu. Phiên thảo luận sẽ được phát sóng trực tiếp trên truyền hình Quốc hội.', 'SKĐS - Chiều nay (31/10), Quốc hội thảo luận phiên toàn thể tại hội trường về dự án Luật sửa đổi, bổ sung một số điều của Luật BHYT. Cuối phiên thảo luận, Bộ trưởng Bộ Y tế sẽ giải trình, làm rõ các ý kiến ĐBQH nêu.i', 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/10/30/byt-17303303236521603490812.jpg', 1, 0, '2024-10-31 08:56:30', '2024-10-31 08:56:30', 6, 4, 0);
COMMIT;

-- ----------------------------
-- Table structure for news_categories
-- ----------------------------
DROP TABLE IF EXISTS `news_categories`;
CREATE TABLE `news_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of news_categories
-- ----------------------------
BEGIN;
INSERT INTO `news_categories` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES (3, 'Sự kiện', '23', '2024-10-03 09:59:03', '2024-10-31 00:31:02'), (4, 'Khuyến mãi', 'dsa', '2024-10-07 11:39:18', '2024-10-31 00:31:08');
COMMIT;

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `order_id` int NULL DEFAULT NULL,
  `price` decimal(15, 2) NOT NULL,
  `insurance_contract_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `insurance_contract_id`(`insurance_contract_id` ASC) USING BTREE,
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`insurance_contract_id`) REFERENCES `insurance_contracts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of order_details
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for order_payment_histories
-- ----------------------------
DROP TABLE IF EXISTS `order_payment_histories`;
CREATE TABLE `order_payment_histories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp,
  `payment_method` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status` enum('pending','completed','failed') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  CONSTRAINT `order_payment_histories_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of order_payment_histories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NULL DEFAULT NULL,
  `car_id` int NULL DEFAULT NULL,
  `payment_price` decimal(10, 2) NULL DEFAULT NULL,
  `total_price` decimal(15, 2) NOT NULL,
  `sales_staff_id` int NULL DEFAULT NULL,
  `technical_staff_id` int NULL DEFAULT NULL,
  `insurance_staff_id` int NULL DEFAULT NULL,
  `order_status` enum('pending','paying','completed','cancelled') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `showroom_id` int NULL DEFAULT NULL,
  `loan_id` int NULL DEFAULT NULL,
  `discount_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `sales_staff_id`(`sales_staff_id` ASC) USING BTREE,
  INDEX `technical_staff_id`(`technical_staff_id` ASC) USING BTREE,
  INDEX `insurance_staff_id`(`insurance_staff_id` ASC) USING BTREE,
  INDEX `showroom_id`(`showroom_id` ASC) USING BTREE,
  INDEX `loan_id`(`loan_id` ASC) USING BTREE,
  INDEX `discount_id`(`discount_id` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`sales_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`technical_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`insurance_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`discount_id`) REFERENCES `vouchers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 146 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO `orders` (`id`, `customer_id`, `car_id`, `payment_price`, `total_price`, `sales_staff_id`, `technical_staff_id`, `insurance_staff_id`, `order_status`, `created_at`, `updated_at`, `showroom_id`, `loan_id`, `discount_id`) VALUES (1, 3, 1, 1.00, 2.00, 6, 6, 6, 'pending', '2024-10-30 23:28:08', '2024-10-30 23:28:08', 1, NULL, NULL), (2, 12, 7, 1111.00, 1111.00, 8, 11, 10, 'paying', '2024-10-31 00:49:24', '2024-10-31 00:49:24', NULL, NULL, NULL), (89, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:39:58', '2024-11-04 16:39:58', NULL, NULL, NULL), (90, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:40:06', '2024-11-04 16:40:06', NULL, NULL, NULL), (91, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:47:37', '2024-11-04 16:47:37', NULL, NULL, NULL), (92, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:50:11', '2024-11-04 16:50:11', NULL, NULL, NULL), (93, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:52:58', '2024-11-04 16:52:58', NULL, NULL, NULL), (94, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 16:53:24', '2024-11-04 16:53:24', NULL, NULL, NULL), (95, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:01:42', '2024-11-04 17:01:42', NULL, NULL, NULL), (96, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:01:45', '2024-11-04 17:01:45', NULL, NULL, NULL), (97, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:01:50', '2024-11-04 17:01:50', NULL, NULL, NULL), (98, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:01:54', '2024-11-04 17:01:54', NULL, NULL, NULL), (99, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:21:25', '2024-11-04 17:21:25', NULL, NULL, NULL), (100, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:21:37', '2024-11-04 17:21:37', NULL, NULL, NULL), (101, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:23:33', '2024-11-04 17:23:33', NULL, NULL, NULL), (102, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:27:47', '2024-11-04 17:27:47', NULL, NULL, NULL), (103, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:28:43', '2024-11-04 17:28:43', NULL, NULL, NULL), (104, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 17:33:10', '2024-11-04 17:33:10', NULL, NULL, NULL), (105, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 20:51:18', '2024-11-04 20:51:18', NULL, NULL, NULL), (106, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 20:59:17', '2024-11-04 20:59:17', NULL, NULL, NULL), (107, 14, NULL, NULL, 500000000.00, NULL, NULL, NULL, 'pending', '2024-11-04 21:01:16', '2024-11-04 21:01:16', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `attribute` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `value` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `key`(`key` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of settings
-- ----------------------------
BEGIN;
INSERT INTO `settings` (`id`, `name`, `type`, `attribute`, `key`, `value`, `created_at`, `updated_at`) VALUES (1, 'Auth', 'text', NULL, 'auth', '1', '2024-09-19 08:57:15', '2024-10-03 10:13:02'), (2, 'Tiêu đề', 'text', NULL, 'title', '2', '2024-09-19 08:57:22', '2024-10-03 10:13:04'), (3, 'Địa chỉ', 'text', NULL, 'address', 'Đ. Lê Trọng Tấn, La Dương, Hà Đông, Hà Nội', '2024-09-19 09:24:02', '2024-10-31 07:49:54'), (4, 'Số điện Thoại', 'text', NULL, 'phone', '1900-1869', '2024-09-19 09:24:57', '2024-10-03 10:13:07'), (5, 'Option 1', 'options', 'vt 1|vt 2', 'option1', 'vt 1', '2024-10-03 10:31:23', '2024-10-03 10:47:30'), (6, 'Image test', 'image', NULL, 'upload_test', 'http://localhost:3001/assets/images/1730305876841-300-3.jpg', '2024-10-03 10:48:38', '2024-10-30 23:31:17'), (7, 'Image test', 'image', NULL, 'dsddd', '/assets/1727930185741-Screenshot-2024-10-03-104916.png', '2024-10-03 11:34:37', '2024-10-03 11:36:26'), (8, 'ck_editor', 'ckeditor', NULL, 'ddddsa', '<p>dsadsa</p>', '2024-10-03 13:17:05', '2024-10-03 14:22:30'), (9, 'Phí trước bạ', 'text', NULL, 'tax', '12', '2024-10-28 21:00:42', '2024-10-29 02:58:03'), (10, 'Phí kiểm định', 'text', NULL, 'inpection_fee', '230000', '2024-10-28 21:02:34', '2024-10-29 02:58:05'), (11, 'Phí đăng ký', 'text', NULL, 'registration_fee', '20000000', '2024-10-28 21:03:32', '2024-10-29 02:58:06'), (12, 'Phí sử dụng dường bộ', 'text', NULL, 'road_usage_fee', '1560000', '2024-10-28 21:04:09', '2024-10-29 02:58:08');
COMMIT;

-- ----------------------------
-- Table structure for showrooms
-- ----------------------------
DROP TABLE IF EXISTS `showrooms`;
CREATE TABLE `showrooms`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of showrooms
-- ----------------------------
BEGIN;
INSERT INTO `showrooms` (`id`, `name`, `address`, `phone_number`, `email`, `created_at`, `updated_at`) VALUES (1, 'Phạm Đình Hổ', '94-96 Phạm Đình Hổ, P2, Q6, HCM1', '0987654320', 'hyunda1i@gmail.com', '2024-09-13 18:34:18', '2024-10-22 10:48:09'), (4, 'Thành Công', 'Hà Nội', '0987627364', '3@l.com', '2024-10-17 08:47:01', '2024-10-22 10:48:40');
COMMIT;

-- ----------------------------
-- Table structure for staff_roles
-- ----------------------------
DROP TABLE IF EXISTS `staff_roles`;
CREATE TABLE `staff_roles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of staff_roles
-- ----------------------------
BEGIN;
INSERT INTO `staff_roles` (`id`, `name`) VALUES (1, 'Technical'), (2, 'Sale'), (3, 'Insurance'), (4, 'Director');
COMMIT;

-- ----------------------------
-- Table structure for staffs
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `showroom_id` int NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `insurance_provider_id` int NULL DEFAULT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `showroom_id`(`showroom_id` ASC) USING BTREE,
  INDEX `fk_insurance_provider`(`insurance_provider_id` ASC) USING BTREE,
  CONSTRAINT `fk_insurance_provider` FOREIGN KEY (`insurance_provider_id`) REFERENCES `insurance_providers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `staff_roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `staffs_ibfk_2` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of staffs
-- ----------------------------
BEGIN;
INSERT INTO `staffs` (`id`, `fullname`, `password`, `phone_number`, `email`, `role_id`, `created_at`, `updated_at`, `showroom_id`, `address`, `insurance_provider_id`, `avatar_url`) VALUES (1, 'Director TGB', '$2a$12$ZY31bETENlDNwqGmI88olOI1ZFE3DhMWN3pdTWe.YXYVi4ha1CwF2', '0972635782', 'staff1@gmail.com', 4, '2024-09-13 18:34:26', '2024-10-31 01:36:59', 1, 'HN', NULL, 'http://localhost:3001/assets/images/1728274072789-300-1.jpg'), (6, 'Director TTD', '$2b$10$SW72k2ZxcIyJq.g6JqxFAeYKUrGYsTFzbZJOLShqpefdS.cRE8xz2', '0762506738', 'vtd.junoo@gmail.com', 4, '2024-09-30 11:32:41', '2024-10-31 01:37:09', 1, 'dsadsa', NULL, 'http://localhost:3001/assets/images/1729133624952-300-2.jpg'), (8, 'Sale DucTT', '$2a$12$.yb1aDxi5QP/.a2esNs5WuH2sgRmPHaO/q1rZshPcJmewc5JRLjqm', '0762506738', 'duyvthe180740@fpt.edu.vn1', 2, '2024-10-17 00:54:42', '2024-10-31 01:37:29', 1, 'Ha Noi', NULL, 'http://localhost:3001/assets/images/1729734338340-300-2.jpg'), (10, 'Director DuyVT', '$2b$10$ZJDH5J.DXz5DuN2kAkdHPOHgYqvQ9YOJBucQXHigjIrhMjwSsSL3O', '0987654320', 'duyvthe180740@fpt.edu.vna', 4, '2024-10-24 00:18:48', '2024-10-31 01:40:06', 1, 'Ha Noi', NULL, 'http://localhost:3001/assets/images/1730313606189-300-8.jpg'), (11, 'Tech DuyVT', '$2a$12$RApOa4XzIbZ4ph7GYcWYieLFob4D2XzuGkydu4Q.ps.9tBMAWghSm', '0987654321', 'duyvthe180740@fpt.edu.vn', 1, '2024-10-24 08:42:52', '2024-10-31 01:37:55', 4, '94-96 Phạm Đình Hổ, P2, Q6, HCM1', NULL, NULL), (12, 'Director AnhNT', '$2b$2a$12$mfbF6KL2bOqcDLrI2ljwnOx2BdYQeDKUNJt6Rucvs2kld294IZL7y', '0987654322', 'anhnthe180055@fpt.edu.vn', 4, '2024-10-29 10:04:18', '2024-11-04 23:22:10', 1, 'sdadsa', NULL, NULL), (13, 'Sale DuyVT', '$2b$10$R4W.lVgu4q61E8VxYXQqKOgwx9rOe7ItdYmJrm.S67L2pd5VyIX0G', '0987654432', 'saleduyvt@gmail.com', 2, '2024-10-31 08:52:45', '2024-10-31 08:52:46', 1, 'Hà Nội', NULL, NULL), (14, 'Sale DucTT2', '$2b$10$wwj8GKxOFCY/YJNze6v3HewAyAel.dugQbHPSL.Ywy2On1tSB.F0K', '0987654432', 'tranduc2004nd01@gmail.com', 2, '2024-10-31 09:16:50', '2024-10-31 09:16:50', 1, 'Hà Nội', NULL, NULL), (15, 'Thục Anh', '$2b$2a$12$BXNHVzqY0PFpKa4IZdukfexzLGRyfFc/n4ySNxkofYZmgay9vyRdK', '03956425614', 'nguyenthucanh0004@gmail.com', 4, '2024-11-04 23:23:45', '2024-11-04 23:58:28', 1, 'hà nội', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for test_drive_requests
-- ----------------------------
DROP TABLE IF EXISTS `test_drive_requests`;
CREATE TABLE `test_drive_requests`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NULL DEFAULT NULL,
  `car_id` int NULL DEFAULT NULL,
  `test_drive_date` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `sales_staff_id` int NULL DEFAULT NULL,
  `status` enum('pending','approved','completed','cancelled') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `showroom_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `sales_staff_id`(`sales_staff_id` ASC) USING BTREE,
  INDEX `fk_showroom`(`showroom_id` ASC) USING BTREE,
  CONSTRAINT `fk_showroom` FOREIGN KEY (`showroom_id`) REFERENCES `showrooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `test_drive_requests_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `test_drive_requests_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `test_drive_requests_ibfk_3` FOREIGN KEY (`sales_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of test_drive_requests
-- ----------------------------
BEGIN;
INSERT INTO `test_drive_requests` (`id`, `customer_id`, `car_id`, `test_drive_date`, `sales_staff_id`, `status`, `created_at`, `updated_at`, `showroom_id`) VALUES (21, 11, 3, '2024-10-31 07:48:54', 8, 'completed', '2024-10-31 07:31:35', '2024-10-31 07:48:54', 1), (28, 11, 5, '2024-10-31 09:22:57', 14, 'approved', '2024-10-31 09:18:11', '2024-10-31 09:22:57', 1), (29, 11, 11, '2024-11-02 00:50:53', 14, 'completed', '2024-11-02 00:45:51', '2024-11-02 00:50:54', 1), (35, 16, 8, '2024-11-05 00:33:33', 8, 'approved', '2024-11-05 00:14:14', '2024-11-05 00:33:33', 1), (36, 20, 3, '2024-11-05 00:41:29', 13, 'cancelled', '2024-11-05 00:36:30', '2024-11-05 01:02:48', 1), (37, 20, 7, '2024-11-14 01:41:29', 8, 'cancelled', '2024-11-05 01:30:28', '2024-11-05 01:45:29', 1);
COMMIT;

-- ----------------------------
-- Table structure for vouchers
-- ----------------------------
DROP TABLE IF EXISTS `vouchers`;
CREATE TABLE `vouchers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `discount_type` enum('percentage','amount') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `discount_value` decimal(15, 2) NOT NULL,
  `type` enum('car','option') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of vouchers
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
