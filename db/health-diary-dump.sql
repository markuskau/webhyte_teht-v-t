/*M!999999\- enable the sandbox mode */
-- MariaDB dump 10.19-11.5.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: HealthDiary
-- ------------------------------------------------------
-- Server version	11.5.2-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;

/*!40103 SET TIME_ZONE='+00:00' */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `diaryentries`
--
DROP TABLE IF EXISTS `diaryentries`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `diaryentries` (
    `entry_id` int (11) NOT NULL AUTO_INCREMENT,
    `user_id` int (11) NOT NULL,
    `entry_date` date NOT NULL,
    `mood` varchar(50) DEFAULT NULL,
    `weight` decimal(5, 2) DEFAULT NULL,
    `sleep_hours` int (11) DEFAULT NULL,
    `notes` text DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`entry_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `diaryentries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diaryentries`
--
LOCK TABLES `diaryentries` WRITE;

/*!40000 ALTER TABLE `diaryentries` DISABLE KEYS */;

INSERT INTO
  `diaryentries`
VALUES
  (
    1,
    1,
    '2024-01-10',
    'Happy',
    70.50,
    8,
    'Had a great workout session',
    '2024-01-10 20:00:00'
  ),
  (
    2,
    2,
    '2024-01-11',
    'Satisfied',
    65.00,
    7,
    'Met with friends, had a good time',
    '2024-01-11 21:00:00'
  ),
  (
    3,
    3,
    '2024-01-12',
    'Tired',
    68.00,
    6,
    'Work was demanding',
    '2024-01-12 22:00:00'
  ),
  (
    4,
    4,
    '2024-01-13',
    'Energetic',
    55.00,
    9,
    'Went for a morning run',
    '2024-01-13 18:00:00'
  ),
  (
    5,
    4,
    '2024-01-14',
    'Relaxed',
    75.00,
    8,
    'Spent the day reading',
    '2024-01-14 19:00:00'
  );

/*!40000 ALTER TABLE `diaryentries` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `exercises`
--
DROP TABLE IF EXISTS `exercises`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `exercises` (
    `exercise_id` int (11) NOT NULL AUTO_INCREMENT,
    `user_id` int (11) NOT NULL,
    `type` varchar(100) NOT NULL,
    `duration` int (11) NOT NULL,
    `intensity` varchar(50) DEFAULT NULL,
    `date` date DEFAULT NULL,
    PRIMARY KEY (`exercise_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--
LOCK TABLES `exercises` WRITE;

/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;

INSERT INTO
  `exercises`
VALUES
  (1, 1, 'Running', 30, 'High', '2024-01-10'),
  (2, 3, 'Cycling', 45, 'Medium', '2024-01-11'),
  (3, 2, 'Swimming', 55, 'Low', '2024-01-12'),
  (4, 1, 'Swimming', 30, 'Medium', '2024-01-16'),
  (5, 3, 'Swimming', 60, 'Low', '2024-01-18'),
  (6, 3, 'Yoga', 50, 'Low', '2024-01-18'),
  (7, 1, 'Weight Training', 40, 'High', '2024-01-19');

/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `medications`
--
DROP TABLE IF EXISTS `medications`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `medications` (
    `medication_id` int (11) NOT NULL AUTO_INCREMENT,
    `user_id` int (11) NOT NULL,
    `name` varchar(100) NOT NULL,
    `dosage` varchar(50) DEFAULT NULL,
    `frequency` varchar(50) DEFAULT NULL,
    `start_date` date DEFAULT NULL,
    `end_date` date DEFAULT NULL,
    PRIMARY KEY (`medication_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `medications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medications`
--
LOCK TABLES `medications` WRITE;

/*!40000 ALTER TABLE `medications` DISABLE KEYS */;

INSERT INTO
  `medications`
VALUES
  (
    1,
    1,
    'Vitamin D',
    '1000 IU',
    'Daily',
    '2024-01-01',
    '2024-06-01'
  ),
  (
    2,
    2,
    'Ibuprofen',
    '200 mg',
    'As needed',
    '2024-01-05',
    '2024-01-20'
  ),
  (
    3,
    2,
    'Amoxicillin',
    '500 mg',
    'Every 8 hours',
    '2024-01-10',
    '2024-01-20'
  ),
  (
    4,
    4,
    'Metformin',
    '500 mg',
    'Twice a day',
    '2024-01-15',
    '2024-07-15'
  ),
  (
    5,
    2,
    'Lisinopril',
    '10 mg',
    'Daily',
    '2024-01-20',
    '2024-07-20'
  );

/*!40000 ALTER TABLE `medications` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `sleeplogs`
--
DROP TABLE IF EXISTS `sleeplogs`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `sleeplogs` (
    `sleep_id` int (11) NOT NULL AUTO_INCREMENT,
    `user_id` int (11) NOT NULL,
    `sleep_date` date NOT NULL,
    `hours_slept` decimal(4, 2) NOT NULL,
    `sleep_quality` varchar(50) DEFAULT NULL,
    `notes` text DEFAULT NULL,
    PRIMARY KEY (`sleep_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `sleeplogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sleeplogs`
--
LOCK TABLES `sleeplogs` WRITE;

/*!40000 ALTER TABLE `sleeplogs` DISABLE KEYS */;

INSERT INTO
  `sleeplogs`
VALUES
  (
    1,
    1,
    '2024-01-10',
    7.50,
    'Good',
    'Slept well after exercise'
  ),
  (
    2,
    2,
    '2024-01-11',
    6.00,
    'Fair',
    'Woke up during the night'
  ),
  (3, 3, '2024-01-12', 5.50, 'Poor', 'Stressful day'),
  (
    4,
    4,
    '2024-01-13',
    8.50,
    'Excellent',
    'Very restful sleep'
  ),
  (5, 1, '2024-01-14', 7.00, 'Good', 'Normal sleep');

/*!40000 ALTER TABLE `sleeplogs` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!40101 SET character_set_client = utf8 */;

CREATE TABLE
  `users` (
    `user_id` int (11) NOT NULL AUTO_INCREMENT,
    `username` varchar(50) NOT NULL,
    `password` varchar(255) NOT NULL,
    `email` varchar(100) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT current_timestamp(),
    `user_level` varchar(10) DEFAULT 'regular',
    PRIMARY KEY (`user_id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1 COLLATE = latin1_swedish_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO
  `users`
VALUES
  (
    1,
    'johndoe',
    'hashed_password',
    'johndoe@example.com',
    '2024-01-01 09:00:00',
    'regular'
  ),
  (
    2,
    'janedoe',
    'hashed_password',
    'janedoe@example.com',
    '2024-01-02 10:00:00',
    'admin'
  ),
  (
    3,
    'alice_jones',
    'hashed_password',
    'alice@example.com',
    '2024-01-04 08:30:00',
    'regular'
  ),
  (
    4,
    'bob_brown',
    'hashed_password',
    'bob@example.com',
    '2024-01-05 07:45:00',
    'regular'
  );

/*!40000 ALTER TABLE `users` ENABLE KEYS */;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-01-29 10:20:55