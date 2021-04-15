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
INSERT INTO `SequelizeMeta` VALUES ('20210317120025-create-user.js'),('20210318140516-create-post.js'),('20210410132931-create-comment.js'),('20210415095656-create-vote.js');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'f537375d-afb0-45ad-82a2-c5706bdfb7c2','Heureuse d\'y avoir contribué. Très fière du résultat :)',5,1,'2021-04-15 13:05:03','2021-04-15 13:05:03'),(2,'d7c52921-991d-46a6-8aa7-cab38c423c90','Bienvenue Elliot !',5,4,'2021-04-15 13:06:21','2021-04-15 13:06:21');
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
INSERT INTO `posts` VALUES (1,'6f1b2b33-8b73-4dc0-81d4-24361ee5b237','Après quelques semaines de travail, Groupomania et moi-même sommes heureux de vous annoncer le lancement de ce nouveau réseau social!','http://localhost:3000/public/uploads/pexels_rovenimagescom_949592_1618490861233.jpg',0,2,'2021-04-15 12:47:41','2021-04-15 12:47:41'),(2,'42dc18ff-a60e-43a0-a9bd-c1ac578d5e44','Hé bien moi j\'en profite pour vous annoncer que je quitte la boîte pour aller signer chez la concurrence. Oh et bien entendu j\'emmène toute ma clientèle avec!','',1,3,'2021-04-15 12:50:48','2021-04-15 13:05:33'),(3,'07e96a9c-8160-4c2a-84a6-574a45380218','Mon futur bureau: (Et je vous parle même pas du salaire).','http://localhost:3000/public/uploads/pexels_huseyn_kamaladdin_667838_1618491155816.jpg',1,3,'2021-04-15 12:52:35','2021-04-15 13:05:27'),(4,'c847c0cc-abf3-4cc3-9d9f-6c73eef76343','Salut, moi c\'est Elliot, je viens de rejoindre le département sécurité de l\'entreprise. Je compte y apporter mon expertise et me nourrir de celle de ma nouvelle équipe. Hâte d\'échanger avec vous. A bientôt.','',0,4,'2021-04-15 12:56:20','2021-04-15 12:56:20'),(5,'baf1ff63-49a6-47e3-a5ee-a4b421eea6f4','Hello, un poste de consulant UI/UX vient de se libérer dans mon équipe, n\'hésitez pas à faire tourner l\'info autour de vous. Merci.','',0,5,'2021-04-15 13:09:02','2021-04-15 13:09:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'b186b196-1784-47a9-9343-4d304159fc46','John','Doe','john.doe@groupomania.com','$2b$10$SCyIMCeCYgsL7.yEpP5cpuPKelpxA2/g2rc478pGdwvdLlaQMwTyW','Collaborateur Groupomania','http://localhost:3000/public/avatars/default/j.png',1,'2021-04-15 12:43:41','2021-04-15 12:43:41'),(2,'ea0ee37d-c655-43d8-b159-bd24c45a4f8d','Sebastien','Coupe','sebastien@gmail.com','$2b$10$G2DlF/JcIzNMr4rrIjn5U.gVhDoA7XDz5YNcHXgoN1Rl0texJwf1y','Développeur Fullstack','http://localhost:3000/public/avatars/avatar_me_1618490784346.jpg',0,'2021-04-15 12:45:49','2021-04-15 12:46:24'),(3,'09c0f850-a427-4f9c-a4b1-010b7b2df4e3','Christophe','Blanchard','christophe@gmail.com','$2b$10$RujSfPGkwd5Kqt9TUXsDr.ibs71LP6msKg/cjT.w8kkOigE5yFl.u','Commercial','http://localhost:3000/public/avatars/default/c.png',0,'2021-04-15 12:49:28','2021-04-15 12:50:56'),(4,'ade80b7f-c3bd-4767-b0af-03acfb98087b','Elliot','Alderson','elliot@gmail.com','$2b$10$lIaH/xN9F3V4arNhxuog1.awDOzo4bh5ZAJyDggGJ4HgdQ7s4ckKe','Consultant en sécurité','http://localhost:3000/public/avatars/avatar_mr_robot_elliot_180x180_1618491270091.jpg',0,'2021-04-15 12:53:24','2021-04-15 12:54:30'),(5,'edb07fcc-c1fc-46d3-a792-8963c195a5ec','Mylène','Bates','mylene@gmail.com','$2b$10$IKir4czg5gtw/hYApd1fmechnWYILbfZSZFa7yUFC./8w/Jar/O3a','Webdesigner','http://localhost:3000/public/avatars/avatar_mylene_1618491854206.jpg',0,'2021-04-15 13:03:55','2021-04-15 13:04:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `usersLiked` json DEFAULT NULL,
  `usersDisliked` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,1,'[\"ea0ee37d-c655-43d8-b159-bd24c45a4f8d\", \"edb07fcc-c1fc-46d3-a792-8963c195a5ec\"]','[]','2021-04-15 12:47:41','2021-04-15 13:04:20'),(2,2,'[]','[\"edb07fcc-c1fc-46d3-a792-8963c195a5ec\"]','2021-04-15 12:50:48','2021-04-15 13:05:13'),(3,3,'[]','[\"edb07fcc-c1fc-46d3-a792-8963c195a5ec\"]','2021-04-15 12:52:36','2021-04-15 13:05:10'),(4,4,'[\"edb07fcc-c1fc-46d3-a792-8963c195a5ec\"]','[]','2021-04-15 12:56:21','2021-04-15 13:06:23'),(5,5,'[]','[]','2021-04-15 13:09:02','2021-04-15 13:09:02');
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-15 13:19:15
