SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--  database :  `ecommerce`
--
USE ecommerce;
-- --------------------------------------------------------

--
--  `carts` table structure
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `user_id` int(11) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category` table structure
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL,
  `product_category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `product_category` (`product_category`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category_camera` table structure
--

DROP TABLE IF EXISTS `category_camera`;
CREATE TABLE IF NOT EXISTS `category_camera` (
  `category_camera_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `screen-size` varchar(50) DEFAULT NULL,
  `resolution` int(11) DEFAULT NULL,
  `image-stabilization` tinyint(1) DEFAULT NULL,
  `connectivity-technology` varchar(50) DEFAULT NULL,
  `digital-zoom` int(11) DEFAULT NULL,
  `optical-zoom` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_camera_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category_computer` table structure
--

DROP TABLE IF EXISTS `category_computer`;
CREATE TABLE IF NOT EXISTS `category_computer` (
  `category_computer_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `os` varchar(50) DEFAULT NULL,
  `screen-size` varchar(50) DEFAULT NULL,
  `display-technology` varchar(50) DEFAULT NULL,
  `screen-resolution` varchar(50) DEFAULT NULL,
  `processor-brand` varchar(50) DEFAULT NULL,
  `processor-type` varchar(50) DEFAULT NULL,
  `processor-count` int(11) DEFAULT NULL,
  `processor-speed` int(11) DEFAULT NULL,
  `ram-size` int(11) DEFAULT NULL,
  `hard-drive-size` int(11) DEFAULT NULL,
  `graphic-card` varchar(50) DEFAULT NULL,
  `graphic-card-ram-size` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_computer_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category_headphone` table structure
--

DROP TABLE IF EXISTS `category_headphone`;
CREATE TABLE IF NOT EXISTS `category_headphone` (
  `category_headphone_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `impedence` int(11) DEFAULT NULL,
  `sensitivity` int(11) DEFAULT NULL,
  `frequency-response` varchar(50) DEFAULT NULL,
  `noise-cancelling` tinyint(1) DEFAULT NULL,
  `playing-time` int(11) DEFAULT NULL,
  `charge-time` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_headphone_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category_smartphone` table structure
--

DROP TABLE IF EXISTS `category_smartphone`;
CREATE TABLE IF NOT EXISTS `category_smartphone` (
  `category_smartphone_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `OS` varchar(50) DEFAULT NULL,
  `screen-size` varchar(50) DEFAULT NULL,
  `front-camera-resolution` int(11) DEFAULT NULL,
  `back-camera-resolution` int(11) DEFAULT NULL,
  `processor` varchar(50) DEFAULT NULL,
  `ram-size` int(11) DEFAULT NULL,
  `hard-drive-size` int(11) DEFAULT NULL,
  `double-sim` tinyint(1) DEFAULT NULL,
  `fast-charge` tinyint(1) DEFAULT NULL,
  `DAS-index` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_smartphone_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `category_tv` table structure
--

DROP TABLE IF EXISTS `category_tv`;
CREATE TABLE IF NOT EXISTS `category_tv` (
  `category_tv_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `screen-size` varchar(50) DEFAULT NULL,
  `image-aspect-ratio` varchar(50) DEFAULT NULL,
  `display-technology` varchar(50) DEFAULT NULL,
  `display-resolution-max` varchar(50) DEFAULT NULL,
  `connectivity-technology` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`category_tv_id`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `orders` table structure
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` varchar(255) NOT NULL,
  `order_status` int(11) NOT NULL,
  `order_sum_value` float DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `products` table structure
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` varchar(50) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_description` longtext,
  `product_type` varchar(255) DEFAULT NULL,
  `product_brand` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_created` datetime,
  `product_rating` int(11) DEFAULT NULL,
  `amount_1_star` int DEFAULT 0,
  `amount_2_star` int DEFAULT 0,
  `amount_3_star` int DEFAULT 0,
  `amount_4_star` int DEFAULT 0,
  `amount_5_star` int DEFAULT 0,
  `product_amount` int(11) DEFAULT NULL,
  `product_reviews` varchar(50) DEFAULT NULL,
  `product_image_url` varchar(255) DEFAULT NULL,
  `product_category` varchar(50) DEFAULT NULL,
  `product_color` varchar(50) DEFAULT NULL,
  `product_weight` int(11) DEFAULT NULL,
  `product_dimensions` varchar(50) DEFAULT NULL,
  `sale_date` datetime ,
  `sale_price` int ,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id` (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `products_orders` table structure
--

DROP TABLE IF EXISTS `products_orders`;
CREATE TABLE IF NOT EXISTS `products_orders` (
  `product_id` varchar(50) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  KEY `product_id` (`product_id`),
  KEY `order_id` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `reviews` table structure
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` varchar(50) NOT NULL,
  `product_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `review_content` longtext,
  `review_created` varchar(50) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `roles` table structure
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
--  `users` table structure
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `role_id` int(11) NOT NULL,
  `is_female` tinyint(1) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
