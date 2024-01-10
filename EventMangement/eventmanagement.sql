/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.6.7-MariaDB : Database - bookstore
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bookstore` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;

USE `bookstore`;

/*Table structure for table `consultation` */

DROP TABLE IF EXISTS `consultation`;

CREATE TABLE `consultation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `contactNo` varchar(255) NOT NULL,
  `preferredTime` varchar(255) NOT NULL,
  `query` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `consultation` */

insert  into `consultation`(`id`,`username`,`contactNo`,`preferredTime`,`query`) values 
(1,'sinpanda','+1 (205) 521-4811','6PM - 8PM','Hello'),
(2,'haha','+1111111111','2','This is haha\'s query'),
(3,'superstar','+123456789','2','This is superstar\'s query...');

/*Table structure for table `quote` */

DROP TABLE IF EXISTS `quote`;

CREATE TABLE `quote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventType` varchar(255) NOT NULL,
  `numberGuest` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `quote` */

insert  into `quote`(`id`,`eventType`,`numberGuest`,`username`,`email`,`description`,`price`) values 
(1,'Coperate Event',3,'sinpanda','sinpanda@gmail.com','This is corperate Event',23.4),
(2,'birthday',1,'haha','haha@gmail.com','this is haha\'s event.',1234.56);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`firstname`,`lastname`,`role`,`password`) values 
(1,'sinpanda','Olks','Nikogosov',0,'password'),
(2,'superstar','John','Smith',1,'password'),
(3,'sinpanda123','aaa','aaa',0,'password'),
(4,'sinpanda111','qqq','qqq',0,'password'),
(5,'sinpanda222','eee','eee',1,'password');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
