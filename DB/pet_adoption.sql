-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2024 at 01:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pet_adoption`
--

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `pet_id` int(11) NOT NULL,
  `pet_name` varchar(30) NOT NULL,
  `pet_breed` varchar(30) NOT NULL,
  `pet_species` varchar(30) NOT NULL,
  `pet_age` varchar(30) NOT NULL,
  `pet_gender` varchar(30) NOT NULL,
  `pet_adoption_status` varchar(30) NOT NULL,
  `pet_image` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`pet_id`, `pet_name`, `pet_breed`, `pet_species`, `pet_age`, `pet_gender`, `pet_adoption_status`, `pet_image`) VALUES
(7, 'catty', 'cat breed', 'cat species', '12', 'female', 'ADOPTED', 'cat.jpg'),
(8, 'doggy', 'doggy breed', 'doggy species', '13', 'male', 'ADOPTED', 'dog.jpg'),
(10, 'dogx', 'dogx', 'dogx', '15', 'female', 'NOT ADOPTED YET', 'dog2.jpeg'),
(12, 'penguinx', 'penguinx', 'penguinx', '15', 'female', 'NOT ADOPTED YET', 'penguin.jpg'),
(13, 'catty', 'cat', 'cat', '12', 'male', 'ADOPTED', 'catimg5.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `staff_name` varchar(30) NOT NULL,
  `staff_email` varchar(30) NOT NULL,
  `staff_password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `staff_name`, `staff_email`, `staff_password`) VALUES
(1, 'ahmed', 'ahmed123@gmail.com', 'ahmed123'),
(2, 'aasim', 'aasim123@gmail.com', 'aasim123'),
(3, 'jasmine', 'jasmine123@gmail.com', 'jasmine123');

-- --------------------------------------------------------

--
-- Table structure for table `visiter`
--

CREATE TABLE `visiter` (
  `visiter_id` int(11) NOT NULL,
  `visiter_name` varchar(30) NOT NULL,
  `visiter_email` varchar(30) NOT NULL,
  `visiter_password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visiter`
--

INSERT INTO `visiter` (`visiter_id`, `visiter_name`, `visiter_email`, `visiter_password`) VALUES
(1, 'sumanth', 'sumanth123@gmail.com', 'sumanth123'),
(6, 'suhas', 'suhas123@gmail.com', 'suhas123'),
(7, 'veja', 'veja123@gmail.com', 'veja123');

-- --------------------------------------------------------

--
-- Table structure for table `visiter_request_pet_adoption`
--

CREATE TABLE `visiter_request_pet_adoption` (
  `visiter_id` int(11) NOT NULL,
  `pet_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visiter_request_pet_adoption`
--

INSERT INTO `visiter_request_pet_adoption` (`visiter_id`, `pet_id`) VALUES
(1, 7),
(6, 10),
(7, 13);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`pet_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `visiter`
--
ALTER TABLE `visiter`
  ADD PRIMARY KEY (`visiter_id`);

--
-- Indexes for table `visiter_request_pet_adoption`
--
ALTER TABLE `visiter_request_pet_adoption`
  ADD PRIMARY KEY (`visiter_id`,`pet_id`),
  ADD KEY `pet_id` (`pet_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `pet_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `visiter`
--
ALTER TABLE `visiter`
  MODIFY `visiter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `visiter_request_pet_adoption`
--
ALTER TABLE `visiter_request_pet_adoption`
  ADD CONSTRAINT `visiter_request_pet_adoption_ibfk_1` FOREIGN KEY (`visiter_id`) REFERENCES `visiter` (`visiter_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visiter_request_pet_adoption_ibfk_2` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
