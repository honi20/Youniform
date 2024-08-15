-- MariaDB dump 10.19-11.3.2-MariaDB, for osx10.19 (x86_64)
--
-- Host: i11a308.p.ssafy.io    Database: S11P13A308
-- ------------------------------------------------------
-- Server version	11.4.3-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alert`
--

DROP TABLE IF EXISTS `alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alert` (
  `is_read` bit(1) NOT NULL DEFAULT b'0',
  `alert_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `pk` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `type` enum('ANNOUNCEMENT','CLEAN_SWEEP','FRIEND_ACCEPTANCE','FRIEND_REQUEST','PLAYER_APPEARANCE','POST_COMMENT') NOT NULL,
  PRIMARY KEY (`alert_id`),
  KEY `FK7ww7bkskbo300vr1cmhkas9t6` (`receiver_id`),
  KEY `FK3b7tkx60s6ytmjnkg25wwxht7` (`sender_id`),
  CONSTRAINT `FK3b7tkx60s6ytmjnkg25wwxht7` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK7ww7bkskbo300vr1cmhkas9t6` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alert`
--

LOCK TABLES `alert` WRITE;
/*!40000 ALTER TABLE `alert` DISABLE KEYS */;
INSERT INTO `alert` VALUES
('',123,'2024-07-31 16:47:20.394415',NULL,123,124,'','FRIEND_REQUEST'),
('',124,'2024-07-31 21:50:20.394415',1,123,124,'최강 몬스터즈 우승','POST_COMMENT'),
('',125,'2024-08-01 11:23:20.394415',NULL,123,124,'','FRIEND_REQUEST'),
('',126,'2024-08-03 20:47:20.394415',1,123,124,'대호 이번주 홈런 침','POST_COMMENT'),
('',127,'2024-08-05 11:23:20.394415',1,124,123,'하이하이','POST_COMMENT'),
('\0',129,'2024-08-16 00:11:31.260102',NULL,126,127,NULL,'FRIEND_ACCEPTANCE'),
('\0',130,'2024-08-16 00:11:31.269158',NULL,127,126,NULL,'FRIEND_ACCEPTANCE');
/*!40000 ALTER TABLE `alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_part`
--

DROP TABLE IF EXISTS `chat_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_part` (
  `last_read_time` datetime(6) DEFAULT NULL,
  `room_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`room_id`,`user_id`),
  KEY `FKgj6pr2hyr1cny96xsurjhmc57` (`user_id`),
  CONSTRAINT `FK7ra86oojh7muw9sj59i0suca` FOREIGN KEY (`room_id`) REFERENCES `chat_room` (`room_id`),
  CONSTRAINT `FKgj6pr2hyr1cny96xsurjhmc57` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_part`
--

LOCK TABLES `chat_part` WRITE;
/*!40000 ALTER TABLE `chat_part` DISABLE KEYS */;
INSERT INTO `chat_part` VALUES
('2024-08-15 23:54:19.973252',1,126),
('2024-08-16 00:20:13.498087',1,128),
('2024-08-15 23:54:47.290943',2,126),
('2024-08-16 00:20:13.502900',2,128),
('2024-08-15 14:27:42.000000',3,123),
('2024-08-15 23:54:48.462773',3,126),
('2024-08-16 00:20:13.506462',3,128),
('2024-08-15 14:27:42.000000',4,123),
('2024-08-16 00:21:24.579499',4,127),
('2024-08-16 00:26:11.362694',7,127),
('2024-08-15 14:27:42.000000',9,123),
('2024-08-16 00:21:26.341934',10,127),
('2024-08-15 23:29:48.590557',1000,125),
('2024-08-15 23:54:52.038336',1000,126),
('2024-08-16 00:20:40.875092',1000,127),
('2024-08-16 00:20:13.508459',1000,128),
('2024-08-16 00:29:19.772769',1000,129);
/*!40000 ALTER TABLE `chat_part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `room_state` bit(1) DEFAULT NULL,
  `room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES
('',1,'김문호 응원방'),
('',2,'정근우 응원방'),
('',3,'박용택 응원방'),
('',4,'이대호 응원방'),
('',5,'정의윤 응원방'),
('',6,'최수현 응원방'),
('',7,'박재욱 응원방'),
('',8,'정성훈 응원방'),
('',9,'유태웅 응원방'),
('',10,'문교원 응원방'),
('',11,'임상우 응원방'),
('',12,'윤상혁 응원방'),
('',13,'이대은 응원방'),
('',14,'신재영 응원방'),
('',15,'오주원 응원방'),
('',16,'유희관 응원방'),
('',17,'장원삼 응원방'),
('',18,'니퍼트 응원방'),
('',19,'송승준 응원방'),
('',1000,'몬스터즈 응원방');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cheering_song`
--

DROP TABLE IF EXISTS `cheering_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cheering_song` (
  `player_id` bigint(20) DEFAULT NULL,
  `song_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lyrics` varchar(1000) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('APPEARANCE','CHEERING') DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `FK3pnxrb273e2fnuwd3n5lu7o73` (`player_id`),
  CONSTRAINT `FK3pnxrb273e2fnuwd3n5lu7o73` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheering_song`
--

LOCK TABLES `cheering_song` WRITE;
/*!40000 ALTER TABLE `cheering_song` DISABLE KEYS */;
INSERT INTO `cheering_song` VALUES
(4,1,'오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~ 오오 오오오오~<br>오~ 롯데 이대호~ 오오~ 롯데 이대호~ 오<br>오~ 롯데 이대호~ 롯데 이대호~ 롯데 이대호~','https://youtu.be/oO0NQUNa_RE?si=XvR3MQfOqhegKlDX&t=422','롯데 이대호','APPEARANCE'),
(4,2,'홈!런! 이!대!호!<br>홈!런! 이!대!호!','https://youtu.be/oO0NQUNa_RE?si=5dC__YrewLXfZ5lq&t=455','홈런 이대호','CHEERING'),
(3,3,'왜 내 눈 앞에 나타나~ (박!용!택!)<br>왜 네가 자꾸 나타나~(박!용!택!)Mbr>두 눈을 감고 누우면<br>왜 네 얼굴이 떠올라(L!G~ 박!용!택!)','https://youtu.be/YZBZ_XeBNCc?si=sPb9YScja3fjThmG','나타나','APPEARANCE'),
(3,4,'무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오<br>무적 L(L!)G(G!) 박용택!<br>오오 오오오오 오오 오오오오오','https://youtu.be/YZBZ_XeBNCc?si=vbGa2mv5RMqb2X6C&t=21','무적 LG 박용택','CHEERING'),
(9,5,'유!태!웅! 날려버려~<br>유!태!웅! 날려버려~',NULL,'유태웅 응원가','CHEERING');
/*!40000 ALTER TABLE `cheering_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FKqm52p1v3o13hy268he0wcngr5` (`user_id`),
  CONSTRAINT `FKqm52p1v3o13hy268he0wcngr5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES
(1,'2024-08-15 12:27:43.000000',1,NULL,123,'멋져요'),
(2,'2024-08-15 13:27:43.000000',1,'2024-08-15 14:22:43.000000',124,'응원합니다');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary` (
  `diary_date` date DEFAULT NULL,
  `diary_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stamp_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `scope` enum('ALL','FRIENDS','PRIVATE') DEFAULT NULL,
  PRIMARY KEY (`diary_id`),
  KEY `FKqghx1w3kn5wdufc2buyg4ddvh` (`stamp_id`),
  KEY `FK74rd0bn5raxejw2ukenelbdmt` (`user_id`),
  CONSTRAINT `FK74rd0bn5raxejw2ukenelbdmt` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKqghx1w3kn5wdufc2buyg4ddvh` FOREIGN KEY (`stamp_id`) REFERENCES `diary_stamp` (`stamp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
INSERT INTO `diary` VALUES
('2024-07-31',123,1,123,'diary1','FRIENDS'),
('2024-07-01',124,1,123,'diary2','ALL'),
('2024-07-12',125,1,123,'diary3','PRIVATE'),
('2024-08-01',126,1,124,'diary4','ALL'),
('2024-08-01',134,1,127,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_14_19.png','ALL'),
('2024-08-16',135,1,128,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_24_46.png','ALL'),
('2024-08-16',136,1,125,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_39_55.png','ALL'),
('2024-08-12',137,1,125,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_28_06.png','ALL'),
('2024-08-08',138,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_29_56.png','ALL'),
('2024-08-15',139,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_31_31.png','ALL'),
('2024-08-20',140,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_31_52.png','ALL'),
('2024-08-12',141,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_32_24.png','ALL'),
('2024-08-18',142,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_32_52.png','ALL'),
('2024-08-15',143,1,128,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_33_08.png','ALL'),
('2024-08-16',144,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_35_18.png','ALL'),
('2024-08-17',145,1,129,'https://dsfjel9nvktdp.cloudfront.net/diary/upload_2024-08-16_00_35_35.png','ALL');
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_resource`
--

DROP TABLE IF EXISTS `diary_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_resource` (
  `resource_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  `category` enum('BASEBALL','BLACK','BLUE','CUTE','GRAY','GREEN','LETTER','NONE','ORANGE','PURPLE','RED','RETRO','WHITE','YELLOW') DEFAULT NULL,
  `type` enum('BACKGROUND','STICKER','THEME') DEFAULT NULL,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=399 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_resource`
--

LOCK TABLES `diary_resource` WRITE;
/*!40000 ALTER TABLE `diary_resource` DISABLE KEYS */;
INSERT INTO `diary_resource` VALUES
(1,'https://dsfjel9nvktdp.cloudfront.net/background/white/white.png','WHITE','BACKGROUND'),
(2,'https://dsfjel9nvktdp.cloudfront.net/background/white/grid_white.png','WHITE','BACKGROUND'),
(3,'https://dsfjel9nvktdp.cloudfront.net/background/white/paper_white.png','WHITE','BACKGROUND'),
(4,'https://dsfjel9nvktdp.cloudfront.net/background/white/daily_white.png','WHITE','BACKGROUND'),
(5,'https://dsfjel9nvktdp.cloudfront.net/background/white/baseball_white.png','WHITE','BACKGROUND'),
(6,'https://dsfjel9nvktdp.cloudfront.net/background/white/retro_white.png','WHITE','BACKGROUND'),
(7,'https://dsfjel9nvktdp.cloudfront.net/background/gray/gray.png','GRAY','BACKGROUND'),
(8,'https://dsfjel9nvktdp.cloudfront.net/background/gray/grid_gray.png','GRAY','BACKGROUND'),
(9,'https://dsfjel9nvktdp.cloudfront.net/background/gray/paper_gray.png','GRAY','BACKGROUND'),
(10,'https://dsfjel9nvktdp.cloudfront.net/background/gray/daily_gray.png','GRAY','BACKGROUND'),
(11,'https://dsfjel9nvktdp.cloudfront.net/background/gray/baseball_gray.png','GRAY','BACKGROUND'),
(12,'https://dsfjel9nvktdp.cloudfront.net/background/gray/retro_gray.png','GRAY','BACKGROUND'),
(13,'https://dsfjel9nvktdp.cloudfront.net/background/pink/pink.png','RED','BACKGROUND'),
(14,'https://dsfjel9nvktdp.cloudfront.net/background/pink/grid_pink.png','RED','BACKGROUND'),
(15,'https://dsfjel9nvktdp.cloudfront.net/background/pink/paper_pink.png','RED','BACKGROUND'),
(16,'https://dsfjel9nvktdp.cloudfront.net/background/pink/daily_pink.png','RED','BACKGROUND'),
(17,'https://dsfjel9nvktdp.cloudfront.net/background/pink/baseball_pink.png','RED','BACKGROUND'),
(18,'https://dsfjel9nvktdp.cloudfront.net/background/pink/retro_pink.png','RED','BACKGROUND'),
(19,'https://dsfjel9nvktdp.cloudfront.net/background/orange/orange.png','ORANGE','BACKGROUND'),
(20,'https://dsfjel9nvktdp.cloudfront.net/background/orange/grid_orange.png','ORANGE','BACKGROUND'),
(21,'https://dsfjel9nvktdp.cloudfront.net/background/orange/paper_orange.png','ORANGE','BACKGROUND'),
(22,'https://dsfjel9nvktdp.cloudfront.net/background/orange/daily_orange.png','ORANGE','BACKGROUND'),
(23,'https://dsfjel9nvktdp.cloudfront.net/background/orange/baseball_orange.png','ORANGE','BACKGROUND'),
(24,'https://dsfjel9nvktdp.cloudfront.net/background/orange/retro_orange.png','ORANGE','BACKGROUND'),
(25,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/yellow.png','YELLOW','BACKGROUND'),
(26,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/grid_yellow.png','YELLOW','BACKGROUND'),
(27,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/paper_yellow.png','YELLOW','BACKGROUND'),
(28,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/daily_yellow.png','YELLOW','BACKGROUND'),
(29,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/baseball_yellow.png','YELLOW','BACKGROUND'),
(30,'https://dsfjel9nvktdp.cloudfront.net/background/yellow/retro_yellow.png','YELLOW','BACKGROUND'),
(31,'https://dsfjel9nvktdp.cloudfront.net/background/green/green.png','GREEN','BACKGROUND'),
(32,'https://dsfjel9nvktdp.cloudfront.net/background/green/grid_green.png','GREEN','BACKGROUND'),
(33,'https://dsfjel9nvktdp.cloudfront.net/background/green/paper_green.png','GREEN','BACKGROUND'),
(34,'https://dsfjel9nvktdp.cloudfront.net/background/green/daily_green.png','GREEN','BACKGROUND'),
(35,'https://dsfjel9nvktdp.cloudfront.net/background/green/baseball_green.png','GREEN','BACKGROUND'),
(36,'https://dsfjel9nvktdp.cloudfront.net/background/green/retro_green.png','GREEN','BACKGROUND'),
(37,'https://dsfjel9nvktdp.cloudfront.net/background/blue/blue.png','BLUE','BACKGROUND'),
(38,'https://dsfjel9nvktdp.cloudfront.net/background/blue/grid_blue.png','BLUE','BACKGROUND'),
(39,'https://dsfjel9nvktdp.cloudfront.net/background/blue/paper_blue.png','BLUE','BACKGROUND'),
(40,'https://dsfjel9nvktdp.cloudfront.net/background/blue/daily_blue.png','BLUE','BACKGROUND'),
(41,'https://dsfjel9nvktdp.cloudfront.net/background/blue/baseball_blue.png','BLUE','BACKGROUND'),
(42,'https://dsfjel9nvktdp.cloudfront.net/background/blue/retro_blue.png','BLUE','BACKGROUND'),
(43,'https://dsfjel9nvktdp.cloudfront.net/background/purple/purple.png','PURPLE','BACKGROUND'),
(44,'https://dsfjel9nvktdp.cloudfront.net/background/purple/grid_purple.png','PURPLE','BACKGROUND'),
(45,'https://dsfjel9nvktdp.cloudfront.net/background/purple/paper_purple.png','PURPLE','BACKGROUND'),
(46,'https://dsfjel9nvktdp.cloudfront.net/background/purple/daily_purple.png','PURPLE','BACKGROUND'),
(47,'https://dsfjel9nvktdp.cloudfront.net/background/purple/baseball_purple.png','PURPLE','BACKGROUND'),
(48,'https://dsfjel9nvktdp.cloudfront.net/background/purple/retro_purple.png','PURPLE','BACKGROUND'),
(49,'https://dsfjel9nvktdp.cloudfront.net/background/black/black.png','BLACK','BACKGROUND'),
(50,'https://dsfjel9nvktdp.cloudfront.net/background/black/grid_black.png','BLACK','BACKGROUND'),
(51,'https://dsfjel9nvktdp.cloudfront.net/background/black/paper_black.png','BLACK','BACKGROUND'),
(52,'https://dsfjel9nvktdp.cloudfront.net/background/black/daily_black.png','BLACK','BACKGROUND'),
(53,'https://dsfjel9nvktdp.cloudfront.net/background/black/baseball_black.png','BLACK','BACKGROUND'),
(54,'https://dsfjel9nvktdp.cloudfront.net/background/black/retro_black.png','BLACK','BACKGROUND'),
(55,'theme_1.png','NONE','THEME'),
(56,'theme_2.png','NONE','THEME'),
(57,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/monsters.png','BASEBALL','STICKER'),
(58,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball.png','BASEBALL','STICKER'),
(59,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/bat.png','BASEBALL','STICKER'),
(60,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/bat2.png','BASEBALL','STICKER'),
(61,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/glove.png','BASEBALL','STICKER'),
(62,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/hat.png','BASEBALL','STICKER'),
(63,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/price.png','BASEBALL','STICKER'),
(64,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/winner.png','BASEBALL','STICKER'),
(65,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/doosan.png','BASEBALL','STICKER'),
(66,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/hanhwa.png','BASEBALL','STICKER'),
(67,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/kia.png','BASEBALL','STICKER'),
(68,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/kt.png','BASEBALL','STICKER'),
(69,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/lotte.png','BASEBALL','STICKER'),
(70,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/nc.png','BASEBALL','STICKER'),
(71,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/samsung.png','BASEBALL','STICKER'),
(72,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/candy.png','RETRO','STICKER'),
(73,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/cat.png','RETRO','STICKER'),
(74,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/glass.png','RETRO','STICKER'),
(75,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/good.png','RETRO','STICKER'),
(76,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/heart.png','RETRO','STICKER'),
(77,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/icecream1.png','RETRO','STICKER'),
(78,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/icecream2.png','RETRO','STICKER'),
(79,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/note1.png','RETRO','STICKER'),
(80,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/note2.png','RETRO','STICKER'),
(81,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/ribbon.png','RETRO','STICKER'),
(82,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/star.png','RETRO','STICKER'),
(83,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/watermelon.png','RETRO','STICKER'),
(84,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_1.png','RETRO','STICKER'),
(85,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_2.png','RETRO','STICKER'),
(86,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_3.png','RETRO','STICKER'),
(87,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_4.png','RETRO','STICKER'),
(88,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_5.png','RETRO','STICKER'),
(89,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_6.png','RETRO','STICKER'),
(90,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_7.png','RETRO','STICKER'),
(91,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_8.png','RETRO','STICKER'),
(92,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_9.png','RETRO','STICKER'),
(93,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_heart_10.png','RETRO','STICKER'),
(94,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_1.png','RETRO','STICKER'),
(95,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_2.png','RETRO','STICKER'),
(96,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_3.png','RETRO','STICKER'),
(97,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_4.png','RETRO','STICKER'),
(98,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_5.png','RETRO','STICKER'),
(99,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_6.png','RETRO','STICKER'),
(100,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_7.png','RETRO','STICKER'),
(101,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_8.png','RETRO','STICKER'),
(102,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_9.png','RETRO','STICKER'),
(103,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_face_10.png','RETRO','STICKER'),
(104,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_1.png','RETRO','STICKER'),
(105,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_2.png','RETRO','STICKER'),
(106,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_3.png','RETRO','STICKER'),
(107,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_4.png','RETRO','STICKER'),
(108,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_5.png','RETRO','STICKER'),
(109,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_6.png','RETRO','STICKER'),
(110,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_7.png','RETRO','STICKER'),
(111,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_8.png','RETRO','STICKER'),
(112,'https://dsfjel9nvktdp.cloudfront.net/sticker/retro/bubble_9.png','RETRO','STICKER'),
(113,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/monday.png','CUTE','STICKER'),
(114,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/tuesday.png','CUTE','STICKER'),
(115,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/wednesday.png','CUTE','STICKER'),
(116,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/thursday.png','CUTE','STICKER'),
(117,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/friday.png','CUTE','STICKER'),
(118,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/saturday.png','CUTE','STICKER'),
(119,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/sunday.png','CUTE','STICKER'),
(120,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check.png','CUTE','STICKER'),
(121,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check1.png','CUTE','STICKER'),
(122,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check2.png','CUTE','STICKER'),
(123,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check3.png','CUTE','STICKER'),
(124,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check4.png','CUTE','STICKER'),
(125,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check_no','CUTE','STICKER'),
(126,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/check_ok','CUTE','STICKER'),
(127,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/clip.png','CUTE','STICKER'),
(128,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cloudy.png','CUTE','STICKER'),
(129,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/face1.png','CUTE','STICKER'),
(130,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/face2.png','CUTE','STICKER'),
(131,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/face3.png','CUTE','STICKER'),
(132,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/face4.png','CUTE','STICKER'),
(133,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/face5.png','CUTE','STICKER'),
(134,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/heart.png','CUTE','STICKER'),
(135,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/label1.png','CUTE','STICKER'),
(136,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/label2.png','CUTE','STICKER'),
(137,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/label3.png','CUTE','STICKER'),
(138,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/label4.png','CUTE','STICKER'),
(139,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/moon.png','CUTE','STICKER'),
(140,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/must_do.png','CUTE','STICKER'),
(141,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/o.png','CUTE','STICKER'),
(142,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/ok.png','CUTE','STICKER'),
(143,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/rainny.png','CUTE','STICKER'),
(144,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/smile.png','CUTE','STICKER'),
(145,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/snowy.png   ','CUTE','STICKER'),
(146,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/star1.png','CUTE','STICKER'),
(147,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/star2.png','CUTE','STICKER'),
(148,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/star3.png','CUTE','STICKER'),
(149,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/star4.png','CUTE','STICKER'),
(150,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/study.png','CUTE','STICKER'),
(151,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/sunny.png','CUTE','STICKER'),
(152,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/thank_you.png','CUTE','STICKER'),
(153,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/x.png','CUTE','STICKER'),
(154,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/yes.png','CUTE','STICKER'),
(155,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/index1.png','CUTE','STICKER'),
(156,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/index2.png','CUTE','STICKER'),
(157,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon1.png','CUTE','STICKER'),
(158,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon2.png','CUTE','STICKER'),
(159,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon3.png','CUTE','STICKER'),
(160,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon4.png','CUTE','STICKER'),
(161,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon5.png','CUTE','STICKER'),
(162,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon6.png','CUTE','STICKER'),
(163,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon7.png','CUTE','STICKER'),
(164,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon8.png','CUTE','STICKER'),
(165,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon9.png','CUTE','STICKER'),
(166,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon10.png','CUTE','STICKER'),
(167,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon11.png','CUTE','STICKER'),
(168,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon12.png','CUTE','STICKER'),
(169,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon13.png','CUTE','STICKER'),
(170,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon14.png','CUTE','STICKER'),
(171,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon15.png','CUTE','STICKER'),
(172,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon16.png','CUTE','STICKER'),
(173,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon17.png','CUTE','STICKER'),
(174,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon18.png','CUTE','STICKER'),
(175,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon19.png','CUTE','STICKER'),
(176,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon20.png','CUTE','STICKER'),
(177,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon21.png','CUTE','STICKER'),
(178,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon22.png','CUTE','STICKER'),
(179,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon23.png','CUTE','STICKER'),
(180,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon24.png','CUTE','STICKER'),
(181,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/icon25.png','CUTE','STICKER'),
(182,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_1.png','LETTER','STICKER'),
(183,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_2.png','LETTER','STICKER'),
(184,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_3.png','LETTER','STICKER'),
(185,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_4.png','LETTER','STICKER'),
(186,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_5.png','LETTER','STICKER'),
(187,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_6.png','LETTER','STICKER'),
(188,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_7.png','LETTER','STICKER'),
(189,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_8.png','LETTER','STICKER'),
(190,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_9.png','LETTER','STICKER'),
(191,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_10.png','LETTER','STICKER'),
(192,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_11.png','LETTER','STICKER'),
(193,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_12.png','LETTER','STICKER'),
(194,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_13.png','LETTER','STICKER'),
(195,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_14.png','LETTER','STICKER'),
(196,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_15.png','LETTER','STICKER'),
(197,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_16.png','LETTER','STICKER'),
(198,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_17.png','LETTER','STICKER'),
(199,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_18.png','LETTER','STICKER'),
(200,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_19.png','LETTER','STICKER'),
(201,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_20.png','LETTER','STICKER'),
(202,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_21.png','LETTER','STICKER'),
(203,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_22.png','LETTER','STICKER'),
(204,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_23.png','LETTER','STICKER'),
(205,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_24.png','LETTER','STICKER'),
(206,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_25.png','LETTER','STICKER'),
(207,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_26.png','LETTER','STICKER'),
(208,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_27.png','LETTER','STICKER'),
(209,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_28.png','LETTER','STICKER'),
(210,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_29.png','LETTER','STICKER'),
(211,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_30.png','LETTER','STICKER'),
(212,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_31.png','LETTER','STICKER'),
(213,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_32.png','LETTER','STICKER'),
(214,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_33.png','LETTER','STICKER'),
(215,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_34.png','LETTER','STICKER'),
(216,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_35.png','LETTER','STICKER'),
(217,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/circle_36.png','LETTER','STICKER'),
(218,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_1.png','LETTER','STICKER'),
(219,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_2.png','LETTER','STICKER'),
(220,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_3.png','LETTER','STICKER'),
(221,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_4.png','LETTER','STICKER'),
(222,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_5.png','LETTER','STICKER'),
(223,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_6.png','LETTER','STICKER'),
(224,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_7.png','LETTER','STICKER'),
(225,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_8.png','LETTER','STICKER'),
(226,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_9.png','LETTER','STICKER'),
(227,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_10.png','LETTER','STICKER'),
(228,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_11.png','LETTER','STICKER'),
(229,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_12.png','LETTER','STICKER'),
(230,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_13.png','LETTER','STICKER'),
(231,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_14.png','LETTER','STICKER'),
(232,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_15.png','LETTER','STICKER'),
(233,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_16.png','LETTER','STICKER'),
(234,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_17.png','LETTER','STICKER'),
(235,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_18.png','LETTER','STICKER'),
(236,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_19.png','LETTER','STICKER'),
(237,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_20.png','LETTER','STICKER'),
(238,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_21.png','LETTER','STICKER'),
(239,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_22.png','LETTER','STICKER'),
(240,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_23.png','LETTER','STICKER'),
(241,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_24.png','LETTER','STICKER'),
(242,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_25.png','LETTER','STICKER'),
(243,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_26.png','LETTER','STICKER'),
(244,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_27.png','LETTER','STICKER'),
(245,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_28.png','LETTER','STICKER'),
(246,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_29.png','LETTER','STICKER'),
(247,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_30.png','LETTER','STICKER'),
(248,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_31.png','LETTER','STICKER'),
(249,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_32.png','LETTER','STICKER'),
(250,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_33.png','LETTER','STICKER'),
(251,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_34.png','LETTER','STICKER'),
(252,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_35.png','LETTER','STICKER'),
(253,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/heart_36.png','LETTER','STICKER'),
(254,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/ssg.png','BASEBALL','STICKER'),
(255,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/lg.png','BASEBALL','STICKER'),
(256,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/kiwoom.png','BASEBALL','STICKER'),
(257,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker1.png','BASEBALL','STICKER'),
(258,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker2.png','BASEBALL','STICKER'),
(259,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker3.png','BASEBALL','STICKER'),
(260,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker4.png','BASEBALL','STICKER'),
(261,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker5.png','BASEBALL','STICKER'),
(262,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker6.png','BASEBALL','STICKER'),
(263,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker7.png','BASEBALL','STICKER'),
(264,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker8.png','BASEBALL','STICKER'),
(265,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker9.png','BASEBALL','STICKER'),
(266,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker10.png','BASEBALL','STICKER'),
(267,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker11.png','BASEBALL','STICKER'),
(268,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker12.png','BASEBALL','STICKER'),
(269,'https://dsfjel9nvktdp.cloudfront.net/sticker/baseball/baseball_sticker13.png','BASEBALL','STICKER'),
(270,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker1.png','CUTE','STICKER'),
(271,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker2.png','CUTE','STICKER'),
(272,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker3.png','CUTE','STICKER'),
(273,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker4.png','CUTE','STICKER'),
(274,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker5.png','CUTE','STICKER'),
(275,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker6.png','CUTE','STICKER'),
(276,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker7.png','CUTE','STICKER'),
(277,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker8.png','CUTE','STICKER'),
(278,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cute_sticker9.png','CUTE','STICKER'),
(279,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker1.png','CUTE','STICKER'),
(280,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker2.png','CUTE','STICKER'),
(281,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker3.png','CUTE','STICKER'),
(282,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker4.png','CUTE','STICKER'),
(283,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker5.png','CUTE','STICKER'),
(284,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker6.png','CUTE','STICKER'),
(285,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker7.png','CUTE','STICKER'),
(286,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker8.png','CUTE','STICKER'),
(287,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker9.png','CUTE','STICKER'),
(288,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker10.png','CUTE','STICKER'),
(289,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker11.png','CUTE','STICKER'),
(290,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker12.png','CUTE','STICKER'),
(291,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker13.png','CUTE','STICKER'),
(292,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker14.png','CUTE','STICKER'),
(293,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker15.png','CUTE','STICKER'),
(294,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker16.png','CUTE','STICKER'),
(295,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker17.png','CUTE','STICKER'),
(296,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker18.png','CUTE','STICKER'),
(297,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker19.png','CUTE','STICKER'),
(298,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker20.png','CUTE','STICKER'),
(299,'https://dsfjel9nvktdp.cloudfront.net/sticker/cute/cutecute_sticker21.png','CUTE','STICKER'),
(300,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_1.png','LETTER','STICKER'),
(301,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_2.png','LETTER','STICKER'),
(302,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_3.png','LETTER','STICKER'),
(303,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_4.png','LETTER','STICKER'),
(304,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_5.png','LETTER','STICKER'),
(305,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_6.png','LETTER','STICKER'),
(306,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_7.png','LETTER','STICKER'),
(307,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_8.png','LETTER','STICKER'),
(308,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_9.png','LETTER','STICKER'),
(309,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_10.png','LETTER','STICKER'),
(310,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_11.png','LETTER','STICKER'),
(311,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_12.png','LETTER','STICKER'),
(312,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_13.png','LETTER','STICKER'),
(313,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_14.png','LETTER','STICKER'),
(314,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_15.png','LETTER','STICKER'),
(315,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_16.png','LETTER','STICKER'),
(316,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_17.png','LETTER','STICKER'),
(317,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_18.png','LETTER','STICKER'),
(318,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_19.png','LETTER','STICKER'),
(319,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_20.png','LETTER','STICKER'),
(320,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_21.png','LETTER','STICKER'),
(321,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_22.png','LETTER','STICKER'),
(322,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_23.png','LETTER','STICKER'),
(323,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_24.png','LETTER','STICKER'),
(324,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_25.png','LETTER','STICKER'),
(325,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_26.png','LETTER','STICKER'),
(326,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_27.png','LETTER','STICKER'),
(327,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_28.png','LETTER','STICKER'),
(328,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_29.png','LETTER','STICKER'),
(329,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_30.png','LETTER','STICKER'),
(330,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_31.png','LETTER','STICKER'),
(331,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_32.png','LETTER','STICKER'),
(332,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_33.png','LETTER','STICKER'),
(333,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_34.png','LETTER','STICKER'),
(334,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_35.png','LETTER','STICKER'),
(335,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/retro_36.png','LETTER','STICKER'),
(336,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_1.png','LETTER','STICKER'),
(337,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_2.png','LETTER','STICKER'),
(338,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_3.png','LETTER','STICKER'),
(339,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_4.png','LETTER','STICKER'),
(340,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_5.png','LETTER','STICKER'),
(341,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_6.png','LETTER','STICKER'),
(342,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_7.png','LETTER','STICKER'),
(343,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_8.png','LETTER','STICKER'),
(344,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_9.png','LETTER','STICKER'),
(345,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_10.png','LETTER','STICKER'),
(346,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_11.png','LETTER','STICKER'),
(347,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_12.png','LETTER','STICKER'),
(348,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_13.png','LETTER','STICKER'),
(349,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_14.png','LETTER','STICKER'),
(350,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_15.png','LETTER','STICKER'),
(351,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_16.png','LETTER','STICKER'),
(352,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_17.png','LETTER','STICKER'),
(353,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_18.png','LETTER','STICKER'),
(354,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_19.png','LETTER','STICKER'),
(355,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_20.png','LETTER','STICKER'),
(356,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_21.png','LETTER','STICKER'),
(357,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_22.png','LETTER','STICKER'),
(358,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_23.png','LETTER','STICKER'),
(359,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_24.png','LETTER','STICKER'),
(360,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_25.png','LETTER','STICKER'),
(361,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_big_26.png','LETTER','STICKER'),
(362,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_1.png','LETTER','STICKER'),
(363,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_2.png','LETTER','STICKER'),
(364,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_3.png','LETTER','STICKER'),
(365,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_4.png','LETTER','STICKER'),
(366,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_5.png','LETTER','STICKER'),
(367,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_6.png','LETTER','STICKER'),
(368,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_7.png','LETTER','STICKER'),
(369,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_8.png','LETTER','STICKER'),
(370,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_9.png','LETTER','STICKER'),
(371,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_10.png','LETTER','STICKER'),
(372,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_11.png','LETTER','STICKER'),
(373,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_12.png','LETTER','STICKER'),
(374,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_13.png','LETTER','STICKER'),
(375,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_14.png','LETTER','STICKER'),
(376,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_15.png','LETTER','STICKER'),
(377,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_16.png','LETTER','STICKER'),
(378,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_17.png','LETTER','STICKER'),
(379,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_18.png','LETTER','STICKER'),
(380,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_19.png','LETTER','STICKER'),
(381,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_20.png','LETTER','STICKER'),
(382,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_21.png','LETTER','STICKER'),
(383,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_22.png','LETTER','STICKER'),
(384,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_23.png','LETTER','STICKER'),
(385,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_24.png','LETTER','STICKER'),
(386,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_25.png','LETTER','STICKER'),
(387,'https://dsfjel9nvktdp.cloudfront.net/sticker/letter/black_letter_small_26.png','LETTER','STICKER'),
(388,'https://dsfjel9nvktdp.cloudfront.net/template/diary/monsters.png','NONE','THEME'),
(389,'https://dsfjel9nvktdp.cloudfront.net/template/diary/kia.png','NONE','THEME'),
(390,'https://dsfjel9nvktdp.cloudfront.net/template/diary/samsung.png','NONE','THEME'),
(391,'https://dsfjel9nvktdp.cloudfront.net/template/diary/doosan.png','NONE','THEME'),
(392,'https://dsfjel9nvktdp.cloudfront.net/template/diary/hanhwa.png','NONE','THEME'),
(393,'https://dsfjel9nvktdp.cloudfront.net/template/diary/kt.png','NONE','THEME'),
(394,'https://dsfjel9nvktdp.cloudfront.net/template/diary/nc.png','NONE','THEME'),
(395,'https://dsfjel9nvktdp.cloudfront.net/template/diary/lotte.png','NONE','THEME'),
(396,'https://dsfjel9nvktdp.cloudfront.net/template/diary/ssg.png','NONE','THEME'),
(397,'https://dsfjel9nvktdp.cloudfront.net/template/diary/lg.png','NONE','THEME'),
(398,'https://dsfjel9nvktdp.cloudfront.net/template/diary/kiwoom.png','NONE','THEME');
/*!40000 ALTER TABLE `diary_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_stamp`
--

DROP TABLE IF EXISTS `diary_stamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_stamp` (
  `stamp_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`stamp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_stamp`
--

LOCK TABLES `diary_stamp` WRITE;
/*!40000 ALTER TABLE `diary_stamp` DISABLE KEYS */;
INSERT INTO `diary_stamp` VALUES
(1,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp1.png'),
(2,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp2.png'),
(3,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp3.png'),
(4,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp4.png'),
(5,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp5.png'),
(6,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp6.png'),
(7,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp7.png'),
(8,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp8.png'),
(9,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp9.png'),
(10,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp10.png'),
(11,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp11.png'),
(12,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp12.png'),
(13,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp13.png'),
(14,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp14.png'),
(15,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp15.png'),
(16,'https://dsfjel9nvktdp.cloudfront.net/stamp/stamp16.png');
/*!40000 ALTER TABLE `diary_stamp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `friend_id` bigint(20) NOT NULL,
  `last_visited` datetime(6) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `status` enum('FRIEND','WAITING') DEFAULT NULL,
  PRIMARY KEY (`friend_id`,`user_id`),
  KEY `FKeab81424e9dtc4a8hjlq4xiew` (`user_id`),
  CONSTRAINT `FK5j28qgyvon52ycu9sfieraerm` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKeab81424e9dtc4a8hjlq4xiew` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES
(123,'2024-08-15 00:00:00.000000',124,'FRIEND'),
(124,'2024-08-16 00:42:53.496501',123,'FRIEND'),
(126,'2024-08-16 00:15:22.930204',127,'FRIEND'),
(127,'2024-08-16 00:11:31.253030',126,'FRIEND');
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_post`
--

DROP TABLE IF EXISTS `like_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like_post` (
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `FKjdv3j0wwk6s2cujoh18p5ko61` (`user_id`),
  CONSTRAINT `FKjdv3j0wwk6s2cujoh18p5ko61` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKnu91sbh82a5nj1o3xh0sgwhu8` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_post`
--

LOCK TABLES `like_post` WRITE;
/*!40000 ALTER TABLE `like_post` DISABLE KEYS */;
INSERT INTO `like_post` VALUES
(7,129),
(8,129);
/*!40000 ALTER TABLE `like_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photocard`
--

DROP TABLE IF EXISTS `photocard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photocard` (
  `created_at` datetime(6) DEFAULT NULL,
  `photocard_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`photocard_id`),
  KEY `FKt814ivuaqimjrrkhvlu7a1idt` (`user_id`),
  CONSTRAINT `FKt814ivuaqimjrrkhvlu7a1idt` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photocard`
--

LOCK TABLES `photocard` WRITE;
/*!40000 ALTER TABLE `photocard` DISABLE KEYS */;
/*!40000 ALTER TABLE `photocard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photocard_resource`
--

DROP TABLE IF EXISTS `photocard_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photocard_resource` (
  `resource_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `img_url` varchar(255) DEFAULT NULL,
  `type` enum('TEMPLATE') DEFAULT NULL,
  PRIMARY KEY (`resource_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photocard_resource`
--

LOCK TABLES `photocard_resource` WRITE;
/*!40000 ALTER TABLE `photocard_resource` DISABLE KEYS */;
INSERT INTO `photocard_resource` VALUES
(1,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/back_frame1.png','TEMPLATE'),
(2,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/back_frame2.png','TEMPLATE'),
(3,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/back_frame3.png','TEMPLATE'),
(4,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/back_frame4.png','TEMPLATE'),
(5,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame1.png','TEMPLATE'),
(6,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame2.png','TEMPLATE'),
(7,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame3.png','TEMPLATE'),
(8,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame4.png','TEMPLATE'),
(9,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame5.png','TEMPLATE'),
(10,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame6.png','TEMPLATE'),
(11,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/bubble_frame7.png','TEMPLATE'),
(12,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/check_frame1.png','TEMPLATE'),
(13,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/check_frame2.png','TEMPLATE'),
(14,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/heart_frame1.png','TEMPLATE'),
(15,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/heart_frame2.png','TEMPLATE'),
(16,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/heart_frame3.png','TEMPLATE'),
(17,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/heart_frame4.png','TEMPLATE'),
(18,'https://dsfjel9nvktdp.cloudfront.net/template/photocard/heart_frame5.png','TEMPLATE');
/*!40000 ALTER TABLE `photocard_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `age` date NOT NULL,
  `back_num` int(11) NOT NULL,
  `batting_average` float DEFAULT NULL,
  `era` float DEFAULT NULL,
  `hit` int(11) DEFAULT NULL,
  `homerun` int(11) DEFAULT NULL,
  `steal` int(11) DEFAULT NULL,
  `struck` int(11) DEFAULT NULL,
  `whip` float DEFAULT NULL,
  `win` int(11) DEFAULT NULL,
  `player_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `two_way` varchar(255) NOT NULL,
  PRIMARY KEY (`player_id`),
  KEY `FKdvd6ljes11r44igawmpm1mc5s` (`team_id`),
  CONSTRAINT `FKdvd6ljes11r44igawmpm1mc5s` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES
('1987-06-22',24,0.111,NULL,1,0,0,NULL,NULL,NULL,1,1000,'김문호','외야수','좌투좌타'),
('1982-10-02',8,0.2,NULL,2,0,2,NULL,NULL,NULL,2,1000,'정근우','2루수','우투우타'),
('1979-04-21',33,0,NULL,0,0,0,NULL,NULL,NULL,3,1000,'박용택','외야수','우투좌타'),
('1982-06-21',10,0.556,NULL,5,1,0,NULL,NULL,NULL,4,1000,'이대호','1루수','우투우타'),
('1986-07-25',37,0,NULL,0,0,0,NULL,NULL,NULL,5,1000,'정의윤','외야수','우투우타'),
('1996-11-15',2,0.111,NULL,1,0,0,NULL,NULL,NULL,6,1000,'최수현','유틸리티','우투좌타'),
('1995-12-06',12,0.333,NULL,3,0,0,NULL,NULL,NULL,7,1000,'박재욱','포수','우투우타'),
('1980-06-27',16,0.25,NULL,2,0,0,NULL,NULL,NULL,8,1000,'정성훈','3루수','우투우타'),
('2002-03-13',1,0.25,NULL,1,0,0,NULL,NULL,NULL,9,1000,'유태웅','내야수','우투우타'),
('2004-07-19',5,0,NULL,0,0,0,NULL,NULL,NULL,10,1000,'문교원','내야수','우투좌타'),
('2003-01-03',52,0.2,NULL,1,0,0,NULL,NULL,NULL,11,1000,'임상우','내야수','우투좌타'),
('1999-11-19',35,0.333,NULL,1,0,0,NULL,NULL,NULL,12,1000,'윤상혁','외야수','우투좌타'),
('1989-03-23',11,NULL,3.11,NULL,NULL,NULL,9,1.61,2,13,1000,'이대은','투수','우투좌타'),
('1989-11-18',19,NULL,6,NULL,NULL,NULL,1,2,1,14,1000,'신재영','투수','우사우타'),
('1985-03-31',15,NULL,0,NULL,NULL,NULL,0,0.33,0,15,1000,'오주원','투수','좌투좌타'),
('1987-06-01',47,NULL,0,NULL,NULL,NULL,0,0,4,16,1000,'유희관','투수','좌투좌타'),
('1983-06-09',13,NULL,0,NULL,NULL,NULL,2,0,0,17,1000,'장원삼','투수','좌투좌타'),
('1981-05-06',40,NULL,2.45,NULL,NULL,NULL,4,1.9,0,18,1000,'니퍼트','투수','우투우타'),
('1980-06-29',21,NULL,0,NULL,NULL,NULL,0,0,1,19,1000,'송승준','투수','우투우타');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `date` date DEFAULT NULL,
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `contents` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK7ky67sgi7k0ayf22652f7763r` (`user_id`),
  CONSTRAINT `FK7ky67sgi7k0ayf22652f7763r` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES
('2024-08-15',1,123,'최강 몬스터즈 진짜 최고!!','https://ds9cw6usvqdm8.cloudfront.net/profile/%EB%91%90%EC%82%B0%EB%B2%A0%EC%96%B4%EC%8A%A4.png'),
('2024-08-15',2,124,'최강 몬스터즈1',NULL),
('2024-08-15',3,124,'최강 몬스터즈2',NULL),
('2024-08-15',4,124,'최강 몬스터즈3',NULL),
('2024-08-15',5,124,'최강 몬스터즈4',NULL),
('2024-08-15',6,124,'최강 몬스터즈5',NULL),
('2024-08-15',7,125,'포스트 테스트',NULL),
('2024-08-16',8,127,'테스트',NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tag`
--

DROP TABLE IF EXISTS `post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_tag` (
  `post_id` bigint(20) NOT NULL,
  `tag_id` bigint(20) NOT NULL,
  PRIMARY KEY (`post_id`,`tag_id`),
  KEY `FKac1wdchd2pnur3fl225obmlg0` (`tag_id`),
  CONSTRAINT `FKac1wdchd2pnur3fl225obmlg0` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FKc2auetuvsec0k566l0eyvr9cs` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tag`
--

LOCK TABLES `post_tag` WRITE;
/*!40000 ALTER TABLE `post_tag` DISABLE KEYS */;
INSERT INTO `post_tag` VALUES
(1,1),
(1,2),
(2,2),
(1,3),
(1,4),
(7,7),
(7,8),
(7,9),
(7,10);
/*!40000 ALTER TABLE `post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contents` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES
(1,'최강야구'),
(2,'최강'),
(3,'몬스터즈'),
(4,'최고'),
(5,'홈런'),
(6,'최강몬스터즈'),
(7,'테스트'),
(8,'또'),
(9,'또또'),
(10,'또또또');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `foundation` date DEFAULT NULL,
  `match_count` int(11) DEFAULT NULL,
  `rank` int(11) DEFAULT NULL,
  `win` int(11) DEFAULT NULL,
  `winning_rate` float DEFAULT NULL,
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `home_ground` varchar(255) DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES
('2022-04-18',12,1,11,91.7,1000,'고척스카이돔','서울','https://dsfjel9nvktdp.cloudfront.net/asset/mascot_face/monsters.png','최강 몬스터즈');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_song`
--

DROP TABLE IF EXISTS `team_song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_song` (
  `team_id` bigint(20) DEFAULT NULL,
  `team_song_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lyrics` varchar(1000) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` enum('INFORMALITY','OFFICIAL') DEFAULT NULL,
  PRIMARY KEY (`team_song_id`),
  KEY `FKimlv4bjru7147mk3t9igqijse` (`team_id`),
  CONSTRAINT `FKimlv4bjru7147mk3t9igqijse` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_song`
--

LOCK TABLES `team_song` WRITE;
/*!40000 ALTER TABLE `team_song` DISABLE KEYS */;
INSERT INTO `team_song` VALUES
(1000,1,'몬!스!터!즈! 승!리!하!리!라!<br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>우리는 승리의 최강 몬스터즈<br>승리를 위해서 달려간다 워우 오오<br>우리는 승리의 최강 몬스터즈<br>오늘도 승리한다<br><br>오! 오오! 오오오! 몬!스!터!즈!<br>오! 오오! 오오오! 승!리!하!리!라!<br>오! 오오! 오오오! 몬!스!터!즈!<br>오늘도 승리한다<br>언제나 승리한다','https://youtu.be/HAhw5IG5BmY?si=_oWn-ZVxC6OF7SSb&t=25','승리하라 몬스터즈여','OFFICIAL'),
(1000,2,'몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 날려라 저 멀리까지<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어<br><br>몬!스!터!즈!<br>최강 몬스터즈 승리 영원하라<br>힘차게 달려라 승리를 향해<br>우리의! 함성을! 여기에 모아서<br>지금부터 외쳐라 몬!스!터!즈!<br>워어어어어','https://youtu.be/cEHB2nsqFTw?si=iCq-PBbtt9JyYgnd','몬스터즈 승리 영원하라','OFFICIAL');
/*!40000 ALTER TABLE `team_song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_player`
--

DROP TABLE IF EXISTS `user_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_player` (
  `push_alert` bit(1) DEFAULT NULL,
  `player_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`player_id`,`user_id`),
  KEY `FK2megs3o7o5ys06ijlfx1tyv6y` (`user_id`),
  CONSTRAINT `FK2megs3o7o5ys06ijlfx1tyv6y` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKkbrdw2m4xw2phdasfc8ejtlwk` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_player`
--

LOCK TABLES `user_player` WRITE;
/*!40000 ALTER TABLE `user_player` DISABLE KEYS */;
INSERT INTO `user_player` VALUES
('',1,126),
('',1,128),
('',2,126),
('',2,128),
('',3,123),
('',3,126),
('',3,128),
('',4,123),
('',4,127),
('',7,127),
('',9,123),
('',10,127);
/*!40000 ALTER TABLE `user_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `is_deleted` bit(1) DEFAULT NULL,
  `play_push_alert` bit(1) DEFAULT NULL,
  `push_alert` bit(1) DEFAULT NULL,
  `theme` tinyint(4) DEFAULT NULL CHECK (`theme` between 0 and 10),
  `created_at` datetime(6) DEFAULT NULL,
  `last_write_diary` datetime(6) DEFAULT NULL,
  `team_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `provider_type` varchar(255) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKhn2tnbh9fqjqeuv8ehw5ple7a` (`team_id`),
  CONSTRAINT `FKhn2tnbh9fqjqeuv8ehw5ple7a` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('\0',NULL,'',1,'2024-08-15 00:00:00.000000','2024-08-15 00:00:00.000000',1000,123,'user1@naver.com','자기소개111','User1','$2a$10$joNMmm0t5dDpM0g5UibESOdk3rBgVvza/yrd0gqZwsIIAdWslwCUG','https://dsfjel9nvktdp.cloudfront.net/profile/no_profile.png','local','1604b772-adc0-4212-8a90-81186c57f598'),
('\0',NULL,'',1,'2024-08-15 00:00:00.000000','2024-08-15 00:00:00.000000',1000,124,'test@test.com','자기소개222','User2','$2a$10$Uip6WzTSUcBLXVV0LrWvGexHndE7a5DqaIrDa3a7g1XS8n8Inlpe6','https://dsfjel9nvktdp.cloudfront.net/profile/no_profile.png','local','1604b772-adc0-4212-8a90-81186c57f100'),
('\0','','',0,'2024-08-15 23:29:48.533748','2024-08-16 00:28:06.880926',1000,125,'krozv@naver.com','회원가입에서 벗어나게 해달라','juyeon','$2a$10$iprLhoVxtCqpoPvOXKZUeed24zIapIIhTLZqk5q6HOsgkKqsqe6LO','https://dsfjel9nvktdp.cloudfront.net/profile/upload_2024-08-15_23_29_57.jpeg','local','d8616fd4-23f3-4c09-aba2-efa2fa650a36'),
('\0','','',0,'2024-08-15 23:53:58.114487','2024-08-15 23:53:58.114522',1000,126,'cb0105@kakao.com','123','서경덕카카오진짜','','http://k.kakaocdn.net/dn/cwIWcm/btsAm23K5Hk/vJb7hJTWntCmwj25eRvDYK/img_640x640.jpg','kakao','8ade71eb-f39e-41b7-917a-1f79b6f71283'),
('\0','','',0,'2024-08-16 00:10:04.663190','2024-08-16 00:14:19.693373',1000,127,'skdb0105@naver.com','wqe','서경덕네이버','$2a$10$DF7wbxntv/CvuHAATDfKa.6zj0VHd0sgjpN5qnhfDuui5AcbxauXG','https://dsfjel9nvktdp.cloudfront.net/profile/no_profile.png','local','898ab044-13ab-4f62-8ee0-bf11aee84ef0'),
('\0','','',0,'2024-08-16 00:20:13.483564','2024-08-16 00:33:08.175965',1000,128,'krozv.code@gmail.com','juyeon','juyeon2','$2a$10$YYJSRVYvD6Pobi3/o2.W1uLftr99kBcZbOiTvYmUsjriRiX8zY7xu','https://dsfjel9nvktdp.cloudfront.net/profile/no_profile.png','local','387b0352-2ca8-4b6a-9093-b83101df1ce5'),
('\0','','',0,'2024-08-16 00:29:19.755186','2024-08-16 00:35:36.002865',1000,129,'jung_j_yeon@naver.com','ㅎㅇㅎㅇㅎㅇㅎㅇ','정지연','','http://k.kakaocdn.net/dn/oSBlM/btsHNBx4Sjx/eEFrY8tSoQ5DhK2at1gH21/img_640x640.jpg','kakao','b676cc7a-2b7f-4572-9b5b-e28d598e3e99');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16  0:45:08
