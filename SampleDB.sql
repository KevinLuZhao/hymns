CREATE DATABASE  IF NOT EXISTS `hymns` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `hymns`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: localhost    Database: hymns
-- ------------------------------------------------------
-- Server version	5.6.41-log

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
-- Table structure for table `category_list`
--

DROP TABLE IF EXISTS `category_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_list` (
  `id` int(11) NOT NULL,
  `NameEN` varchar(45) NOT NULL,
  `NameCN` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_list`
--

LOCK TABLES `category_list` WRITE;
/*!40000 ALTER TABLE `category_list` DISABLE KEYS */;
INSERT INTO `category_list` VALUES (1,'Hymnary Songs','圣徒诗歌'),(2,'Family Songs','家庭诗歌'),(3,'Short Choruses','短诗歌');
/*!40000 ALTER TABLE `category_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_content`
--

DROP TABLE IF EXISTS `song_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `song_code` varchar(10) NOT NULL,
  `chapter` int(11) NOT NULL,
  `type` varchar(6) NOT NULL,
  `row_num` int(11) NOT NULL,
  `content_cn` varchar(200) DEFAULT NULL,
  `content_en` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_content`
--

LOCK TABLES `song_content` WRITE;
/*!40000 ALTER TABLE `song_content` DISABLE KEYS */;
INSERT INTO `song_content` VALUES (1,'H325',1,'Chorus',1,'榮耀之光福樂之光','O there’s sunshine, blessed sunshine,'),(2,'H325',1,'Chorus',2,'當我平安喜樂在主前','While the peaceful, happy moments roll;'),(3,'H325',1,'Chorus',3,'當主向我顯現衪笑臉','When Jesus shows His smiling face,'),(4,'H325',1,'Chorus',4,'是有光在我魂間','There is sunshine in my soul.'),(5,'H325',1,'Verse',1,'在我魂間，今天有陽光，','There is sunshine in my soul today,'),(6,'H325',1,'Verse',2,'遠勝世界太陽–','More glorious and bright,'),(7,'H325',1,'Verse',3,'更為榮耀、新鮮而輝煌，','Than glows in any earthly sky,'),(8,'H325',1,'Verse',4,'因主就是這光。','For Jesus is my light.'),(9,'H325',2,'Chorus',1,'榮耀之光福樂之光','O there’s sunshine, blessed sunshine,'),(10,'H325',2,'Chorus',2,'當我平安喜樂在主前','While the peaceful, happy moments roll;'),(11,'H325',2,'Chorus',3,'當主向我顯現衪笑臉','When Jesus shows His smiling face,'),(12,'H325',2,'Chorus',4,'是有光在我魂間','There is sunshine in my soul.'),(13,'H325',2,'Verse',1,'在我魂間，今天有音樂，','There is music in my soul today,'),(14,'H325',2,'Verse',2,'頌讚我主不止；','A carol to my King;'),(15,'H325',2,'Verse',3,'主在聽著，因衪能了解','And Jesus, listening, can hear'),(16,'H325',2,'Verse',4,'我唱不出的詩。','The songs I cannot sing.'),(17,'H325',3,'Chorus',1,'榮耀之光福樂之光','O there’s sunshine, blessed sunshine,'),(18,'H325',3,'Chorus',2,'當我平安喜樂在主前','While the peaceful, happy moments roll;'),(19,'H325',3,'Chorus',3,'當主向我顯現衪笑臉','When Jesus shows His smiling face,'),(20,'H325',3,'Chorus',4,'是有光在我魂間','There is sunshine in my soul.'),(21,'H325',3,'Verse',1,'在我魂間，今天有春天，','There is springtime in my soul today,'),(22,'H325',3,'Verse',2,'因主與我相愛；','For when the Lord is near,'),(23,'H325',3,'Verse',3,'平安之鴿吟詠在裏面，','The dove of peace sings in my heart,'),(24,'H325',3,'Verse',4,'恩典開花在外。','The flow’rs of grace appear.'),(25,'H325',4,'Chorus',1,'榮耀之光福樂之光','O there’s sunshine, blessed sunshine,'),(26,'H325',4,'Chorus',2,'當我平安喜樂在主前','While the peaceful, happy moments roll;'),(27,'H325',4,'Chorus',3,'當主向我顯現衪笑臉','When Jesus shows His smiling face,'),(28,'H325',4,'Chorus',4,'是有光在我魂間','There is sunshine in my soul.'),(29,'H325',4,'Verse',1,'在我魂間，今天有喜樂，','There is gladness in my soul today,'),(30,'H325',4,'Verse',2,'希望、讚美和愛；','And hope, and praise, and love,'),(31,'H325',4,'Verse',3,'因為現在衪賜我聯合，','For blessings which He gives me now,'),(32,'H325',4,'Verse',4,'將來賜我賞賚。','For joys laid up above.'),(51,'H1',1,'Verse',1,'榮耀歸與至高神！榮耀歸神！榮耀歸神！','Glory to God in the highest! Glory to God! Glory to God!'),(52,'H1',1,'Verse',2,'榮耀歸與至高神！榮耀歸神！榮耀歸神！','Glory to God in the highest! Glory to God! Glory to God!'),(53,'H1',1,'Verse',3,'榮耀歸與至高神！讚美讚美不盡。','Glory to God in the highest! Praise Him forevermore.'),(54,'H1',1,'Verse',4,'榮耀歸與至高神！讚美讚美不盡。','Glory to God in the highest! Praise Him forevermore.'),(55,'H1',1,'Verse',5,'讚美真神萬福源頭﹐','Praise Him from whom all blessings flow;'),(56,'H1',1,'Verse',6,'讚美真神萬福源頭﹐','Praise Him from whom all blessings flow;'),(57,'H1',1,'Verse',7,'天下萬有讚祂不休﹐','Praise Him all creatures here below;'),(58,'H1',1,'Verse',8,'天下萬有讚祂不休﹐','Praise Him all creatures here below;'),(59,'H1',1,'Verse',9,'天上眾軍和聲響應﹕','Praise Him above ye heav\'nly hosts;'),(60,'H1',1,'Verse',10,'天上眾軍和聲響應﹕','Praise Him above ye heav\'nly hosts;'),(61,'H1',1,'Verse',11,'讚美聖父、聖子、聖靈。','Praise Father, Son, and Holy Ghost.'),(62,'H1',1,'Verse',12,'讚美聖父、聖子、聖靈。','Praise Father, Son, and Holy Ghost.'),(63,'H1',1,'Verse',13,'榮耀歸與至高神！榮耀歸與至高神！','Glory to God in the highest! Glory to God in the highest!'),(64,'H1',1,'Verse',14,'榮耀歸與至高神！榮耀歸與至高神！','Glory to God in the highest! Glory to God in the highest!'),(65,'H1',1,'Verse',15,'榮耀﹐榮耀﹐榮耀﹐榮耀﹐榮耀歸與至高神！','Glory, glory, glory, glory, glory to God in the highest!'),(66,'H1',1,'Verse',16,'榮耀﹐榮耀﹐榮耀﹐榮耀﹐榮耀歸與至高神！','Glory, glory, glory, glory, glory to God in the highest!'),(67,'H1',1,'Verse',17,'榮耀﹐榮耀﹐榮耀﹐榮耀﹐榮耀歸與至高神！','Glory, glory, glory, glory, glory to God in the highest!'),(68,'H1',1,'Verse',18,'榮耀﹐榮耀﹐榮耀﹐榮耀﹐榮耀歸與至高神！','Glory, glory, glory, glory, glory to God in the highest!'),(69,'H370',1,'Verse',1,'“父阿，是的！”偉大得勝，父神旨意何等寶貝！',NULL),(70,'H370',1,'Verse',2,'雖為兒子，仍學順從，親手接過祂賜苦杯。',NULL),(71,'H370',1,'Verse',3,'因愛無比飲之如飴，纔知入口滴滴甘美；',NULL),(72,'H370',1,'Verse',4,'雖然我眼難免流淚，我心充滿何等安慰。',NULL),(73,'H370',2,'Verse',1,'“父阿，是的！”何等順服，我心安歇一無怨懟！',NULL),(74,'H370',2,'Verse',2,'親人友朋儘可背離，仇敵逼攻無處逃圍。',NULL),(75,'H370',2,'Verse',3,'救主榮光忽然降臨，有祂同行我心高興；',NULL),(76,'H370',2,'Verse',4,'甜美的愛激勵深沉，難忍壓力消蹤失影。',NULL),(77,'H370',3,'Verse',1,'“父阿，是的！”無比權能，凡祂所許充滿恩惠！',NULL),(78,'H370',3,'Verse',2,'試煉的火雖加七倍，救主能力更無窮盡。',NULL),(79,'H370',3,'Verse',3,'壓迫續增傾逼我身，不過使我更親我神；',NULL),(80,'H370',3,'Verse',4,'忽然我靈向天歡吟，黑暗環境大放光明。',NULL),(81,'H370',4,'Verse',1,'“父阿，是的！”神聖宣明，父手所量沉重福分！',NULL),(82,'H370',4,'Verse',2,'救主呼召充滿我心，“學我樣式效我生命。”',NULL),(83,'H370',4,'Verse',3,'我心慕祂溫柔低微，服主軛下隨主蹤影；',NULL),(84,'H370',4,'Verse',4,'諸天安息心中輝映，當我與主同奔天程。',NULL),(85,'S26',1,'Verse',1,NULL,'Only a boy named David,Only a little sling,'),(86,'S26',1,'Verse',2,NULL,'Only a boy named David,but he could pray and sing'),(87,'S26',1,'Verse',3,NULL,'Only a boy named David,Only a rippling brook.'),(88,'S26',1,'Verse',4,NULL,'Only a boy named David,but five little stones he took'),(89,'S26',1,'Verse',5,NULL,'And one little stone went into the sling'),(90,'S26',1,'Verse',6,NULL,'And the sling went round and round'),(91,'S26',1,'Verse',7,NULL,'And one little stone went into the sling'),(92,'S26',1,'Verse',8,NULL,'And the sling went round and round'),(93,'S26',1,'Verse',9,NULL,'And round, and round, and round, and round'),(94,'S26',1,'Verse',10,NULL,'and round, and round, and round'),(95,'S26',1,'Verse',11,NULL,'And one little stone went up in the air'),(96,'S26',1,'Verse',12,NULL,'And the giant came tumbling down');
/*!40000 ALTER TABLE `song_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_list`
--

DROP TABLE IF EXISTS `song_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `song_code` varchar(10) NOT NULL,
  `category_id` int(11) NOT NULL,
  `TitleCN` varchar(200) DEFAULT NULL,
  `TitleEN` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `song_code_UNIQUE` (`song_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_list`
--

LOCK TABLES `song_list` WRITE;
/*!40000 ALTER TABLE `song_list` DISABLE KEYS */;
INSERT INTO `song_list` VALUES (1,'H325',1,'在我魂間，今天有陽光','SUNSHINE IN MY SOUL'),(2,'H1',1,'榮耀歸與至高神','GLORY TO GOD IN THE HIGHEST'),(3,'H370',1,'父阿是的',NULL),(4,'S26',3,NULL,'Only a Boy Named David');
/*!40000 ALTER TABLE `song_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-29 22:46:18
