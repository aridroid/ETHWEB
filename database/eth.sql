-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2020 at 12:34 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eth`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_table`
--

CREATE TABLE `login_table` (
  `id` int(10) NOT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `address` varchar(1000) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `user_id` varchar(200) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`id`, `company_name`, `address`, `email`, `user_id`, `password`) VALUES
(27, 'Inceptory', 'Inceptory', 'samiran@inceptorytech.com', 'ETH0000000027', '824445'),
(28, 'samiran2', 'samiran2', 'samiranpersonal@gmail.com', 'ETH0000000028', '435077'),
(38, 'Samiran', '4/1 Rishi Aurobindo Road Dum Dum Cantt, Kolkata - 700065', 'samiranpersonal2@gmail.com', 'ETH0000000038', '131358');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(10) NOT NULL,
  `full_name` varchar(200) DEFAULT NULL,
  `driving_license` varchar(200) DEFAULT NULL,
  `car_no` varchar(200) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `id_proof` varchar(200) DEFAULT NULL,
  `company_id` varchar(200) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `full_name`, `driving_license`, `car_no`, `start_date`, `end_date`, `id_proof`, `company_id`, `company_name`, `status`) VALUES
(8, 'Samiran', 'Samiran2', 'Samiran3', '2020-10-05', '2020-10-07', 'uploaded-files/1601913559.jpg', 'ETH0000000027', 'Inceptory', 'active'),
(9, 'Arka', 'Arka2', 'Arka3', '2020-10-05', '2020-10-10', 'uploaded-files/1601914162.jpg', 'ETH0000000027', 'Inceptory', 'inactive'),
(10, 'Kahan', 'Kahan2', 'Kahan3', '2020-10-05', '2020-10-07', 'uploaded-files/1601914327.jpg', 'ETH0000000027', 'Inceptory', 'active'),
(11, 'Kaustav', 'Kaustav2', 'Kaustav3', '2020-10-05', '2020-10-11', 'uploaded-files/1601914436.jpg', 'ETH0000000027', 'Inceptory', 'active'),
(12, 'Sibasis', 'Sibasis2', 'Sibasis3', '2020-10-09', '2020-10-24', 'uploaded-files/1601918175.jpg', 'ETH0000000027', 'Inceptory', 'inactive'),
(13, 'Arnab Hazra', 'Arnab Hazra2', 'Arnab Hazra3', '2020-10-05', '2020-10-07', 'uploaded-files/1601918410.jpg', 'ETH0000000027', 'Inceptory', 'inactive');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_table`
--
ALTER TABLE `login_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
