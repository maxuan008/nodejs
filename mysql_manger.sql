-- MySQL dump 10.13  Distrib 5.7.11, for Win32 (AMD64)
--
-- Host: localhost    Database: manger
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
-- Table structure for table `mg_designer`
--

DROP TABLE IF EXISTS `mg_designer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_designer` (
  `did` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键ID',
  `username` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `password` varchar(80) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `fullname` varchar(35) COLLATE utf8_bin DEFAULT NULL COMMENT '全名',
  `email` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '邮件',
  `tel` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '电话',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`did`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='设计者';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_designer`
--

LOCK TABLES `mg_designer` WRITE;
/*!40000 ALTER TABLE `mg_designer` DISABLE KEYS */;
INSERT INTO `mg_designer` VALUES (1,'maxuan','hzOXrUufzC3EsneOD8JOqQ==','马旋',NULL,NULL,'1',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `mg_designer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_fun`
--

DROP TABLE IF EXISTS `mg_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_fun` (
  `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '功能主键ID',
  `pid` int(11) NOT NULL COMMENT '项目外键ID',
  `fun_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '功能名',
  `docname` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '程序文件名',
  `url` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '模块链接',
  `ishavedomain` varchar(1) COLLATE utf8_bin DEFAULT '0' COMMENT '模块链接是否包含主域名,1包含0不包含',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='功能模块';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_fun`
--

LOCK TABLES `mg_fun` WRITE;
/*!40000 ALTER TABLE `mg_fun` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_fun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_project`
--

DROP TABLE IF EXISTS `mg_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_project` (
  `pid` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目主键ID',
  `prj_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '项目名',
  `port` varchar(15) COLLATE utf8_bin DEFAULT NULL COMMENT '端口',
  `domain_url` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='项目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_project`
--

LOCK TABLES `mg_project` WRITE;
/*!40000 ALTER TABLE `mg_project` DISABLE KEYS */;
INSERT INTO `mg_project` VALUES (15,'证券投资','1199',NULL,'1',NULL,NULL,NULL,'1',NULL),(16,'物联网','1133',NULL,'1',NULL,NULL,NULL,'1',NULL),(17,'信用卡管理','1177',NULL,'1',NULL,NULL,NULL,'1',NULL);
/*!40000 ALTER TABLE `mg_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_role`
--

DROP TABLE IF EXISTS `mg_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色主键ID',
  `pid` int(11) NOT NULL COMMENT '项目外键ID',
  `role_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_role`
--

LOCK TABLES `mg_role` WRITE;
/*!40000 ALTER TABLE `mg_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_role_fun`
--

DROP TABLE IF EXISTS `mg_role_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role_fun` (
  `rolefunid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色功能主键ID',
  `pid` int(11) NOT NULL COMMENT '项目外键ID',
  `rid` int(11) NOT NULL COMMENT '角色外键ID',
  `fid` int(11) NOT NULL COMMENT '功能外键ID',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(1) COLLATE utf8_bin DEFAULT '0' COMMENT '''0:未启用 , 1:启用''',
  PRIMARY KEY (`rolefunid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色功能关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_role_fun`
--

LOCK TABLES `mg_role_fun` WRITE;
/*!40000 ALTER TABLE `mg_role_fun` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_role_fun` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_role_user`
--

DROP TABLE IF EXISTS `mg_role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role_user` (
  `roleuserid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色用户主键ID',
  `pid` int(11) NOT NULL COMMENT '项目外键ID',
  `rid` int(11) NOT NULL COMMENT '角色外键ID',
  `uid` int(11) NOT NULL COMMENT '用户外键ID',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`roleuserid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色用户关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_role_user`
--

LOCK TABLES `mg_role_user` WRITE;
/*!40000 ALTER TABLE `mg_role_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_user`
--

DROP TABLE IF EXISTS `mg_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户主键ID',
  `username` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名',
  `password` varchar(80) COLLATE utf8_bin DEFAULT NULL COMMENT '密码',
  `fullname` varchar(35) COLLATE utf8_bin DEFAULT NULL COMMENT '全名',
  `email` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '邮件',
  `tel` varchar(30) COLLATE utf8_bin DEFAULT NULL COMMENT '电话',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_user`
--

LOCK TABLES `mg_user` WRITE;
/*!40000 ALTER TABLE `mg_user` DISABLE KEYS */;
INSERT INTO `mg_user` VALUES (1,'aaa','ICy5YqxZB1uWSwcVLSNLcA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(2,'bbb','ICy5YqxZB1uWSwcVLSNLcA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(3,'ccc','ICy5YqxZB1uWSwcVLSNLcA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(4,'ddd','xMpCOKC5I4INzFCab3WEmw==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(8,'ggg','xMpCOKC5I4INzFCab3WEmw==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(9,'efsf','xMpCOKC5I4INzFCab3WEmw==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(10,'rr','NpEwjypML2mD8ogNMuKchA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(11,'erew','IsJ2oFqnyQVmriF1vMKpsA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(12,'sdf','1LJ1jaAgXB4KqVEs0YgAKg==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(13,'ffds','gDVQc0gFlKmUcNyszNjPLA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(14,'wefd','A2qcXIw8R2zUmcEr41K6XA==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(15,'eee','0vIpfW6CnNNJOqfeRBahjw==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL),(16,'qqq','ZRK9Q9nKpuAsmQsKgmUtyg==',NULL,NULL,NULL,'1',NULL,NULL,NULL,'1',NULL);
/*!40000 ALTER TABLE `mg_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mg_user_fun`
--

DROP TABLE IF EXISTS `mg_user_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_user_fun` (
  `userfunid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户功能主键ID',
  `pid` int(11) NOT NULL COMMENT '项目外键ID',
  `uid` int(11) NOT NULL COMMENT '用户外键ID',
  `fid` int(11) NOT NULL COMMENT '功能外键ID',
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`userfunid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色功能关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_user_fun`
--

LOCK TABLES `mg_user_fun` WRITE;
/*!40000 ALTER TABLE `mg_user_fun` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_user_fun` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-24 17:53:26
