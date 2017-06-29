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
-- Table structure for table `deal_file`
--

DROP TABLE IF EXISTS `deal_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deal_file` (
  `df_id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(150) DEFAULT NULL,
  `filetype` varchar(125) DEFAULT NULL,
  `filename` varchar(125) DEFAULT NULL,
  `diskname` varchar(125) DEFAULT NULL,
  `size` varchar(125) DEFAULT NULL,
  `userid` varchar(45) DEFAULT NULL,
  `type` int(2) DEFAULT '1' COMMENT '1:50etf期权； 2：股票',
  `status` tinyint(1) DEFAULT '1',
  `createtime` datetime DEFAULT NULL,
  `isanalyse` tinyint(1) DEFAULT '0' COMMENT '0:没有被分析； 1：已被分析',
  `analysetime` datetime DEFAULT NULL COMMENT '分析时间',
  PRIMARY KEY (`df_id`)
) ENGINE=MyISAM AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COMMENT='交易文件';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_file`
--

LOCK TABLES `deal_file` WRITE;
/*!40000 ALTER TABLE `deal_file` DISABLE KEYS */;
INSERT INTO `deal_file` VALUES (93,'./filedatas/maxuan007_12','csv','50etf-海通-2017.1.1至2017.6.15.csv','50etf-海通-2017.1.1至2017.6.15.csv_d90a8c80-5120-11e7-90d0-3fae6dfd8080.csv','4051','12',1,0,'2017-06-15 00:45:18',0,NULL),(94,'./filedatas/maxuan007_12','xlsx','50etf-海通-2017.3.3至2017.6.16.xlsx','50etf-海通-2017.3.3至2017.6.16.xlsx_e279d3c0-5247-11e7-bbd0-51f61ad5d20f.xlsx','11793','12',1,1,'2017-06-16 11:57:16',0,NULL);
/*!40000 ALTER TABLE `deal_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gupiao`
--

DROP TABLE IF EXISTS `gupiao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gupiao` (
  `gp_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `name` varchar(80) DEFAULT '-1',
  `status` tinyint(1) DEFAULT '1',
  `price` float DEFAULT '0',
  `userid` int(11) NOT NULL,
  `createtime` datetime DEFAULT NULL COMMENT '生成时间',
  PRIMARY KEY (`gp_id`),
  UNIQUE KEY `gp_id_UNIQUE` (`gp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gupiao`
--

LOCK TABLES `gupiao` WRITE;
/*!40000 ALTER TABLE `gupiao` DISABLE KEYS */;
INSERT INTO `gupiao` VALUES (51,'600741','华域汽车',1,14.233,37,NULL),(56,'601166','兴业银行',1,12,37,NULL),(57,'600519','贵州茅台',1,250,37,NULL),(59,'600660','福耀玻璃',1,13.9,38,NULL),(67,'600660','福耀玻璃',1,13.677,37,NULL),(68,'601166','兴业银行',1,15.5,72,NULL),(69,'601006','大秦铁路',1,6.35,72,NULL),(70,'999999','test',1,9.9,72,NULL),(71,'000000','注销',0,1,72,NULL),(72,'601939','建设银行',1,4.8,3,NULL),(73,'600519','贵州茅台',1,256.13,3,NULL),(74,'600741','华域汽车',1,14.28,3,NULL),(75,'600660','福耀玻璃',1,14.49,3,NULL),(76,'600265','*ST景谷',1,25.08,3,NULL),(77,'601939','建设银行',0,5.23,12,NULL),(78,'601166','兴业银行',0,15.98,12,NULL),(79,'600519','贵州茅台',0,256.13,12,NULL),(80,'600519','贵州茅台',0,297.68,12,NULL),(81,'656770','test',0,1,12,NULL),(82,'06818','HK光大银行',0,3,12,NULL),(83,'00656','福星',0,13,12,NULL),(84,'00656','复星国际',1,12.46,12,NULL),(85,'00939','建设银行',1,6.39,12,NULL),(86,'06818','中国光大银行',1,3.63,12,NULL),(87,'600741','华域汽车',1,22.64,12,NULL),(88,'150175','H股A',1,0.953,12,NULL),(89,'150194','互联网A',1,1.009,12,NULL),(90,'150207','地产A端',1,1.044,12,NULL),(91,'601166','兴业银行',1,15.79,12,NULL),(92,'601939','建设银行',1,6.12,12,NULL),(93,'600660','福耀玻璃',1,25.08,12,NULL),(94,'600519','贵州茅台',0,297.68,12,NULL),(95,'600519','贵州茅台',0,297.68,12,NULL),(124,'600519','贵州茅台',1,462.63,12,'2017-02-26 21:15:57'),(125,'300059','东方财富',0,16.61,12,'2017-02-28 19:20:34'),(126,'000006','深振业Ａ',0,8.78,12,'2017-02-28 20:56:14'),(127,'00989','广泽国际发展',0,2.02,12,'2017-03-01 14:50:23'),(128,'00998','中信银行',0,5.33,12,'2017-03-01 14:51:22'),(129,'600016','民生银行',0,9.04,12,'2017-03-01 14:54:00'),(130,'510050','50ETF',0,2.367,12,'2017-03-01 14:54:21'),(131,'510050','50ETF',0,2.367,12,'2017-03-01 14:55:19'),(132,'600837','海通证券',1,14.85,12,'2017-03-01 14:56:05'),(133,'000002','万 科Ａ',0,20.5,12,'2017-03-01 14:57:03'),(134,'601066','-1',0,0,12,'2017-03-01 15:09:49'),(135,'601066','-1',0,0,12,'2017-03-01 15:10:51'),(136,'601611','中国核建',1,11.58,12,'2017-03-01 15:40:13'),(137,'510050','50ETF',0,2.368,12,'2017-03-01 15:40:54'),(138,'510050','50ETF',0,2.368,12,'2017-03-01 15:51:17'),(139,'510050','50ETF',0,2.368,12,'2017-03-01 16:06:25'),(140,'510050','50ETF',0,2.368,12,'2017-03-01 16:09:32'),(141,'510050','50ETF',0,2.368,12,'2017-03-01 16:13:40'),(142,'510050','50ETF',0,2.368,12,'2017-03-01 16:14:12'),(143,'510050','50ETF',0,2.368,12,'2017-03-01 16:17:21'),(144,'510050','50ETF',0,2.368,12,'2017-03-01 16:21:38'),(145,'510050','50ETF',0,2.368,12,'2017-03-01 16:24:27'),(146,'510050','50ETF',1,2.46,12,'2017-03-03 15:56:37');
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
  `deal_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`gd_id`),
  UNIQUE KEY `gd_id_UNIQUE` (`gd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gupiao_deal`
--

LOCK TABLES `gupiao_deal` WRITE;
/*!40000 ALTER TABLE `gupiao_deal` DISABLE KEYS */;
INSERT INTO `gupiao_deal` VALUES (1,51,37,NULL,1000,NULL,1,10.5,NULL,1,NULL,NULL),(2,51,37,NULL,1000,NULL,1,11,NULL,2,NULL,NULL),(3,51,37,NULL,1000,NULL,1,13.08,NULL,1,NULL,NULL),(4,51,37,NULL,1000,NULL,1,13.15,NULL,2,NULL,NULL),(5,51,37,NULL,2000,NULL,1,13.18,NULL,1,NULL,NULL),(6,51,37,NULL,1000,NULL,1,13.2,NULL,2,NULL,NULL),(7,56,37,NULL,2000,NULL,1,12.1,NULL,1,NULL,NULL),(8,56,37,NULL,1000,NULL,1,12,NULL,2,NULL,NULL),(9,68,72,NULL,50000,NULL,1,15.5,NULL,1,NULL,NULL),(10,68,72,NULL,20000,NULL,1,16,NULL,2,NULL,NULL),(11,67,37,NULL,3000,NULL,1,13.6,NULL,1,NULL,NULL),(12,51,37,NULL,500,'2016-05-05',1,15,NULL,2,NULL,NULL),(13,51,37,NULL,3000,'2016-05-17',1,13.9,NULL,1,NULL,NULL),(14,51,37,NULL,1000,'2016-05-20',1,15.3,NULL,2,NULL,NULL),(15,57,37,NULL,500,'2016-06-06',1,230,NULL,1,NULL,NULL),(16,75,3,NULL,2000,'2016-05-20',1,2.5,NULL,1,NULL,NULL),(17,75,3,NULL,1000,'2016-05-25',1,2.8,NULL,2,NULL,NULL),(26,85,12,NULL,1000,'2016-02-23',1,4.63,3891.23,1,NULL,NULL),(27,84,12,NULL,1000,'2016-06-07',1,10.9,9258.7,1,NULL,NULL),(29,85,12,NULL,0,'2016-07-26',1,0,219.2,2,'股息',NULL),(30,85,12,NULL,1000,'2016-09-09',1,6.07,5232.73,2,'',NULL),(31,86,12,NULL,3000,'2016-09-09',1,3.78,9785.13,1,'',NULL),(32,93,12,NULL,500,'2016-04-07',1,15.19,7582.25,2,'',NULL),(33,87,12,NULL,400,'2016-04-07',1,15.31,6129.12,1,'',NULL),(34,91,12,NULL,0,'2016-06-03',1,0,244,2,'股息',NULL),(35,87,12,NULL,0,'2016-06-22',1,0,972,2,'股息',NULL),(36,91,12,NULL,400,'2016-09-07',1,15.95,6368.49,2,'',NULL),(37,91,12,NULL,0,'2016-09-08',1,0,24.4,1,'股息补税',NULL),(38,92,12,NULL,2000,'2016-01-04',1,5.65,11283.5,2,'',NULL),(39,87,12,NULL,300,'2016-01-27',1,13.36,4013.08,1,'',NULL),(40,91,12,NULL,400,'2015-11-02',1,15.25,6105.12,1,'',NULL),(41,92,12,NULL,2000,'2015-10-20',1,5.45,10905.2,1,'',NULL),(42,87,12,NULL,500,'2015-10-30',1,15.55,7780.15,1,'',NULL),(43,93,12,NULL,500,'2015-10-30',1,13.52,6765.14,1,'',NULL),(44,89,12,NULL,5000,'2016-04-14',1,0.973,4870,1,'',NULL),(45,89,12,NULL,20000,'2016-04-18',1,0.975,19505,1,'',NULL),(46,90,12,NULL,25000,'2016-04-22',1,0.984,24606.5,1,'',NULL),(47,87,12,NULL,500,'2016-05-05',1,15.09,7550.15,1,'',NULL),(48,87,12,NULL,400,'2016-05-10',1,13.94,5581.11,1,'',NULL),(49,90,12,NULL,25000,'2016-08-08',1,1.025,25620,2,'',NULL),(50,88,12,NULL,26000,'2016-08-08',1,0.967,25147,1,'',NULL),(51,89,12,NULL,25000,'2016-08-24',1,1.034,25845,2,'',NULL),(52,88,12,NULL,24000,'2016-08-24',1,0.978,23477,1,'',NULL),(53,88,12,NULL,50000,'2016-10-10',1,1.012,50610,2,'',NULL),(54,86,12,NULL,7000,'2016-10-11',1,3.68,22317.5,1,'',NULL),(55,86,12,NULL,2000,'2016-10-13',1,3.54,6146.66,1,'',NULL),(56,86,12,NULL,5000,'2016-11-23',1,3.48,15520.5,1,'',NULL),(57,87,12,NULL,0,'2016-06-22',1,0,729,2,'股息',NULL),(58,87,12,NULL,1200,'2016-11-29',1,17.12,20516.9,2,'',NULL),(59,87,12,NULL,0,'2016-11-29',1,0,24.3,1,'红利税补缴',NULL),(60,87,12,NULL,0,'2016-11-29',1,0,32.4,1,'红利税补缴',NULL),(61,84,12,NULL,1500,'2017-05-16',1,11.76,15658.2,1,'',NULL),(62,86,12,NULL,17000,'2017-04-13',1,3.69,55667.8,2,'',NULL),(63,87,12,NULL,900,'2017-04-10',1,18.76,16861.8,2,'',NULL),(64,87,12,NULL,800,'2017-05-08',1,18.94,15157.3,1,'',NULL),(65,87,12,NULL,800,'2017-06-14',1,23.25,18576,2,'',NULL),(66,87,12,NULL,800,'2017-06-15',1,22.7,18165.4,1,'',NULL);
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
  `name` tinytext,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `flag` tinyint(1) NOT NULL DEFAULT '-1',
  `canceldate` date DEFAULT NULL,
  `price` float DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `createtime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`qq_id`),
  UNIQUE KEY `qq_id_UNIQUE` (`qq_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qiquan`
--

LOCK TABLES `qiquan` WRITE;
/*!40000 ALTER TABLE `qiquan` DISABLE KEYS */;
INSERT INTO `qiquan` VALUES (34,'10000699','50ETF购10月2200',0,1,NULL,0.05,12,NULL),(35,'10000712','1',0,2,NULL,1,12,NULL),(36,'10000707','50ETF沽10月2350',0,2,NULL,0.118,12,NULL),(37,'10000706','50ETF沽10月2300',0,2,NULL,0.0742,12,NULL),(38,'10000706','50ETF沽10月2300',0,2,NULL,0.0742,12,NULL),(39,'10000629','50ETF购12月1908A',0,1,NULL,0.3625,12,NULL),(40,'10000630','50ETF沽12月1950',0,2,NULL,0.0035,12,NULL),(41,'10000671','50ETF购3月2100',0,1,NULL,0.1737,12,NULL),(42,'10000682','50ETF沽3月2350',0,2,NULL,0.1823,12,NULL),(43,'10000629','50ETF购12月1950',0,1,NULL,0.361,12,NULL),(44,'10000671','50ETF购3月2055A',1,1,NULL,0.2748,12,NULL),(45,'10000671','50ETF购3月2100',0,1,NULL,0.2084,12,NULL),(46,'10000625','50ETF购12月1957A',0,1,NULL,0.3151,12,NULL),(47,'10000671','50ETF购3月2055',1,1,NULL,0.3737,19,NULL),(48,'10000672','50ETF购3月2104A',1,1,NULL,0.227,12,NULL),(49,'9999900000',NULL,0,-1,NULL,NULL,12,NULL),(50,'8858565',NULL,0,-1,NULL,NULL,12,NULL),(51,'88585659',NULL,0,-1,NULL,NULL,12,NULL),(52,'885856598579',NULL,0,-1,NULL,NULL,12,NULL),(53,'9365865',NULL,0,-1,NULL,NULL,12,NULL),(54,'885680',NULL,0,-1,NULL,NULL,12,NULL),(55,'8856808',NULL,0,-1,NULL,NULL,12,NULL),(56,'999999',NULL,0,-1,NULL,NULL,12,'2017-02-25 21:54:24.893000'),(57,'966869889',NULL,0,-1,NULL,NULL,12,'2017-02-25 22:27:22.109000'),(58,'8888',NULL,0,-1,NULL,NULL,12,'2017-02-25 22:39:38.317000'),(59,'658577',NULL,0,-1,NULL,NULL,12,'2017-02-25 22:42:23.833000'),(60,'10000727','50ETF购6月2153A',1,1,NULL,0.3057,12,'2017-02-26 21:08:40.827000'),(61,'10000679',NULL,0,-1,NULL,NULL,12,'2017-02-28 16:26:22.648000'),(62,'10000677',NULL,0,-1,NULL,NULL,12,'2017-02-28 16:26:46.336000'),(63,'10000697','50ETF沽3月2348A',0,-1,NULL,0.0174,12,'2017-02-28 16:27:44.277000'),(64,'10000867','50ETF购4月2250',1,1,NULL,0.0823,12,'2017-03-01 16:27:15.518000'),(65,'10000749','50ETF购1月2250A',0,1,NULL,0.1076,12,NULL),(66,'10000400','50ETF购3月1850',1,1,NULL,0.3145,12,NULL),(67,'10000869','50ETF购5月2250',1,1,NULL,0.1502,12,'2017-06-16 11:57:44.243000'),(68,'10000885','50ETF购9月2200',1,1,NULL,0.2702,12,'2017-06-16 11:57:44.279000'),(69,'10000747','50ETF购6月2446A',1,1,NULL,0.0293,12,'2017-06-16 11:57:44.316000'),(70,'10000902','50ETF购7月2350',1,1,NULL,0.1174,12,'2017-06-16 11:57:44.353000');
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
  `count` int(11) DEFAULT NULL,
  `dealdate` date DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `price` float DEFAULT NULL,
  `deal_money` float DEFAULT '0',
  `remark` text COMMENT '备注',
  `deal_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`qd_id`),
  UNIQUE KEY `qd_id_UNIQUE` (`qd_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qiquan_deal`
--

LOCK TABLES `qiquan_deal` WRITE;
/*!40000 ALTER TABLE `qiquan_deal` DISABLE KEYS */;
INSERT INTO `qiquan_deal` VALUES (3,39,12,NULL,1,2,'2016-07-21',1,0.279,5594,'',NULL),(4,39,12,NULL,1,3,'2016-07-21',1,0.2798,8415,'',NULL),(5,39,12,NULL,1,2,'2016-09-05',1,0.3406,6826,'',NULL),(6,39,12,NULL,2,5,'2016-10-25',1,0.3631,18120,'',NULL),(7,39,12,NULL,2,2,'2016-10-25',1,0.3623,7232,'',NULL),(10,44,12,NULL,1,5,'2016-10-25',1,0.2198,15435,'',NULL),(11,46,12,NULL,1,1,'2016-08-31',1,0.2885,2892,'',NULL),(12,47,19,NULL,1,1,'2016-11-02',1,0.2081,2088,'',NULL),(13,46,12,NULL,2,1,'2016-11-02',1,0.3032,3025,'',NULL),(14,44,12,NULL,1,1,'2016-11-22',1,0.2899,2906,'',NULL),(15,48,12,NULL,1,1,'2016-11-29',1,0.301,3017,'',NULL),(16,44,12,NULL,2,6,'2016-12-02',1,0.3591,21504,'',NULL),(17,48,12,NULL,1,6,'2016-12-02',1,0.3151,18948,'',NULL),(18,48,12,NULL,1,1,'2016-12-12',1,0.2933,2940,'',NULL),(20,65,12,NULL,1,1,'2016-12-13',1,0.1354,1361,'',NULL),(21,44,12,NULL,1,1,'2016-12-23',1,0.2252,2259,'',NULL),(22,65,12,NULL,2,1,'2016-12-23',1,0.0582,575,'',NULL),(23,48,12,NULL,2,8,'2017-03-02',1,0.2614,20856,'',NULL),(24,44,12,NULL,2,1,'2017-03-02',1,0.3094,3154.9,'',NULL),(25,64,12,NULL,1,9,'2017-03-02',1,0.1194,10809,'',NULL),(26,64,12,NULL,1,1,'2017-03-02',1,0.1181,1188,'',NULL),(27,60,12,NULL,1,2,'2017-03-08',1,0.1899,3895.56,NULL,'e2b30c31-5247-11e7-bbd0-51f61ad5d20f'),(28,64,12,NULL,2,2,'2017-03-08',1,0.0917,1820,NULL,'e2b3a870-5247-11e7-bbd0-51f61ad5d20f'),(29,64,12,NULL,2,3,'2017-04-09',1,0.1314,3921,NULL,'e2b3f690-5247-11e7-bbd0-51f61ad5d20f'),(30,64,12,NULL,2,3,'2017-04-09',1,0.1315,3924,NULL,'e2b46bc0-5247-11e7-bbd0-51f61ad5d20f'),(31,64,12,NULL,2,2,'2017-04-09',1,0.1324,2634,NULL,'e2b50800-5247-11e7-bbd0-51f61ad5d20f'),(32,67,12,NULL,1,5,'2017-04-09',1,0.1332,6695,NULL,'e2b55620-5247-11e7-bbd0-51f61ad5d20f'),(33,67,12,NULL,2,3,'2017-04-09',1,0.1321,3942,NULL,'e2b5a440-5247-11e7-bbd0-51f61ad5d20f'),(34,60,12,NULL,1,2,'2017-05-01',1,0.1909,3916,NULL,'e2b64080-5247-11e7-bbd0-51f61ad5d20f'),(35,60,12,NULL,1,1,'2017-05-01',1,0.1908,1956.98,NULL,'e2b6b5b0-5247-11e7-bbd0-51f61ad5d20f'),(36,60,12,NULL,1,1,'2017-05-01',1,0.1908,1956.98,NULL,'e2b751f0-5247-11e7-bbd0-51f61ad5d20f'),(37,67,12,NULL,2,2,'2017-05-01',1,0.095,1886,NULL,'e2b77900-5247-11e7-bbd0-51f61ad5d20f'),(38,68,12,NULL,1,2,'2017-05-11',1,0.1584,3182,NULL,'e2b7ee30-5247-11e7-bbd0-51f61ad5d20f'),(39,68,12,NULL,1,2,'2017-05-11',1,0.1584,3182,NULL,'e2b83c50-5247-11e7-bbd0-51f61ad5d20f'),(40,60,12,NULL,2,1,'2017-05-24',1,0.2534,2582.75,NULL,'e2b8d890-5247-11e7-bbd0-51f61ad5d20f'),(41,60,12,NULL,2,2,'2017-05-24',1,0.2534,5165.5,NULL,'e2b926b0-5247-11e7-bbd0-51f61ad5d20f'),(42,60,12,NULL,2,2,'2017-05-24',1,0.2534,5165.5,NULL,'e2b99be0-5247-11e7-bbd0-51f61ad5d20f'),(43,60,12,NULL,2,1,'2017-05-24',1,0.2534,2582.75,NULL,'e2ba1110-5247-11e7-bbd0-51f61ad5d20f'),(44,68,12,NULL,1,6,'2017-05-24',1,0.2098,12630,NULL,'e2ba5f30-5247-11e7-bbd0-51f61ad5d20f'),(45,69,12,NULL,1,1,'2017-05-25',1,0.0369,384.12,NULL,'e2baad50-5247-11e7-bbd0-51f61ad5d20f'),(46,69,12,NULL,1,1,'2017-05-25',1,0.037,385.14,NULL,'e2bb2280-5247-11e7-bbd0-51f61ad5d20f'),(47,69,12,NULL,1,1,'2017-05-25',1,0.037,385.14,NULL,'e2bb70a0-5247-11e7-bbd0-51f61ad5d20f'),(48,69,12,NULL,2,1,'2017-06-01',1,0.0579,584.74,NULL,'e2bbe5d0-5247-11e7-bbd0-51f61ad5d20f'),(49,69,12,NULL,2,1,'2017-06-01',1,0.0579,584.74,NULL,'e2bc8210-5247-11e7-bbd0-51f61ad5d20f'),(50,69,12,NULL,2,1,'2017-06-01',1,0.0579,584.74,NULL,'e2bcf740-5247-11e7-bbd0-51f61ad5d20f'),(51,68,12,NULL,2,10,'2017-06-01',1,0.2951,29440,NULL,'e2bdba90-5247-11e7-bbd0-51f61ad5d20f'),(52,70,12,NULL,1,1,'2017-06-01',1,0.1465,1472,NULL,'e2be2fc0-5247-11e7-bbd0-51f61ad5d20f'),(53,70,12,NULL,1,9,'2017-06-01',1,0.1454,13149,NULL,'e2becc00-5247-11e7-bbd0-51f61ad5d20f'),(54,69,12,NULL,1,3,'2017-06-04',1,0.036,1124.76,NULL,'e2bf1a20-5247-11e7-bbd0-51f61ad5d20f'),(55,69,12,NULL,2,1,'2017-06-06',1,0.046,463.12,NULL,'e2bf8f50-5247-11e7-bbd0-51f61ad5d20f'),(56,69,12,NULL,2,2,'2017-06-06',1,0.046,926.24,NULL,'e2bfdd70-5247-11e7-bbd0-51f61ad5d20f');
/*!40000 ALTER TABLE `qiquan_deal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refer_qiquan`
--

DROP TABLE IF EXISTS `refer_qiquan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refer_qiquan` (
  `rq_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `flag` tinyint(1) DEFAULT NULL,
  `cancelDate` date DEFAULT NULL,
  `buy1` varchar(45) DEFAULT NULL,
  `userid` varchar(45) DEFAULT NULL,
  `sale1` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`rq_id`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COMMENT='智能期权的对比物';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refer_qiquan`
--

LOCK TABLES `refer_qiquan` WRITE;
/*!40000 ALTER TABLE `refer_qiquan` DISABLE KEYS */;
INSERT INTO `refer_qiquan` VALUES (45,'10000671','50ETF购3月2055A',0,1,NULL,'0.2862','12','0.2820','0.2862',NULL),(46,'10000672','50ETF购3月2104A',0,1,NULL,'0.2375','12','0.2325','0.2374',NULL),(47,'10000673','50ETF购3月2153A',0,1,NULL,'0.1885','12','0.1857','0.1889',NULL),(48,'10000674','50ETF购3月2202A',0,1,NULL,'0.1403','12','0.1355','0.1403',NULL),(49,'10000675','50ETF购3月2250A',0,1,NULL,'0.0937','12','0.0896','0.0941',NULL),(50,'10000681','50ETF购3月2299A',0,1,NULL,'0.0508','12','0.0434','0.0509',NULL),(51,'10000727','50ETF购6月2153A',1,1,NULL,'0.2041','12','0.3057','0.2042',NULL),(52,'10000728','50ETF购6月2202A',1,1,NULL,'0.1636','12','0.2592','0.1634',NULL),(53,'10000729','50ETF购6月2250A',1,1,NULL,'0.1282','12','0.2111','0.1280',NULL),(54,'10000730','50ETF购6月2299A',1,1,NULL,'0.0972','12','0.1612','0.0984',NULL),(55,'10000731','50ETF购6月2348A',1,1,NULL,'0.0720','12','0.1134','0.0723',NULL),(56,'10000629','50ETF购12月1908',1,1,NULL,'0.5246','19','0.5255','0.5256',NULL),(57,'10000625','50ETF购12月1957',1,1,NULL,'0.4759','19','0.4777','0.4773',NULL),(58,'10000615','50ETF购12月2006',1,1,NULL,'0.4272','19','0.4292','0.4286',NULL),(59,'10000616','50ETF购12月2055',1,1,NULL,'0.3785','19','0.3804','0.3790',NULL),(60,'10000617','50ETF购12月2104',1,1,NULL,'0.3299','19','0.3303','0.3303',NULL),(61,'10000618','50ETF购12月2153',1,1,NULL,'0.2814','19','0.2830','0.2818',NULL),(62,'10000619','50ETF购12月2202',1,1,NULL,'0.2339','19','0.2343','0.2330',NULL),(63,'10000671','50ETF购3月2055',1,1,NULL,'0.3727','19','0.3735','0.3737',NULL),(64,'10000672','50ETF购3月2104',1,1,NULL,'0.3272','19','0.3289','0.3274',NULL),(65,'10000673','50ETF购3月2153',1,1,NULL,'0.2835','19','0.2851','0.2837',NULL),(66,'10000674','50ETF购3月2202',1,1,NULL,'0.2420','19','0.2436','0.2414',NULL),(67,'10000675','50ETF购3月2250',1,1,NULL,'0.2044','19','0.2058','0.2044',NULL),(68,'10000681','50ETF购3月2299',1,1,NULL,'0.1693','19','0.1707','0.1710',NULL),(69,'10000727','50ETF购6月2153',1,1,NULL,'0.2987','19','0.2995','0.3001',NULL),(70,'10000728','50ETF购6月2202',1,1,NULL,'0.2619','19','0.2636','0.2591',NULL),(71,'10000729','50ETF购6月2250',1,1,NULL,'0.2291','19','0.2307','0.2298',NULL),(72,'10000730','50ETF购6月2299',1,1,NULL,'0.1993','19','0.2005','0.1968',NULL),(73,'10000731','50ETF购6月2348',1,1,NULL,'0.1717','19','0.1732','0.1720',NULL),(74,'10000843','50ETF购9月2250',1,NULL,NULL,NULL,'12','0.2241',NULL,'2017-03-07 19:28:18'),(75,'10000846','50ETF购9月2400',1,NULL,NULL,NULL,'12','0.1018',NULL,'2017-03-07 19:28:43'),(76,'10000847','50ETF购9月2450',1,NULL,NULL,NULL,'12','0.0753',NULL,'2017-03-07 19:46:01'),(77,'10000813','50ETF购6月2550',1,NULL,NULL,NULL,'12','0.0032',NULL,'2017-03-09 13:50:58'),(78,'10000844','50ETF购9月2300',1,NULL,NULL,NULL,'12','0.1870',NULL,'2017-03-09 13:52:59'),(79,'10000845','50ETF购9月2350',1,NULL,NULL,NULL,'12','0.1370',NULL,'2017-03-09 13:53:04'),(80,'10000857','50ETF购4月2300',0,NULL,NULL,NULL,'12','0.0561',NULL,'2017-03-09 13:53:55'),(81,'10000858','50ETF购4月2350',0,NULL,NULL,NULL,'12','0.0289',NULL,'2017-03-09 13:54:07'),(82,'10000859','50ETF购4月2400',0,NULL,NULL,NULL,'12','0.0128',NULL,'2017-03-09 13:54:13'),(83,'10000867','50ETF购4月2250',0,NULL,NULL,NULL,'12','0.0944',NULL,'2017-03-09 13:55:39'),(84,'10000869','50ETF购5月2250',0,NULL,NULL,NULL,'12','0.0868',NULL,'2017-03-31 11:14:23'),(85,'10000870','50ETF购5月2300',0,NULL,NULL,NULL,'12','0.0422',NULL,'2017-03-31 11:15:00'),(86,'10000871','50ETF购5月2350',0,NULL,NULL,NULL,'12','0.0127',NULL,'2017-03-31 11:15:08'),(87,'10000872','50ETF购5月2400',0,NULL,NULL,NULL,'12','0.0029',NULL,'2017-03-31 11:15:17'),(88,'10000873','50ETF购5月2450',0,NULL,NULL,NULL,'12','0.0012',NULL,'2017-03-31 11:15:26'),(89,'10000901','50ETF购7月2300',1,NULL,NULL,NULL,'12','0.1636',NULL,'2017-06-16 14:38:53'),(90,'10000902','50ETF购7月2350',1,NULL,NULL,NULL,'12','0.1174',NULL,'2017-06-16 14:39:03'),(91,'10000903','50ETF购7月2400',1,NULL,NULL,NULL,'12','0.0774',NULL,'2017-06-16 14:39:23'),(92,'10000904','50ETF购7月2450',1,NULL,NULL,NULL,'12','0.0459',NULL,'2017-06-16 14:39:55'),(93,'10000905','50ETF购7月2500',1,NULL,NULL,NULL,'12','0.0255',NULL,'2017-06-16 14:40:00'),(94,'10000911','50ETF购7月2550',1,NULL,NULL,NULL,'12','0.0141',NULL,'2017-06-16 14:40:28'),(95,'10000919','50ETF购7月2600',1,NULL,NULL,NULL,'12','0.0088',NULL,'2017-06-16 14:40:38'),(96,'10000885','50ETF购9月2200',1,NULL,NULL,NULL,'12','0.2712',NULL,'2017-06-16 14:41:44'),(97,'10000897','50ETF购12月2200',1,NULL,NULL,NULL,'12','0.2813',NULL,'2017-06-16 14:42:20'),(98,'10000887','50ETF购12月2250',1,NULL,NULL,NULL,'12','0.2376',NULL,'2017-06-16 14:42:31'),(99,'10000888','50ETF购12月2300',1,NULL,NULL,NULL,'12','0.1997',NULL,'2017-06-16 14:42:40'),(100,'10000889','50ETF购12月2350',1,NULL,NULL,NULL,'12','0.1596',NULL,'2017-06-16 14:42:49'),(101,'10000890','50ETF购12月2400',1,NULL,NULL,NULL,'12','0.1276',NULL,'2017-06-16 14:43:07'),(102,'10000891','50ETF购12月2450',1,NULL,NULL,NULL,'12','0.1004',NULL,'2017-06-16 14:43:15'),(103,'10000899','50ETF购12月2500',1,NULL,NULL,NULL,'12','0.0809',NULL,'2017-06-16 14:43:28'),(104,'10000915','50ETF购12月2550',1,NULL,NULL,NULL,'12','0.0628',NULL,'2017-06-16 14:43:44'),(105,'10000923','50ETF购12月2600',1,NULL,NULL,NULL,'12','0.0485',NULL,'2017-06-16 14:44:05');
/*!40000 ALTER TABLE `refer_qiquan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-16 18:32:18
