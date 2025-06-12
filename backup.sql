-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: fracc_db
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fraccionamiento_id` int NOT NULL,
  `tipo_documento` enum('convenio','anexo','otros') NOT NULL,
  `ruta_archivo` varchar(255) NOT NULL,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fraccionamiento_id` (`fraccionamiento_id`),
  CONSTRAINT `documentos_ibfk_1` FOREIGN KEY (`fraccionamiento_id`) REFERENCES `fraccionamientos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fraccionamiento_historico`
--

DROP TABLE IF EXISTS `fraccionamiento_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fraccionamiento_historico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fraccionamiento_id` int NOT NULL,
  `categoria_anterior` enum('vigente','en proceso','irregular') DEFAULT NULL,
  `categoria_nueva` enum('vigente','en proceso','irregular') NOT NULL,
  `fecha_cambio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int DEFAULT NULL,
  `observaciones` text,
  PRIMARY KEY (`id`),
  KEY `fraccionamiento_id` (`fraccionamiento_id`),
  CONSTRAINT `fraccionamiento_historico_ibfk_1` FOREIGN KEY (`fraccionamiento_id`) REFERENCES `fraccionamientos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraccionamiento_historico`
--

LOCK TABLES `fraccionamiento_historico` WRITE;
/*!40000 ALTER TABLE `fraccionamiento_historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `fraccionamiento_historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fraccionamientos`
--

DROP TABLE IF EXISTS `fraccionamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fraccionamientos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `categoria` enum('vigente','en proceso','irregular') NOT NULL DEFAULT 'en proceso',
  `fecha_fin_convenio` date DEFAULT NULL,
  `tiene_convenio` tinyint(1) DEFAULT '0',
  `pdf_convenio_path` varchar(255) DEFAULT NULL,
  `observaciones` text,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_actualizacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `autosuficiente` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_nombre` (`nombre`),
  KEY `idx_categoria` (`categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraccionamientos`
--

LOCK TABLES `fraccionamientos` WRITE;
/*!40000 ALTER TABLE `fraccionamientos` DISABLE KEYS */;
INSERT INTO `fraccionamientos` VALUES (1,'Casa Fuerte','vigente','2027-05-15',1,'documents/casa-fuerte.pdf','Casa fuerte convenio de colaboracion vigente hasta 2027, con opcion de solicitar prorroga','2025-06-09 11:14:08','2025-06-11 18:01:55',1),(2,'Colinas de Cajititlan','irregular','2018-01-01',0,NULL,'Según últimos registros, hay acta de acuerdo, para entrega recepción del 2006. Menciona que se entrega la infraestructura de agua y drenaje, no tienen título de pozo. El 5 de diciembre de 2023 se presentó a secretaria general solicitud para convenio de colaboración. No hubo más actualización desde entonces. ','2025-06-09 23:32:15','2025-06-11 18:17:03',0),(3,'Bosque Real','vigente','2031-01-01',1,'documents/bosque-real.pdf','Convenio vigente hasta 2027','2025-06-10 04:30:31','2025-06-11 18:11:11',1),(4,'Senderos de Monteverde','vigente','2027-01-01',1,'documents/senderos-de-monteverde.pdf','Convenio vigente hasta 2027','2025-06-10 04:30:31','2025-06-11 18:11:11',1),(5,'Valle de las Flores','vigente','2026-01-01',1,'documents/valle-de-las-flores.pdf','Convenio vigente hasta 2026','2025-06-10 04:30:31','2025-06-11 18:11:11',1),(6,'Lomas de Santa Anita','en proceso','2025-02-28',1,'','Convenio venciod en Febrebro de 2025','2025-06-10 04:30:31','2025-06-11 18:11:54',0),(12,'Acueducto San Agustin','irregular',NULL,0,'','El agua es administrada por el condominio ya que no se ha entregado al municipio, según datos de patrimonio.','2025-06-10 19:54:09','2025-06-11 18:21:10',0),(23,'Bosques de Santa Anita','vigente','2027-01-01',1,'documents/bosques-de-santa-anita.pdf','Convenio de colaboracion vigente hasta 2027.','2025-06-11 15:41:27','2025-06-11 18:07:19',1),(33,'Condominio Siglo XXI','vigente','2040-01-01',1,'documents/siglo-XXI.pdf','Concesion vigente hasta 2040','2025-06-11 15:45:32','2025-06-11 18:08:02',1),(34,'Tres Retes Cajititlan','en proceso','2018-01-01',0,'','Convenio de colaboracion vencdio en 2018','2025-06-11 17:21:32','2025-06-11 17:21:32',0),(35,'La Noria de los Reyes','en proceso','2018-01-01',0,'','Convenio de colaboracion vencdio en 2018','2025-06-11 17:23:46','2025-06-11 17:48:49',0),(36,'Pedregal San Miguel','en proceso','2018-01-01',0,'','Convenio de colaboracion vencdio en 2018','2025-06-11 17:46:22','2025-06-11 17:46:22',0),(37,'San Remo','irregular',NULL,0,'','No hay registros del convenio o concesión anterior; según los registros más recientes, el municipio no da el servicio, pero hay infraestructura de agua y está entregado. Se tiene que acercar la asociación de colonos para llevar a cabo un convenio o concesión.','2025-06-11 17:46:22','2025-06-11 17:46:22',0),(41,'El Cielo Palomar','irregular',NULL,0,'','No tiene concesión o convenio, es un convenio con México inversiones. Según los últimos registros, el municipio no presta el servicio. Tienen título de pozo, pero a nombre de México inversiones. En junio de 2026 se vence convenio para tomar aguas residuales y tratarlas para regar el club de golf El Cielo.','2025-06-11 17:56:30','2025-06-11 17:56:30',0),(42,'Balcones de la Calera','irregular',NULL,0,'','El agua es administrada por el desarrollador, no tiene redes de drenaje. Según últimos registros, no quieren entregar el título de pozo al municipio para que sea concesión.','2025-06-11 17:56:30','2025-06-11 17:56:30',0);
/*!40000 ALTER TABLE `fraccionamientos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-12  2:34:22
