-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2024 at 01:53 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `phone_no`, `email`, `address`, `user_name`, `password`, `token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Customer', '1', '11123456789', 'email@mail.com', 'Jaffan', 'customer1', '123456', NULL, '2024-09-01 10:29:21', '2024-09-01 10:29:21', NULL),
(2, 'Customer', '2', '0123456789', 'email@mail.com', 'Jaf', 'customer2', '123456', NULL, '2024-09-01 10:32:21', '2024-09-01 10:32:21', NULL),
(3, 'Customer', '3', '012345678954', 'email@mail.com', 'Jaf', 'customer3', '1234567', NULL, '2024-09-01 10:35:27', '2024-09-01 10:35:27', NULL),
(4, 'cus', '4', '789458796', 'email@mail.com', 'JAF', 'cus4', '123456789', NULL, '2024-09-01 10:39:25', '2024-09-04 06:06:56', NULL),
(5, 'Customer', '5', '789457815', 'customer5@mail.com', 'Jaffna', 'customer5', 'customer5', NULL, '2024-09-01 10:41:06', '2024-09-01 10:41:06', NULL),
(6, 'Customer', '6', '776655444', 'email@mail.com', 'asdf', 'customer6', '123456', NULL, '2024-09-01 11:48:49', '2024-09-01 11:48:49', NULL),
(7, 'Customer', '7', '0112233445', 'cus7@mail.com', 'qwerty', 'customer7', 'customer7', NULL, '2024-09-04 06:08:07', '2024-09-04 06:08:07', NULL),
(8, 'raja', 'a', '0769405186', 'rajarathinam15@gmail.com', 'jaffna', 'raja', 'raja', NULL, '2024-09-08 08:34:56', '2024-09-08 08:34:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_date` date NOT NULL,
  `order_ref_id` varchar(255) NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `order_type` int(11) DEFAULT NULL,
  `payment_status` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `net_total` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `additional_charges` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `order_ref_id`, `customer_id`, `order_type`, `payment_status`, `status`, `net_total`, `discount`, `additional_charges`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2024-09-05', '1', 1, 0, 0, 0, 1500, 0, 0, '2024-09-05 08:39:46', '2024-09-05 08:39:46', NULL),
(2, '2024-09-05', '2', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 08:52:25', '2024-09-05 08:52:25', NULL),
(3, '2024-09-05', '3', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 08:55:53', '2024-09-05 08:55:53', NULL),
(4, '2024-09-05', '4', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 09:53:11', '2024-09-05 09:53:11', NULL),
(5, '2024-09-05', '5', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 09:55:35', '2024-09-05 09:55:35', NULL),
(6, '2024-09-05', '6', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 09:55:55', '2024-09-05 09:55:55', NULL),
(7, '2024-09-05', '7', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 10:36:21', '2024-09-05 10:36:21', NULL),
(8, '2024-09-05', '8', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 10:49:47', '2024-09-05 10:49:47', NULL),
(9, '2024-09-05', '9', 1, 0, 1, 0, 1500, 0, 0, '2024-09-05 11:25:03', '2024-09-05 11:25:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `cost_price` float DEFAULT NULL,
  `sale_price` float DEFAULT NULL,
  `qty` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `cost_price`, `sale_price`, `qty`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 8, 1, 450, 500, 1, '2024-09-05 10:49:47', '2024-09-05 10:49:47', NULL),
(2, 8, 4, 250, 350, 1, '2024-09-05 10:49:47', '2024-09-05 10:49:47', NULL),
(3, 8, 9, 300, 450, 1, '2024-09-05 10:49:47', '2024-09-05 10:49:47', NULL),
(4, 8, 7, 150, 200, 1, '2024-09-05 10:49:47', '2024-09-05 10:49:47', NULL),
(5, 9, 1, 450, 500, 1, '2024-09-05 11:25:03', '2024-09-05 11:25:03', NULL),
(6, 9, 4, 250, 350, 1, '2024-09-05 11:25:03', '2024-09-05 11:25:03', NULL),
(7, 9, 9, 300, 450, 1, '2024-09-05 11:25:03', '2024-09-05 11:25:03', NULL),
(8, 9, 7, 150, 200, 1, '2024-09-05 11:25:03', '2024-09-05 11:25:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `cost_price` float DEFAULT NULL,
  `sale_price` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `product_name`, `cost_price`, `sale_price`, `created_at`, `updated_at`, `deleted_at`, `img_path`) VALUES
(1, 1, 'Delicious Burger', 450, 500, '2024-09-04 07:00:04', '2024-09-04 07:47:50', NULL, 'images/f2.png'),
(2, 1, 'Tasty Burger', 300, 350, '2024-09-04 07:38:51', '2024-09-04 07:48:13', NULL, 'images/f7.png'),
(3, 1, 'Tasty Burger', 200, 250, '2024-09-04 07:39:07', '2024-09-04 07:48:38', NULL, 'images/f8.png'),
(4, 2, 'Delicious Pizza', 250, 350, '2024-09-04 07:39:53', '2024-09-04 07:49:00', NULL, 'images/f1.png'),
(5, 2, 'Delicious Pizza Hot', 350, 450, '2024-09-04 07:40:39', '2024-09-04 07:49:15', NULL, 'images/f3.png'),
(6, 2, 'Delicious Pizza Large', 500, 650, '2024-09-04 07:41:14', '2024-09-04 07:49:30', NULL, 'images/f6.png'),
(7, 3, 'Delicious Pasta', 150, 200, '2024-09-04 07:42:22', '2024-09-04 07:50:25', NULL, 'images/f4.png'),
(8, 3, 'Delicious Pasta With Chicken', 400, 550, '2024-09-04 07:43:08', '2024-09-04 07:50:36', NULL, 'images/f9.png'),
(9, 4, 'French Fries', 300, 450, '2024-09-04 07:43:34', '2024-09-04 07:50:53', NULL, 'images/f5.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id`, `category_name`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Burger', 'Category Description 1 Edit', '2024-09-04 05:26:06', '2024-09-04 05:27:44', NULL),
(2, 'Pizza', 'Pizza', '2024-09-04 07:30:15', '2024-09-04 07:30:15', NULL),
(3, 'Pasta', 'Pasta', '2024-09-04 07:30:33', '2024-09-04 07:30:33', NULL),
(4, 'Fries', 'Fries', '2024-09-04 07:30:50', '2024-09-04 07:30:50', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_img`
--

CREATE TABLE `product_img` (
  `id` int(11) NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `img_name` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `stars` float NOT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `reviews` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` int(10) UNSIGNED NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `user_role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone_no`, `email`, `address`, `user_name`, `password`, `user_role`, `token`, `created_at`, `updated_at`, `deleted_at`, `permission`, `role_name`, `user_role_id`) VALUES
(1, 'admin', '1', '0751234567', 'admin@mail.com', 'Jaffna', 'admin', '123456', 1, NULL, '2024-08-31 11:12:41', '2024-09-03 09:04:34', NULL, NULL, NULL, NULL),
(2, 'user', '2', '0798545631', 'user2@gmail.com', 'Jaffna, LK', 'user2', 'user2', 2, NULL, '2024-09-03 09:18:23', '2024-09-03 09:18:23', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `permission` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role_name`, `permission`) VALUES
(1, 'admin', ''),
(2, 'Staff', ''),
(3, 'Chef', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_customer_id` (`customer_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `k_ordproducts_order_id` (`order_id`),
  ADD KEY `fk_ordproducts_product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category_id` (`category_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_img`
--
ALTER TABLE `product_img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_img_product_id` (`product_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_previews_cusId` (`customer_id`),
  ADD KEY `fk_previews_productId` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKblvmyr4rgpt5rvfms3obvsus7` (`user_role_id`),
  ADD KEY `fk_users_user_role_id` (`user_role`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product_img`
--
ALTER TABLE `product_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `fk_ordproducts_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `k_ordproducts_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_category_id` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_img`
--
ALTER TABLE `product_img`
  ADD CONSTRAINT `fk_product_img_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `fk_previews_cusId` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_previews_productId` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_user_role_id` FOREIGN KEY (`user_role`) REFERENCES `user_role` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
