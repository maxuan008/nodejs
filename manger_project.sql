-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='项目表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mg_project`
--

LOCK TABLES `mg_project` WRITE;
/*!40000 ALTER TABLE `mg_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `mg_project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-30 14:20:37

--
-- Table structure for table `mg_role`
--

DROP TABLE IF EXISTS `mg_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色主键ID',
  `pid` int(11) NOT NULL  COMMENT '项目外键ID',
  `role_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名',

  
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色';



DROP TABLE IF EXISTS `mg_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_fun` (
  `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '功能主键ID',
  `pid` int(11) NOT NULL  COMMENT '项目外键ID',
  `fun_name` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '功能名',
  `docname` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '程序文件名',
  `url` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '模块链接', 
  `ishavedomain` varchar(1) COLLATE utf8_bin DEFAULT '0' NULL COMMENT '模块链接是否包含主域名,1包含0不包含',    
  
  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='功能模块';


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户';



DROP TABLE IF EXISTS `mg_role_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role_fun` (
  `rolefunid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色功能主键ID',
  `pid` int(11) NOT NULL  COMMENT '项目外键ID',
  `rid` int(11) NOT NULL  COMMENT '角色外键ID',
  `fid` int(11) NOT NULL  COMMENT '功能外键ID',

  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`rolefunid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色功能关系';


DROP TABLE IF EXISTS `mg_role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_role_user` (
  `roleuserid` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色用户主键ID',
  `pid` int(11) NOT NULL  COMMENT '项目外键ID',
  `rid` int(11) NOT NULL  COMMENT '角色外键ID',
  `uid` int(11) NOT NULL  COMMENT '用户外键ID',

  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`roleuserid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色用户关系';



DROP TABLE IF EXISTS `mg_user_fun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mg_user_fun` (
  `userfunid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户功能主键ID',
  `pid` int(11) NOT NULL  COMMENT '项目外键ID',
  `uid` int(11) NOT NULL  COMMENT '用户外键ID',
  `fid` int(11) NOT NULL  COMMENT '功能外键ID',

  `isvalid` varchar(1) COLLATE utf8_bin DEFAULT '1' COMMENT '是否有效: 0无效, 1有效',
  `remark` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `updater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `update_time` datetime(6) DEFAULT NULL,
  `creater` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `creater_time` varchar(6) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`userfunid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='角色功能关系';




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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='设计者';



