-- MySQL dump 10.13  Distrib 5.7.11, for Win32 (AMD64)
--
-- Host: localhost    Database: zhengquan
-- ------------------------------------------------------
-- Server version	5.7.11

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
-- Table structure for table `gupiao`
--

DROP TABLE IF EXISTS `gupiao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gupiao` (
  `gp_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` tinytext NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `price` float DEFAULT '0',
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`gp_id`),
  UNIQUE KEY `gp_id_UNIQUE` (`gp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gupiao`
--

LOCK TABLES `gupiao` WRITE;
/*!40000 ALTER TABLE `gupiao` DISABLE KEYS */;
INSERT INTO `gupiao` VALUES (51,'600741','华域汽车',1,14.233,37),(56,'601166','兴业银行',1,12,37),(57,'600519','贵州茅台',1,250,37),(59,'600660','福耀玻璃',1,13.9,38),(67,'600660','福耀玻璃',1,13.677,37),(68,'601166','兴业银行',1,15.5,72),(69,'601006','大秦铁路',1,6.35,72),(70,'999999','test',1,9.9,72),(71,'000000','注销',0,1,72),(72,'601939','建设银行',1,4.8,3),(73,'600519','贵州茅台',1,256.13,3),(74,'600741','华域汽车',1,14.28,3),(75,'600660','福耀玻璃',1,14.49,3),(76,'600265','*ST景谷',1,25.08,3),(77,'601939','建设银行',0,5.23,12),(78,'601166','兴业银行',0,15.98,12),(79,'600519','贵州茅台',0,256.13,12),(80,'600519','贵州茅台',0,297.68,12),(81,'656770','test',0,1,12),(82,'06818','HK光大银行',0,3,12),(83,'00656','福星',0,13,12),(84,'00656','HK复星国际',1,11.38,12),(85,'00939','HK建设银行',1,5.64,12),(86,'06818','HK中国光大银行',1,3.58,12),(87,'600741','华域汽车',1,15.81,12),(88,'150175','H股A',1,1.045,12),(89,'150194','互联网A',1,1.082,12),(90,'150207','地产A端',1,1.077,12),(91,'601166','兴业银行',1,15.98,12),(92,'601939','建设银行',1,5.14,12),(93,'600660','福耀玻璃',1,17.66,12),(94,'600519','贵州茅台',0,297.68,12),(95,'600519','贵州茅台',0,297.68,12);
/*!40000 ALTER TABLE `gupiao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gupiao_deal`
--

DROP TABLE IF EXISTS `gupiao_deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gupiao_deal` (
  `gd_id` int(11) NOT NULL AUTO_INCREMENT,
  `gp_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `buysell` float DEFAULT NULL,
  `count` int(11) NOT NULL,
  `dealdate` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `price` float NOT NULL,
  `deal_money` float DEFAULT '0',
  `flag` tinyint(1) NOT NULL DEFAULT '1',
  `remark` varchar(85) DEFAULT NULL,
  PRIMARY KEY (`gd_id`),
  UNIQUE KEY `gd_id_UNIQUE` (`gd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gupiao_deal`
--

LOCK TABLES `gupiao_deal` WRITE;
/*!40000 ALTER TABLE `gupiao_deal` DISABLE KEYS */;
INSERT INTO `gupiao_deal` VALUES (1,51,37,NULL,1000,NULL,1,10.5,NULL,1,NULL),(2,51,37,NULL,1000,NULL,1,11,NULL,2,NULL),(3,51,37,NULL,1000,NULL,1,13.08,NULL,1,NULL),(4,51,37,NULL,1000,NULL,1,13.15,NULL,2,NULL),(5,51,37,NULL,2000,NULL,1,13.18,NULL,1,NULL),(6,51,37,NULL,1000,NULL,1,13.2,NULL,2,NULL),(7,56,37,NULL,2000,NULL,1,12.1,NULL,1,NULL),(8,56,37,NULL,1000,NULL,1,12,NULL,2,NULL),(9,68,72,NULL,50000,NULL,1,15.5,NULL,1,NULL),(10,68,72,NULL,20000,NULL,1,16,NULL,2,NULL),(11,67,37,NULL,3000,NULL,1,13.6,NULL,1,NULL),(12,51,37,NULL,500,'2016-05-05',1,15,NULL,2,NULL),(13,51,37,NULL,3000,'2016-05-17',1,13.9,NULL,1,NULL),(14,51,37,NULL,1000,'2016-05-20',1,15.3,NULL,2,NULL),(15,57,37,NULL,500,'2016-06-06',1,230,NULL,1,NULL),(16,75,3,NULL,2000,'2016-05-20',1,2.5,NULL,1,NULL),(17,75,3,NULL,1000,'2016-05-25',1,2.8,NULL,2,NULL),(18,77,12,NULL,5000,'2016-05-01',1,3,NULL,1,NULL),(19,77,12,NULL,2000,'2016-05-09',1,4,NULL,2,NULL),(20,78,12,NULL,7000,'2016-05-12',1,1,NULL,1,NULL),(21,78,12,NULL,2000,'2016-05-30',1,20,NULL,2,NULL),(22,80,12,NULL,10000,'2015-05-01',1,1,NULL,1,NULL),(23,80,12,NULL,10000,'2015-09-10',1,2,NULL,2,NULL),(24,80,12,NULL,8000,'2013-01-01',1,2,NULL,1,NULL),(25,80,12,NULL,5000,'2015-01-01',1,10,NULL,2,NULL),(26,85,12,NULL,1000,'2016-02-23',1,4.63,3891.23,1,NULL),(27,84,12,NULL,1000,'2016-06-07',1,10.9,9258.7,1,NULL),(29,85,12,NULL,0,'2016-07-26',1,0,219.2,2,'股息'),(30,85,12,NULL,1000,'2016-09-09',1,6.07,5232.73,2,''),(31,86,12,NULL,3000,'2016-09-09',1,3.78,9785.13,1,''),(32,93,12,NULL,500,'2016-04-07',1,15.19,7582.25,2,''),(33,87,12,NULL,400,'2016-04-07',1,15.31,6129.12,1,''),(34,91,12,NULL,0,'2016-06-03',1,0,244,2,'股息'),(35,87,12,NULL,0,'2016-06-22',1,0,972,2,'股息'),(36,91,12,NULL,400,'2016-09-07',1,15.95,6368.49,2,''),(37,91,12,NULL,0,'2016-09-08',1,0,24.4,1,'股息补税'),(38,92,12,NULL,2000,'2016-01-04',1,5.65,11283.5,2,''),(39,87,12,NULL,300,'2016-01-27',1,13.36,4013.08,1,''),(40,91,12,NULL,400,'2015-11-02',1,15.25,6105.12,1,''),(41,92,12,NULL,2000,'2015-10-20',1,5.45,10905.2,1,''),(42,87,12,NULL,500,'2015-10-30',1,15.55,7780.15,1,''),(43,93,12,NULL,500,'2015-10-30',1,13.52,6765.14,1,''),(44,89,12,NULL,5000,'2016-04-14',1,0.973,4870,1,''),(45,89,12,NULL,20000,'2016-04-18',1,0.975,19505,1,''),(46,90,12,NULL,25000,'2016-04-22',1,0.984,24606.5,1,''),(47,87,12,NULL,500,'2016-05-05',1,15.09,7550.15,1,''),(48,87,12,NULL,400,'2016-05-10',1,13.94,5581.11,1,''),(49,90,12,NULL,25000,'2016-08-08',1,1.025,25620,2,''),(50,88,12,NULL,26000,'2016-08-08',1,0.967,25147,1,''),(51,89,12,NULL,25000,'2016-08-24',1,1.034,25845,2,''),(52,88,12,NULL,24000,'2016-08-24',1,0.978,23477,1,''),(53,88,12,NULL,50000,'2016-10-10',1,1.012,50610,2,''),(54,86,12,NULL,7000,'2016-10-11',1,3.68,22317.5,1,''),(55,86,12,NULL,2000,'2016-10-13',1,3.54,6146.66,1,'');
/*!40000 ALTER TABLE `gupiao_deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qiquan`
--

DROP TABLE IF EXISTS `qiquan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qiquan` (
  `qq_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(60) NOT NULL,
  `name` tinytext NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `flag` tinyint(1) NOT NULL,
  `canceldate` date DEFAULT NULL,
  `price` float NOT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`qq_id`),
  UNIQUE KEY `qq_id_UNIQUE` (`qq_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qiquan`
--

LOCK TABLES `qiquan` WRITE;
/*!40000 ALTER TABLE `qiquan` DISABLE KEYS */;
INSERT INTO `qiquan` VALUES (34,'10000699','50ETF购10月2200',0,1,NULL,0.05,12),(35,'10000712','1',0,2,NULL,1,12),(36,'10000707','50ETF沽10月2350',0,2,NULL,0.118,12),(37,'10000706','50ETF沽10月2300',0,2,NULL,0.0742,12),(38,'10000706','50ETF沽10月2300',0,2,NULL,0.0742,12),(39,'10000629','50ETF购12月1950',1,1,NULL,0.2901,12),(40,'10000630','50ETF沽12月1950',0,2,NULL,0.0035,12),(41,'10000671','50ETF购3月2100',0,1,NULL,0.1737,12),(42,'10000682','50ETF沽3月2350',0,2,NULL,0.1823,12);
/*!40000 ALTER TABLE `qiquan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qiquan_deal`
--

DROP TABLE IF EXISTS `qiquan_deal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qiquan_deal` (
  `qd_id` int(11) NOT NULL AUTO_INCREMENT,
  `qq_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `buysell` float DEFAULT NULL,
  `flag` tinyint(1) NOT NULL,
  `count` int(11) NOT NULL,
  `dealdate` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `price` float NOT NULL,
  `deal_money` float DEFAULT '0',
  `remark` text NOT NULL COMMENT '备注',
  PRIMARY KEY (`qd_id`),
  UNIQUE KEY `qd_id_UNIQUE` (`qd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qiquan_deal`
--

LOCK TABLES `qiquan_deal` WRITE;
/*!40000 ALTER TABLE `qiquan_deal` DISABLE KEYS */;
INSERT INTO `qiquan_deal` VALUES (3,39,12,NULL,1,2,'2016-07-21',1,0.279,5594,''),(4,39,12,NULL,1,3,'2016-07-21',1,0.2798,8415,''),(5,39,12,NULL,1,2,'2016-09-05',1,0.3406,6826,'');
/*!40000 ALTER TABLE `qiquan_deal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-20 17:46:01
