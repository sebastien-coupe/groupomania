-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210317120025-create-user.js'),('20210318140516-create-post.js'),('20210410132931-create-comment.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `body` text,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `body` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `hasBeenReported` tinyint(1) DEFAULT '0',
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'b45588fa-9136-4468-bb26-d84c53d12af5','Premier inscrit sur Groupomania. Hâte d\'accueillir les collègues :)','',0,2,'2021-04-14 13:59:10','2021-04-14 13:59:10'),(2,'a3e7a1f1-9e9b-4692-849d-d242a47a2878','Passage en revue de mon dernier projet, j\'attends l\'avis de mon mentor...','http://localhost:3000/public/uploads/pexels_david_mceachan_90333_1618408852954.jpg',0,2,'2021-04-14 14:00:52','2021-04-14 14:00:52'),(3,'0bffa6bd-816d-4ad9-bb6c-edafd7663d9a','Hello tout le monde, moi c\'est Elliot. Je suis la nouvelle recrue au département sécurité chez Groupomania. A bientôt!','',0,3,'2021-04-14 14:04:55','2021-04-14 14:04:55'),(4,'38a15d36-8dd1-48b9-95b5-7030dfbec090','Je vous annonce que je vais bientôt quitter la boîte et vous informe que j\'ai l\'intention de rapatrier toute la clientèle que je gère chez mon nouvel employeur. Adieu!','',1,4,'2021-04-14 15:07:23','2021-04-14 15:08:48'),(5,'bd40291d-7031-4135-b477-cb626d8d0116','En train de faire signer mes clients chez la concurrence...','http://localhost:3000/public/uploads/pexels_helena_lopes_696218_1618412911790.jpg',1,4,'2021-04-14 15:08:31','2021-04-14 15:08:51');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firstName` varchar(40) DEFAULT NULL,
  `lastName` varchar(40) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'72ee9216-d4dd-4a86-8018-b83bcf31ca1a','John','Doe','john.doe@groupomania.com','$2b$10$gCXy7ci8Rhq8r0EjuAcOGeNmp5.VJk.ThBsuMO5WWegxxN36CSKEa','Chef de projet','http://localhost:3000/public/avatars/default/j.png',1,'2021-04-14 13:49:45','2021-04-14 13:51:32'),(2,'65da788c-ba15-4b4d-8a17-feb7dffb1138','Sebastien','Coupe','sebastien@gmail.com','$2b$10$8GUpYRGLalIbDPQ.ePFdkem1sm5HcIt3Nut5iDBcFjtFN3sm1YuIi','Développeur Web','http://localhost:3000/public/avatars/avatar_me_1618408675675.jpg',0,'2021-04-14 13:57:21','2021-04-14 13:57:55'),(3,'d436afc0-5982-4f2b-bcdd-84de884d51a4','Elliot','Alderson','eliott@gmail.com','$2b$10$plk9xJMiodRl/7L/Xqucl.RsN3tMpGWCfud4aDNcSJUiMa64yD8iq','Expert en sécurité','http://localhost:3000/public/avatars/avatar_mr_robot_elliot_180x180_1618409154005.jpg',0,'2021-04-14 14:02:39','2021-04-14 14:07:56'),(4,'30fc9b88-da2d-40d4-82f4-3064d9679a1f','Christophe','Blanchard','christophe@gmail.com','$2b$10$/nZh3cQ77ENDMf6QlSqdCOCI16LUcMeKb7ATy0WMU.tyTJikYt9Py','Commercial','http://localhost:3000/public/avatars/default/c.png',0,'2021-04-14 15:03:54','2021-04-14 15:04:16');
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

-- Dump completed on 2021-04-14 15:43:37
