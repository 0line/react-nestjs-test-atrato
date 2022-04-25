-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: atrato
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `second_lastname` varchar(255) NOT NULL,
  `birthday` datetime NOT NULL,
  `status` enum('pendiente','en proceso','completado') NOT NULL,
  `analyst` varchar(255) NOT NULL,
  `ncard` int(11) NOT NULL,
  `provider_card` varchar(255) NOT NULL,
  `cvv` int(11) NOT NULL,
  `pin` int(11) NOT NULL,
  `expirationdate` datetime NOT NULL,
  `creationDate` datetime NOT NULL,
  `updatedOn` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'9862f16d-e6c9-4081-98cb-bc761aefc389','maisfsafsa@mail.com',1234567891,'jesus alberto','lozano','dev','1996-07-17 00:00:00','en proceso','ana karen',2147483647,'Visa',207,7956,'2025-02-22 01:27:14','2022-04-22 01:27:13','2022-04-25 12:11:23'),(2,'49254373-ad60-45bf-a07a-0a7475d8b4b1','jesus2@mail.com',1234567890,'jesus','lozano','dev','1996-07-17 00:00:00','pendiente','ana karen',2147483647,'Discovery',142,9255,'2026-08-22 01:29:22','2022-04-22 01:29:21','2022-04-24 14:49:54'),(4,'59456ed8-c9c2-4a36-b999-c9cafdca1bec','jesus4@mail.com',1234567890,'jesus','lozano','dev','1996-07-17 00:00:00','completado','ana karen',2147483647,'AmericanExpress',783,6022,'2023-10-24 14:20:31','2022-04-24 14:20:31','2022-04-24 14:52:12'),(5,'2982cce9-e965-418c-816b-14d10f197616','joel@mail.com',1234567890,'joel','marquez ','cabrera','2018-04-25 00:00:00','en proceso','enrique quintero',2147483647,'AmericanExpress',289,2419,'2026-01-25 12:19:32','2022-04-25 12:19:33','2022-04-25 12:19:33'),(6,'029a67ee-b2dc-4a13-ae8d-01a2f3c7a13e','martin@mail.com',1234567890,'martin','martinez','garcía','2022-04-05 00:00:00','completado','jilberto gonzalez',2147483647,'Discover',337,5177,'2024-09-25 12:46:46','2022-04-25 12:46:47','2022-04-25 12:46:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'atrato'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-25 12:04:15
