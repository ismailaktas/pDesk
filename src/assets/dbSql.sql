CREATE DATABASE  IF NOT EXISTS `ismail` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ismail`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: ismail
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `pDesk_organization`
--

DROP TABLE IF EXISTS `pDesk_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pDesk_organization` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pDesk_organization`
--

LOCK TABLES `pDesk_organization` WRITE;
/*!40000 ALTER TABLE `pDesk_organization` DISABLE KEYS */;
INSERT INTO `pDesk_organization` VALUES (1,'Dek'),(2,'Tevitol'),(3,'Mod');
/*!40000 ALTER TABLE `pDesk_organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pDesk_tickets`
--

DROP TABLE IF EXISTS `pDesk_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pDesk_tickets` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) NOT NULL,
  `subject` varchar(300) DEFAULT NULL,
  `description` text,
  `filePath` varchar(200) DEFAULT NULL,
  `organizationID` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `assignUserID` int(11) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int(11) NOT NULL,
  `isDeleted` int(11) NOT NULL DEFAULT '0',
  `deletedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pDesk_tickets`
--

LOCK TABLES `pDesk_tickets` WRITE;
/*!40000 ALTER TABLE `pDesk_tickets` DISABLE KEYS */;
INSERT INTO `pDesk_tickets` VALUES (1,0,'Ders Sayfası hakkında','sdfdf rwe wer wer werwer 42 234234234','ss.jpg',1,3,2,'2019-03-13 00:00:00',1,0,NULL),(29,1,'','fghfg hfgh',NULL,1,3,1,'2019-03-15 16:54:54',1,0,NULL),(30,1,'','&nbsp;tyut uty utyu tyu tutyu','qwe.jpg',1,2,3,'2019-03-15 16:54:37',1,0,NULL),(31,1,'','&nbsp;ghj fghjfghjfghghjghj 567567567',NULL,1,3,3,'2019-03-15 08:39:22',1,0,NULL),(32,1,'','yenice vapp asidasliqwpe qweip',NULL,1,3,2,'2019-03-15 11:13:38',1,1,'2019-03-18 12:17:20'),(33,1,'','er ter tert',NULL,1,3,1,'2019-03-15 11:13:56',1,0,NULL),(34,1,'','&nbsp;we ewrw erewr',NULL,1,2,2,'2019-03-15 11:14:57',1,1,'2019-03-15 17:05:10'),(35,1,'','undefined',NULL,1,2,1,'2019-03-15 17:03:38',1,1,'2019-03-15 17:05:03'),(36,1,'','\'+5%+&amp;%&amp;/(///wa wewq wqe ---q weqw ewqe?dsfdsfsd=werewr werjweejrwljrl<div>sdf sdfsdf</div><div><br></div><div>&nbsp;wer werwerwrwrew .</div><div><br></div><div>İĞ&amp;/(&amp;/(()()===--++**///+^+^+!!!&gt;sdfsdfsd&lt;dsfsdf&gt;zZZZX</div>',NULL,1,2,2,'2019-03-15 15:38:19',1,0,NULL),(37,1,'','rty',NULL,1,2,1,'2019-03-18 11:48:47',1,0,NULL),(40,1,'','ytutu',NULL,1,2,4,'2019-03-18 12:20:15',1,0,NULL),(41,1,'','undefined',NULL,1,3,4,'2019-03-22 11:12:49',1,0,NULL),(42,42,'','ertert!\'^!\'WEDFSDF DF DF SDFSDFSDFSDFxVCCC<div><br></div><div><br></div><div>qweqw eqw5+^+%&amp;&amp;%/%&amp;%&amp;(//**rty* rty r*ty---- rtyty rtyrty</div><div><br></div><div><br></div><div>23 234 234 32434</div>',NULL,1,5,1,'2019-03-26 14:45:38',1,0,NULL),(43,42,'','345 5345 435',NULL,1,1,2,'2019-03-26 11:31:15',1,1,'2019-03-26 11:31:22'),(44,0,'yeni subject denemee33','12 312 312',NULL,1,1,2,'2019-03-26 15:33:43',1,0,'2019-03-26 12:17:03');
/*!40000 ALTER TABLE `pDesk_tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pDesk_ticketStatus`
--

DROP TABLE IF EXISTS `pDesk_ticketStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pDesk_ticketStatus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pDesk_ticketStatus`
--

LOCK TABLES `pDesk_ticketStatus` WRITE;
/*!40000 ALTER TABLE `pDesk_ticketStatus` DISABLE KEYS */;
INSERT INTO `pDesk_ticketStatus` VALUES (1,'Yeni'),(2,'Devam Ediyor'),(3,'Tamamlandı'),(4,'Kapandı'),(5,'Beklemede');
/*!40000 ALTER TABLE `pDesk_ticketStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pDesk_users`
--

DROP TABLE IF EXISTS `pDesk_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pDesk_users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `organizationID` int(11) NOT NULL,
  `userType` tinyint(4) NOT NULL,
  `createdDate` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pDesk_users`
--

LOCK TABLES `pDesk_users` WRITE;
/*!40000 ALTER TABLE `pDesk_users` DISABLE KEYS */;
INSERT INTO `pDesk_users` VALUES (1,'İsmail AKTAŞ','ismail','1',1,1,'2019-03-13 00:00:00',1),(2,'Ayşegül Dilaver','aysegul','1',1,1,'2019-03-13 00:00:00',1),(3,'Eyüp Ensari Turan','eyup','1',1,1,'2019-03-13 00:00:00',1),(4,'Cem Çavuş','cem','1',1,1,'2019-03-13 00:00:00',1);
/*!40000 ALTER TABLE `pDesk_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pDesk_userType`
--

DROP TABLE IF EXISTS `pDesk_userType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pDesk_userType` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pDesk_userType`
--

LOCK TABLES `pDesk_userType` WRITE;
/*!40000 ALTER TABLE `pDesk_userType` DISABLE KEYS */;
INSERT INTO `pDesk_userType` VALUES (1,'Admin'),(2,'Yönetici'),(3,'Kullanıcı');
/*!40000 ALTER TABLE `pDesk_userType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ismail'
--

--
-- Dumping routines for database 'ismail'
--
/*!50003 DROP PROCEDURE IF EXISTS `prcGetTicketById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetTicketById`(prmTicketID int)
BEGIN
	SELECT 
		pDesk_tickets.ID,
		pDesk_tickets.parentId,
		pDesk_tickets.subject,
		pDesk_tickets.description,
		pDesk_tickets.filePath,
		pDesk_tickets.organizationID,
		pDesk_organization.name as organizationName,
		pDesk_tickets.status,
		pDesk_ticketStatus.name as statusName,
		date_format(pDesk_tickets.createdDate, '%d.%m.%Y %H:%i') as ticketDate,
		pDesk_users.ID as userID,
		pDesk_users.fullname,
        pDesk_tickets.isDeleted,
        pDesk_tickets.assignUserID as assignUserID,
        assigned.fullname as assignedFullName,
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
	where
		(pDesk_tickets.ID = prmTicketID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `prcGetTicketDetail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetTicketDetail`(prmTicketID int)
BEGIN
	SELECT 
		pDesk_tickets.ID,
		pDesk_tickets.parentId,
		pDesk_tickets.subject,
		pDesk_tickets.description,
		pDesk_tickets.filePath,
		pDesk_tickets.organizationID,
		pDesk_organization.name as organizationName,
		pDesk_tickets.status,
		pDesk_ticketStatus.name as statusName,
		date_format(pDesk_tickets.createdDate, '%d.%m.%Y %H:%i') as ticketDate,
		pDesk_users.ID as userID,
		pDesk_users.fullname,
        pDesk_tickets.isDeleted,
        pDesk_tickets.assignUserID as assignUserID,
        assigned.fullname as assignedFullName,
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
	where
		(pDesk_tickets.ID = prmTicketID or pDesk_tickets.parentId = prmTicketID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `prcGetTickets` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetTickets`(prmOrganizationID int, prmUserID int)
BEGIN
	SELECT 
		pDesk_tickets.ID,
		pDesk_tickets.parentId,
		pDesk_tickets.subject,
		pDesk_tickets.description,
		pDesk_tickets.filePath,
		pDesk_tickets.organizationID,
		pDesk_organization.name as organizationName,
		pDesk_tickets.status,
		pDesk_ticketStatus.name as statusName,
		date_format(pDesk_tickets.createdDate, '%d.%m.%Y %H:%i') as ticketDate,
		pDesk_users.ID as userID,
		pDesk_users.fullname,
        pDesk_tickets.isDeleted,
        pDesk_tickets.assignUserID as assignUserID,
        assigned.fullname as assignedFullName,
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
	where
		pDesk_tickets.parentId = 0
        and  ifnull(pDesk_tickets.isDeleted, 0) = 0
		and (prmOrganizationID = 0 or pDesk_tickets.organizationID = prmOrganizationID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-26 15:35:42
