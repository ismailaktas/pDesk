-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for ismail
DROP DATABASE IF EXISTS `ismail`;
CREATE DATABASE IF NOT EXISTS `ismail` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ismail`;

-- Dumping structure for table ismail.pdesk_organization
DROP TABLE IF EXISTS `pdesk_organization`;
CREATE TABLE IF NOT EXISTS `pdesk_organization` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_organization: ~3 rows (approximately)
DELETE FROM `pdesk_organization`;
/*!40000 ALTER TABLE `pdesk_organization` DISABLE KEYS */;
INSERT INTO `pdesk_organization` (`ID`, `name`) VALUES
	(1, 'Dek'),
	(2, 'Tevitol'),
	(3, 'Mod');
/*!40000 ALTER TABLE `pdesk_organization` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_ticketmodules
DROP TABLE IF EXISTS `pdesk_ticketmodules`;
CREATE TABLE IF NOT EXISTS `pdesk_ticketmodules` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `organizationID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_ticketmodules: 7 rows
DELETE FROM `pdesk_ticketmodules`;
/*!40000 ALTER TABLE `pdesk_ticketmodules` DISABLE KEYS */;
INSERT INTO `pdesk_ticketmodules` (`ID`, `name`, `organizationID`) VALUES
	(1, 'Revir', 1),
	(2, 'Rehberlik1', 1),
	(3, 'Çalışma Planı', 1),
	(4, 'Kurul Komisyon', 1),
	(5, 'Projeler', 1),
	(8, 'Yoklama', 3),
	(7, 'Duyurular', 1);
/*!40000 ALTER TABLE `pdesk_ticketmodules` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_tickets
DROP TABLE IF EXISTS `pdesk_tickets`;
CREATE TABLE IF NOT EXISTS `pdesk_tickets` (
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
  `ticketType` int(11) NOT NULL DEFAULT '0',
  `ticketModule` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_tickets: ~4 rows (approximately)
DELETE FROM `pdesk_tickets`;
/*!40000 ALTER TABLE `pdesk_tickets` DISABLE KEYS */;
INSERT INTO `pdesk_tickets` (`ID`, `parentId`, `subject`, `description`, `filePath`, `organizationID`, `status`, `assignUserID`, `createdDate`, `createdBy`, `isDeleted`, `deletedDate`, `ticketType`, `ticketModule`) VALUES
	(50, 0, 'wer', 'wr', '50.jpg', 1, 3, 17, '2019-03-31 09:43:58', 19, 0, NULL, 2, 7),
	(51, 50, 'undefined', 'ewrwe', NULL, 0, 2, 19, '2019-03-31 09:55:10', 17, 0, NULL, 1, 1),
	(52, 50, 'undefined', 'sdf we rwerwe', NULL, 0, 5, 19, '2019-03-31 09:58:19', 0, 1, '2019-03-31 10:37:23', 0, 0),
	(53, 50, 'undefined', 'düzelmiş', NULL, 1, 3, 19, '2019-03-31 10:06:10', 19, 0, NULL, 0, 0);
/*!40000 ALTER TABLE `pdesk_tickets` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_ticketstatus
DROP TABLE IF EXISTS `pdesk_ticketstatus`;
CREATE TABLE IF NOT EXISTS `pdesk_ticketstatus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_ticketstatus: ~5 rows (approximately)
DELETE FROM `pdesk_ticketstatus`;
/*!40000 ALTER TABLE `pdesk_ticketstatus` DISABLE KEYS */;
INSERT INTO `pdesk_ticketstatus` (`ID`, `name`) VALUES
	(1, 'Yeni'),
	(2, 'Devam Ediyor'),
	(3, 'Tamamlandı'),
	(4, 'Kapandı'),
	(5, 'Beklemede');
/*!40000 ALTER TABLE `pdesk_ticketstatus` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_tickettypes
DROP TABLE IF EXISTS `pdesk_tickettypes`;
CREATE TABLE IF NOT EXISTS `pdesk_tickettypes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_tickettypes: ~4 rows (approximately)
DELETE FROM `pdesk_tickettypes`;
/*!40000 ALTER TABLE `pdesk_tickettypes` DISABLE KEYS */;
INSERT INTO `pdesk_tickettypes` (`ID`, `name`) VALUES
	(1, 'Diğer'),
	(2, 'Ek Geliştirme'),
	(3, 'Hata'),
	(4, 'Soru');
/*!40000 ALTER TABLE `pdesk_tickettypes` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_users
DROP TABLE IF EXISTS `pdesk_users`;
CREATE TABLE IF NOT EXISTS `pdesk_users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(200) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `organizationID` int(11) NOT NULL,
  `userType` tinyint(4) NOT NULL,
  `createdDate` datetime NOT NULL,
  `createdBy` int(11) NOT NULL,
  `isPassive` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_users: ~4 rows (approximately)
DELETE FROM `pdesk_users`;
/*!40000 ALTER TABLE `pdesk_users` DISABLE KEYS */;
INSERT INTO `pdesk_users` (`ID`, `fullname`, `username`, `password`, `organizationID`, `userType`, `createdDate`, `createdBy`, `isPassive`) VALUES
	(1, 'İsmail AKTAŞ', 'ismail', '1', 0, 1, '2019-03-13 00:00:00', 1, 0),
	(17, 'Eyüp Ensari Turan', 'eyup', '1', 0, 1, '2019-03-31 09:25:11', 1, 0),
	(18, 'Ayşegül Dilaver', 'aysegul', '1', 1, 2, '2019-03-31 09:26:04', 1, 0),
	(19, 'Cem Çavuş', 'cem', '1', 1, 3, '2019-03-31 09:26:21', 1, 0);
/*!40000 ALTER TABLE `pdesk_users` ENABLE KEYS */;

-- Dumping structure for table ismail.pdesk_usertype
DROP TABLE IF EXISTS `pdesk_usertype`;
CREATE TABLE IF NOT EXISTS `pdesk_usertype` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table ismail.pdesk_usertype: ~3 rows (approximately)
DELETE FROM `pdesk_usertype`;
/*!40000 ALTER TABLE `pdesk_usertype` DISABLE KEYS */;
INSERT INTO `pdesk_usertype` (`ID`, `name`) VALUES
	(1, 'Admin'),
	(2, 'Yönetici'),
	(3, 'Kullanıcı');
/*!40000 ALTER TABLE `pdesk_usertype` ENABLE KEYS */;

-- Dumping structure for procedure ismail.prcCheckUser
DROP PROCEDURE IF EXISTS `prcCheckUser`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcCheckUser`(prmUsername varchar(100), prmPassword varchar(100))
BEGIN

	select 
		pDesk_users.ID, 
		pDesk_users.fullname, 
		(case pDesk_users.userType when 1 then 0 else pDesk_users.organizationID end) as organizationID, 
		(case pDesk_users.userType when 1 then 'Admin' else pDesk_organization.name end) as organizationName,
		pDesk_users.userType, 
		pDesk_users.username 
	from 
		pDesk_users 
		left join pDesk_organization on pDesk_users.organizationID = pDesk_organization.ID
	where 
		ifnull(isPassive, 0) = 0 
		and username = prmUsername 
		and password = prmPassword
	;

END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetCounts
DROP PROCEDURE IF EXISTS `prcGetCounts`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetCounts`(prmStatus int, prmType int, prmOrganizationID int)
BEGIN

	declare resultCount int default 0;

	if (prmStatus > 0) then 
	
		select count(*) from pdesk_tickets 
		where 
		( prmOrganizationID = 0 or pdesk_tickets.organizationID = prmOrganizationID )
		and pdesk_tickets.parentId = 0
		and pdesk_tickets.status = prmStatus 
		and pdesk_tickets.isDeleted = 0 
		into resultCount;

	end if;


	if (prmType > 0) then 
	
		select count(*) from pdesk_tickets 
		where 
		( prmOrganizationID = 0 or pdesk_tickets.organizationID = prmOrganizationID )
		and pdesk_tickets.parentId = 0
		and pdesk_tickets.ticketType = prmType 
		and pdesk_tickets.isDeleted = 0 
		into resultCount;

	end if;	

	select resultCount;

END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetModules
DROP PROCEDURE IF EXISTS `prcGetModules`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetModules`(prmOrganizationID int)
BEGIN

	select 
		pdesk_ticketmodules.ID as moduleID,
		pdesk_ticketmodules.name as moduleName,
		ifnull(pdesk_ticketmodules.organizationID, 0) as organizationID,
		pdesk_organization.name as organizationName
	from 
		pdesk_ticketmodules
		left join pdesk_organization on pdesk_ticketmodules.organizationID = pdesk_organization.ID
	where
		( 0 = prmOrganizationID or pdesk_ticketmodules.organizationID = prmOrganizationID)
	order by
		organizationName, moduleName
	;


END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetTicketById
DROP PROCEDURE IF EXISTS `prcGetTicketById`;
DELIMITER //
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
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate,
		pDesk_tickets.ticketType,
        pDesk_ticketTypes.name as ticketTypeName,
		pDesk_tickets.ticketModule,
		pDesk_ticketModules.name as ticketModuleName		
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
		left join pDesk_ticketTypes on pDesk_tickets.ticketType = pDesk_ticketTypes.ID
		left join pDesk_ticketModules on pDesk_tickets.ticketModule = pDesk_ticketModules.ID
	where
		(pDesk_tickets.ID = prmTicketID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetTicketDetail
DROP PROCEDURE IF EXISTS `prcGetTicketDetail`;
DELIMITER //
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
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate,
        pDesk_tickets.ticketType,
        pDesk_ticketTypes.name as ticketTypeName,
		pDesk_tickets.ticketModule,
		pDesk_ticketModules.name as ticketModuleName
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
        left join pDesk_ticketTypes on pDesk_tickets.ticketType = pDesk_ticketTypes.ID
		left join pDesk_ticketModules on pDesk_tickets.ticketModule = pDesk_ticketModules.ID
	where
		(pDesk_tickets.ID = prmTicketID or pDesk_tickets.parentId = prmTicketID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetTickets
DROP PROCEDURE IF EXISTS `prcGetTickets`;
DELIMITER //
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
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate,
        pDesk_tickets.ticketType,
        pDesk_ticketTypes.name as ticketTypeName,
		pDesk_tickets.ticketModule,
		pDesk_ticketModules.name as ticketModuleName
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
        left join pDesk_ticketTypes on pDesk_tickets.ticketType = pDesk_ticketTypes.ID
		left join pDesk_ticketModules on pDesk_tickets.ticketModule = pDesk_ticketModules.ID

	where
		pDesk_tickets.parentId = 0
        and  ifnull(pDesk_tickets.isDeleted, 0) = 0
		and (prmOrganizationID = 0 or pDesk_tickets.organizationID = prmOrganizationID)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetTicketsSearch
DROP PROCEDURE IF EXISTS `prcGetTicketsSearch`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetTicketsSearch`(prmOrganizationID int, prmUserID int, prmKey varchar(50) )
BEGIN

	declare newKey varchar(50);
	set newKey = concat('%', prmKey, '%' );

	SELECT 
		pDesk_tickets.ID,
		pDesk_tickets.parentId,
		replace(pDesk_tickets.subject, prmKey, concat('<span class="text-danger"><u>',prmKey,'</u></span>') ) as subject,
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
        date_format(pDesk_tickets.deletedDate, '%d.%m.%Y %H:%i') as deletedDate,
        pDesk_tickets.ticketType,
        pDesk_ticketTypes.name as ticketTypeName,
		pDesk_tickets.ticketModule,
		pDesk_ticketModules.name as ticketModuleName
	FROM 
		pDesk_tickets
		left join pDesk_organization on pDesk_tickets.organizationID = pDesk_organization.ID
		left join pDesk_ticketStatus on pDesk_tickets.status = pDesk_ticketStatus.ID
		left join pDesk_users on pDesk_tickets.createdBy = pDesk_users.ID
        left join pDesk_users assigned on pDesk_tickets.assignUserID = assigned.ID
        left join pDesk_ticketTypes on pDesk_tickets.ticketType = pDesk_ticketTypes.ID
		left join pDesk_ticketModules on pDesk_tickets.ticketModule = pDesk_ticketModules.ID

	where
		pDesk_tickets.parentId = 0
        and  ifnull(pDesk_tickets.isDeleted, 0) = 0
		and (prmOrganizationID = 0 or pDesk_tickets.organizationID = prmOrganizationID)
		and ( 
				pDesk_tickets.subject like newKey 
				or pDesk_tickets.description like newKey 
				or pDesk_tickets.ID = prmKey
			)
	order by
		parentId asc, pDesk_tickets.createdDate desc;
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetUserOrganizations
DROP PROCEDURE IF EXISTS `prcGetUserOrganizations`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetUserOrganizations`(prmUserID int)
BEGIN

    declare prmUserType int default 0; 
	declare prmUserOrganizationID int default 0;   
    
    select userType, organizationID  from pDesk_users where pDesk_users.ID = prmUserID into prmUserType, prmUserOrganizationID;
    
    if (prmUserType = 1) then
		set prmUserOrganizationID = 0;
    end if;

	SELECT ID, name FROM pDesk_organization  
    where 0 = prmUserOrganizationID or ID = prmUserOrganizationID
    order by name
    ;
    

END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetUsers
DROP PROCEDURE IF EXISTS `prcGetUsers`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetUsers`(prmUserID int)
BEGIN

	declare prmOrganizationID int default 0;   
    declare prmUserType int default 0;   
    
    select userType, organizationID from pDesk_users where pDesk_users.ID = prmUserID into prmUserType, prmOrganizationID;
    
    if ( prmUserType = 1 ) then
		set prmOrganizationID = 0;
    end if;

	select 
		pDesk_users.ID as userID,
		pDesk_users.fullname,
		pDesk_users.username,
        pDesk_users.password,
		pDesk_users.organizationID,
		pDesk_organization.name as organizationName,
		pDesk_users.userType,
		pDesk_userType.name as userTypeName,
		pDesk_users.isPassive,
		date_format(pDesk_users.createdDate, '%d.%m.%Y %H:%i') as createdDate,
		pDesk_users.createdBy,
		userInfo.fullname as createdByName
	from 
		pDesk_users
		left join pDesk_organization on pDesk_users.organizationID = pDesk_organization.ID
		left join pDesk_userType on pDesk_users.userType = pDesk_userType.ID
		left join pDesk_users as userInfo on pDesk_users.createdBy = userInfo.ID
	where
		(( prmOrganizationID = 0 or pDesk_users.organizationID = prmOrganizationID)
		and ( prmUserType = 3 and pDesk_users.ID = prmUserID ))
		or
		(( prmOrganizationID = 0 or pDesk_users.organizationID = prmOrganizationID)
		and ( prmUserType = 1 ))
		or
		(( prmOrganizationID = 0 or pDesk_users.organizationID = prmOrganizationID)
		and ( prmUserType = 2 ))

	order by
		fullname;
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcGetUserTypes
DROP PROCEDURE IF EXISTS `prcGetUserTypes`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetUserTypes`(prmUserID int)
BEGIN

    declare prmUserType int default 0;   
    
    select userType  from pDesk_users where pDesk_users.ID = prmUserID into prmUserType;

	SELECT ID, name FROM pDesk_userType where  ID = prmUserType  
    union 
    SELECT ID, name FROM pDesk_userType where  ID <> 1;  
    
END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcRptAssignedUsers
DROP PROCEDURE IF EXISTS `prcRptAssignedUsers`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcRptAssignedUsers`(
	IN `prmOrganizationID` int
)
BEGIN

	select 
		pdesk_users.username as text,
		count(*) value 
	from 
		pdesk_tickets
		inner join pdesk_users on pdesk_tickets.assignUserID = pdesk_users.ID
	where
		ifnull(pdesk_tickets.isDeleted, 0) = 0
		and ifnull(pdesk_tickets.status , 0) = 2
		and ifnull(pdesk_tickets.parentId, 0) = 0
		and (pdesk_tickets.organizationID = prmOrganizationID or 0 = prmOrganizationID)
	group by
		pdesk_tickets.assignUserID
	order by
		pdesk_users.fullname;

END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcRptModuleErros
DROP PROCEDURE IF EXISTS `prcRptModuleErros`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcRptModuleErros`(
	IN `prmOrganizationID` int
)
BEGIN

	select 
		pdesk_ticketmodules.name as text,
		count(*) value 
	from 
		pdesk_tickets
		inner join pdesk_ticketmodules on pdesk_tickets.ticketModule = pdesk_ticketmodules.ID
	where
		ifnull(pdesk_tickets.isDeleted, 0) = 0
		and ifnull(pdesk_tickets.ticketType, 0) = 3
		and ifnull(pdesk_tickets.parentId, 0) = 0
		and (pdesk_tickets.organizationID = prmOrganizationID or 0 = prmOrganizationID)
	group by
		pdesk_tickets.ticketModule
	order by
		pdesk_ticketmodules.name;

END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcRptTicketStatus
DROP PROCEDURE IF EXISTS `prcRptTicketStatus`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcRptTicketStatus`(
	IN `prmOrganizationID` int
)
BEGIN


	select 
		pdesk_ticketstatus.name as text,
		count(*) value 
	from 
		pdesk_tickets
		inner join pdesk_ticketstatus on pdesk_tickets.status = pdesk_ticketstatus.ID
	where
		ifnull(pdesk_tickets.isDeleted, 0) = 0
		and ifnull(pdesk_tickets.parentId, 0) = 0
		and ( pdesk_tickets.organizationID = prmOrganizationID or 0 = prmOrganizationID )
	group by
		pdesk_tickets.status
	order by
		pdesk_ticketstatus.name;


END//
DELIMITER ;

-- Dumping structure for procedure ismail.prcRptTicketTypes
DROP PROCEDURE IF EXISTS `prcRptTicketTypes`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcRptTicketTypes`(
	IN `prmOrganizationID` int
)
BEGIN

	select 
		pdesk_tickettypes.name as text,
		count(*) value 
	from 
		pdesk_tickets
		inner join pdesk_tickettypes on pdesk_tickets.ticketType = pdesk_tickettypes.ID
	where
		ifnull(pdesk_tickets.isDeleted, 0) = 0
		and ifnull(pdesk_tickets.parentId, 0) = 0
		and (pdesk_tickets.organizationID = 0 or 0 = 0)
	group by
		pdesk_tickets.ticketType
	order by
		pdesk_tickettypes.name;

END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
