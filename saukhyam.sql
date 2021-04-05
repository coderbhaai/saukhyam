-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2021 at 04:19 PM
-- Server version: 5.7.24
-- PHP Version: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saukhyam`
--

-- --------------------------------------------------------

--
-- Table structure for table `basics`
--

CREATE TABLE `basics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tab1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tab2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tab3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `basics`
--

INSERT INTO `basics` (`id`, `type`, `name`, `tab1`, `tab2`, `tab3`, `status`, `created_at`, `updated_at`) VALUES
(1, 'FCentre', 'F Centre 1', 'F Location 1', NULL, NULL, 0, '2021-03-05 08:59:16', '2021-03-11 23:10:07'),
(2, 'FCentre', 'F Centre 2', 'F Location 2', NULL, NULL, 0, '2021-03-05 09:41:54', '2021-03-11 23:10:08'),
(3, 'FCentre', 'F Centre 3', 'F Location 3', NULL, NULL, 1, '2021-03-05 09:43:33', '2021-03-05 09:43:33'),
(4, 'FCentre', 'F Center 4', 'F Location 4', NULL, NULL, 1, '2021-03-05 09:44:08', '2021-03-05 09:44:08'),
(5, 'MOQ', '10', NULL, NULL, NULL, 1, '2021-03-05 09:46:11', '2021-03-05 09:46:11'),
(6, 'ProductType', 'Pads', NULL, NULL, NULL, 1, '2021-03-05 10:29:31', '2021-03-05 10:29:31'),
(7, 'ProductType', 'Panty Liners', NULL, NULL, NULL, 1, '2021-03-05 10:29:52', '2021-03-05 10:29:52'),
(11, 'DimensionType', 'Length', NULL, NULL, NULL, 1, '2021-03-05 11:30:31', '2021-03-05 11:30:31'),
(12, 'DimensionType', 'Width', NULL, NULL, NULL, 1, '2021-03-05 11:30:36', '2021-03-05 11:30:36'),
(13, 'DimensionType', 'Base Length', NULL, NULL, NULL, 1, '2021-03-05 11:31:26', '2021-03-05 11:31:26'),
(14, 'DimensionType', 'Base Width', NULL, NULL, NULL, 1, '2021-03-05 11:31:30', '2021-03-05 11:31:30'),
(15, 'DimensionType', 'Insert Width', NULL, NULL, NULL, 1, '2021-03-05 11:31:49', '2021-03-05 11:31:49'),
(16, 'DimensionType', 'Insert Length', NULL, NULL, NULL, 1, '2021-03-05 11:31:53', '2021-03-05 11:31:53'),
(17, 'DimensionType', 'Insert Fiber', NULL, NULL, NULL, 1, '2021-03-05 11:32:06', '2021-03-05 11:32:06'),
(18, 'DimensionType', 'Base Fiber', NULL, NULL, NULL, 1, '2021-03-05 11:32:11', '2021-03-05 11:32:11'),
(27, 'DimensionType', 'Cloth Type', NULL, NULL, NULL, 1, '2021-03-05 11:43:18', '2021-03-05 11:43:18'),
(29, 'Screen', 'Home Page', NULL, NULL, NULL, 1, '2021-03-06 05:14:24', '2021-03-06 05:14:24'),
(30, 'Screen', 'Register Page', NULL, NULL, NULL, 1, '2021-03-06 05:14:38', '2021-03-06 05:14:38'),
(31, 'Screen', 'Login Page', NULL, NULL, NULL, 1, '2021-03-06 05:14:43', '2021-03-06 05:14:43'),
(32, 'Screen', 'Forgot Password', NULL, NULL, NULL, 1, '2021-03-06 05:14:49', '2021-03-06 05:14:49'),
(33, 'Language', 'Hindi', NULL, NULL, NULL, 0, '2021-03-06 05:15:46', '2021-03-06 05:15:46'),
(34, 'Language', 'Marathi', NULL, NULL, NULL, 1, '2021-03-06 05:15:50', '2021-03-06 05:15:50'),
(35, 'Language', 'Bengali', NULL, NULL, NULL, 1, '2021-03-06 05:15:54', '2021-03-06 05:15:54'),
(36, 'CashDiscount', '10', NULL, NULL, NULL, 1, '2021-03-06 12:24:25', '2021-03-06 12:33:17'),
(37, 'Language', 'Odiya', NULL, NULL, NULL, 0, '2021-03-11 11:08:20', '2021-03-11 11:09:53'),
(38, 'Language', 'Tamil', NULL, NULL, NULL, 1, '2021-03-11 23:37:37', '2021-03-11 23:37:37'),
(39, 'Language', 'xxxxxxxxxxxxx', NULL, NULL, NULL, 0, '2021-03-12 02:20:58', '2021-04-02 09:46:44'),
(40, 'Language', 'qqqqqqq', NULL, NULL, NULL, 1, '2021-03-12 02:23:09', '2021-03-12 02:23:09'),
(41, 'Language', 'wwwwwwwww', NULL, NULL, NULL, 1, '2021-03-12 02:29:25', '2021-03-12 02:29:25'),
(42, 'Language', 'oooooo', NULL, NULL, NULL, 1, '2021-03-12 02:30:33', '2021-03-12 02:30:33'),
(43, 'Language', 'rrrrrrrrr', NULL, NULL, NULL, 1, '2021-03-12 02:30:52', '2021-03-12 02:30:52'),
(44, 'Language', 'eeeeeeee', NULL, NULL, NULL, 1, '2021-03-12 02:32:04', '2021-03-12 02:32:04'),
(45, 'Language', 'tttttttt', NULL, NULL, NULL, 1, '2021-03-12 02:33:15', '2021-03-12 02:33:15'),
(46, 'Language', '11111111', NULL, NULL, NULL, 1, '2021-03-12 02:36:16', '2021-03-12 02:36:16');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `status` int(255) NOT NULL DEFAULT '0',
  `question` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `userId`, `status`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Question 1 Sampleqqqqqq', '<p>bbbbbbbbbbbbbbbbbbbbbbb</p>', '2021-03-08 07:41:00', '2021-03-09 01:03:18'),
(2, 1, 1, '111111111111', '<p>2222222222222222</p>', '2021-03-11 11:33:24', '2021-03-11 11:33:24'),
(3, 1, 1, '2222222222222', '<p>3333333333333</p>', '2021-03-11 11:34:22', '2021-03-11 11:34:22'),
(4, 1, 1, '333333333333333333333', '<p>44444444444444444444444444</p>', '2021-03-11 11:35:13', '2021-03-11 11:35:13'),
(5, 1, 1, '55555555555555555', '<p>66666666666666</p>', '2021-03-11 11:36:27', '2021-03-11 11:36:27');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `screenId` int(11) NOT NULL,
  `text` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `screenId`, `text`, `options`, `created_at`, `updated_at`) VALUES
(1, 31, 'qqqqqqqqqq', '[{\"lang\":\"33\",\"value\":\"wwwwwwwwww\"},{\"lang\":\"34\",\"value\":\"eeeeeeeeeeeeeeeeeee\"},{\"lang\":\"35\",\"value\":\"rrrrrrrrrrrrrr\"},{\"lang\":\"33\",\"value\":\"11111111111111111\"}]', '2021-03-06 05:57:48', '2021-03-06 06:08:40'),
(2, 29, 'Welcome', '[{\"lang\":\"33\",\"value\":\"qqqqqqqqqq\"},{\"lang\":\"34\",\"value\":\"wwwwwwwwwwww\"},{\"lang\":\"35\",\"value\":\"eeeeeeeeeee\"},{\"lang\":\"33\",\"value\":\"222222222222222\"},{\"lang\":\"34\",\"value\":\"rrrrrrrrrr\"}]', '2021-03-06 06:04:41', '2021-03-06 06:09:39');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2021_03_05_125729_create_basics_table', 2),
(6, '2021_03_05_125801_create_orders_table', 2),
(7, '2021_03_05_125812_create_products_table', 2),
(8, '2021_03_05_125820_create_tutorials_table', 2),
(9, '2021_03_05_125829_create_languages_table', 2),
(10, '2021_03_05_125843_create_profiles_table', 2),
(11, '2021_03_08_122908_create_faqs_table', 3),
(12, '2021_03_11_175403_create_production_centres_table', 4),
(13, '2021_03_11_190810_create_networks_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `networks`
--

CREATE TABLE `networks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `userId` int(255) NOT NULL,
  `manager` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `networks`
--

INSERT INTO `networks` (`id`, `created_at`, `updated_at`, `userId`, `manager`) VALUES
(1, '2021-03-12 01:38:43', '2021-03-12 01:39:10', 4, 6),
(2, '2021-03-12 01:39:20', '2021-03-12 01:39:29', 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `order` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping` mediumtext COLLATE utf8mb4_unicode_ci,
  `centre` int(11) NOT NULL,
  `discount` mediumtext COLLATE utf8mb4_unicode_ci,
  `payment` mediumtext COLLATE utf8mb4_unicode_ci,
  `remarks` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `order`, `status`, `shipping`, `centre`, `discount`, `payment`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, '[[2,5],[2,3],[2,4]]', 'Delivered', 'zzzzzzzzzzzzzzzzzz', 4, NULL, NULL, 'xxxxxxxxxxxxxxxxxxxxx', '2021-03-09 01:18:38', '2021-03-09 03:47:54'),
(2, 1, '[[1,5],[2,3],[2,4]]', 'Ordered', NULL, 2, NULL, NULL, 'remarks test2', '2021-03-09 01:34:03', '2021-03-09 01:34:03'),
(3, 1, '[[1,5],[2,3],[2,4]]', 'Ordered', NULL, 3, NULL, NULL, 'remarks test3', '2021-03-09 01:34:54', '2021-03-09 01:34:54');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 3, 'authToken', '4a5a11cd2ca1b0a2a6f4b8df3069624282631c78fb65eba78ff5a92249af4f65', '[\"User\"]', NULL, '2021-03-03 07:07:09', '2021-03-03 07:07:09'),
(3, 'App\\Models\\User', 4, 'authToken', '4713228837b81bb64aa7c7ddd1ab3a82e7c1020e52f43bf1823da597590b99d4', '[\"User\"]', NULL, '2021-03-03 07:07:27', '2021-03-03 07:07:27'),
(4, 'App\\Models\\User', 5, 'authToken', '2208cc6f833da50371867be0892b9b9cb5fb519f4172bbe21e2d692709eaaf05', '[\"User\"]', NULL, '2021-03-03 07:20:05', '2021-03-03 07:20:05'),
(7, 'App\\Models\\User', 1, 'authToken', '8cfb4f2edbf3cb4ab88de08e3b3c7ce91b37ce672ffcf8b2880d65bae59192df', '[\"Admin\"]', '2021-03-04 03:06:40', '2021-03-04 02:39:01', '2021-03-04 03:06:40'),
(8, 'App\\Models\\User', 1, 'authToken', 'b72f4cd2a3837cab5018a5a840ceaf9e545dd1dd3ec8881f89deec822c0aea9a', '[\"Admin\"]', '2021-03-05 13:48:27', '2021-03-05 06:59:09', '2021-03-05 13:48:27'),
(9, 'App\\Models\\User', 1, 'authToken', '6d6524ed7f22d2901509cf848657bcf973b261d052de1c1e583d5cda0c7b3415', '[\"Admin\"]', '2021-03-09 03:35:25', '2021-03-06 00:24:47', '2021-03-09 03:35:25'),
(10, 'App\\Models\\User', 1, 'authToken', '49b61212454b03ab8a9fde936c56a692d77bf82e5773121873ccb7bb500d667f', '[\"Admin\"]', '2021-03-09 04:50:45', '2021-03-08 05:11:41', '2021-03-09 04:50:45'),
(11, 'App\\Models\\User', 1, 'authToken', 'acf845892e177f6a0a8ff0a9e345a6472cd37e47844f7fbd4f3e323fd277993d', '[\"Admin\"]', '2021-03-11 13:40:01', '2021-03-11 05:59:26', '2021-03-11 13:40:01'),
(12, 'App\\Models\\User', 1, 'authToken', 'da45e6603d84caa5ad2e639443d0005bb5ebeb50cd6ec86eb38b60e3405bb137', '[\"Admin\"]', '2021-03-12 03:12:07', '2021-03-11 22:38:12', '2021-03-12 03:12:07'),
(13, 'App\\Models\\User', 1, 'authToken', '49ce0234c5617e5489e3eea10b7800cab8fcadc8784130c87f3b5e29f4896a83', '[\"Admin\"]', '2021-04-02 10:45:54', '2021-04-02 06:58:18', '2021-04-02 10:45:54');

-- --------------------------------------------------------

--
-- Table structure for table `production_centres`
--

CREATE TABLE `production_centres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `team` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `production_centres`
--

INSERT INTO `production_centres` (`id`, `name`, `state`, `city`, `pin`, `address`, `team`, `created_at`, `updated_at`) VALUES
(1, 'aaaaaaaaaa', 'vvvvvvvvv', 'bbbbbbbbbb', '11111111', 'hhhhhhhhhhhhhhh', '[[\"11111111111111\",\"22222222222222222222\",0],[\"33333333333333\",\"444444444444444444\",1]]', '2021-03-11 13:14:58', '2021-04-02 10:44:56'),
(2, 'bbbbbb', 'nnnnnnnn', 'mmmmmmmmmmm', '222222222', 'qqqqqqqqqqqqqqq', '[[\"wwwwwww\",\"111111111\"],[\"eeeeeeeeeeee\",\"22222222222\"]]', '2021-03-12 02:47:30', '2021-03-12 02:47:30'),
(3, 'qqqq', 'wwwww', 'eeeeee', '333333', '444444444444444', '[[\"aaaaaaaa\",\"11111111111111111111111111111111\"]]', '2021-04-02 07:28:33', '2021-04-02 07:28:33'),
(4, 'qqqqqq', 'wwwwww', 'eeeeeee', '111111', 'rrrrrrrrr', '[[\"ttttttttt\",\"1111111111\",1],[\"yyyyyyyyyyyy\",\"2222222222\",1]]', '2021-04-02 10:37:48', '2021-04-02 10:44:37');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` int(255) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wprice` int(255) NOT NULL,
  `dprice` int(255) NOT NULL,
  `images` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_description` mediumtext COLLATE utf8mb4_unicode_ci,
  `long_description` text COLLATE utf8mb4_unicode_ci,
  `dimension` mediumtext COLLATE utf8mb4_unicode_ci,
  `status` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `distype` int(11) NOT NULL,
  `language` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `type`, `name`, `wprice`, `dprice`, `images`, `short_description`, `long_description`, `dimension`, `status`, `discount`, `distype`, `language`, `created_at`, `updated_at`) VALUES
(1, 6, 'qqq', 11, 0, '[\"1615015912-1.jpg\",\"1615015912-2.jpg\",\"1615015912-3.jpg\"]', '<p>111111111111</p>', '<p>22222222222222</p>', '[{\"text\":\"11\",\"value\":\"11111111111\"},{\"text\":\"12\",\"value\":\"2222222222\"},{\"text\":\"13\",\"value\":\"3333333333333\"},{\"text\":\"17\",\"value\":\"44444444444444\"}]', 1, 22, 1, '[33,34,35,37]', '2021-03-05 13:04:58', '2021-03-12 02:43:32'),
(2, 7, 'wwwwwwwww', 2222, 0, '[\"1614969437-1.jpg\",\"1614969437-2.jpg\",\"1614969437-3.jpg\",\"1614969437-4.jpg\"]', '<p>aaaaaaaaaaaaaaaaaaaaaaaaa</p>', '<p>sssssssssssssssssssssss</p>', '[{\"text\":\"17\",\"value\":\"25\"},{\"text\":\"18\",\"value\":\"26\"}]', 1, 33, 2, '[33,34,35,37]', '2021-03-05 13:07:17', '2021-03-05 13:32:48'),
(3, 6, 'zzzzzzzzzz', 111, 80, '[\"1615466059-1.jpg\",\"1615466059-2.jpg\",\"1615466059-3.jpg\"]', '<p>aaaaaaaaaaaa</p>', '<p>ssssssssssssss</p>', '[]', 0, 20, 1, '[33]', '2021-03-11 07:04:19', '2021-03-11 11:49:27'),
(4, 6, 'qqqqqqqqqq', 10, 20, '[\"1615483029-1.jpg\",\"1615483029-2.jpg\",\"1615483029-3.jpg\"]', '<p>qqqqqqqqqqq</p>', '<p>wwwwwwwwwwwwww</p>', '[]', 1, 20, 1, '[33,34,35,37]', '2021-03-11 11:47:09', '2021-03-11 11:49:09');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tutorials`
--

CREATE TABLE `tutorials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tutorials`
--

INSERT INTO `tutorials` (`id`, `type`, `name`, `description`, `url`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Doc', '1111111111', '2222222222', '1615026414-.jpg', 0, '2021-03-06 04:30:38', '2021-03-12 02:09:40'),
(2, 'Video', 'qqqqqqqq', 'wwwwwwwwwwww', '1615024874-.jpg', 0, '2021-03-06 04:31:14', '2021-03-12 02:10:20'),
(3, 'Iframe', 'qqqqqqqq', 'wwwwwwwwwwww', 'eeeeeeeeeee', 1, '2021-03-06 04:31:25', '2021-03-12 02:14:51'),
(4, 'Doc', 'Test1', 'testing', '1615524735-.jpg', 1, '2021-03-11 23:22:15', '2021-03-11 23:22:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` mediumtext COLLATE utf8mb4_unicode_ci,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` mediumtext COLLATE utf8mb4_unicode_ci,
  `referral_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refrence` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fCentre` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `role`, `provider`, `image`, `password`, `token`, `referral_code`, `refrence`, `fCentre`, `created_at`, `updated_at`) VALUES
(1, 'Test', 'test@test.com', NULL, 'Admin', 'Email', NULL, '$2y$10$BVgSlflOqQ.IOJ3t86acIuaDT/M3bTMICAN7szmoIEbyQgsOBZhHS', '5|aKCyvDnKebqTTEIh3KdUYQj7rYOBXP0U5yAchhts', NULL, NULL, 1, '2021-03-03 07:06:01', '2021-03-03 07:24:39'),
(3, 'Test - M', 'test@test.com1', NULL, 'Manager', 'Email', NULL, '$2y$10$sqIMWFNayXLijqVHiQzdKOFuYcjF2j6dJoyf12mqqjoKLdX53.VA.', '2|iHn3suLngbglY4yVb7jYbQcmKgvHtwVaHOe5p3k8', NULL, NULL, NULL, '2021-03-03 07:07:08', '2021-03-06 12:06:51'),
(4, 'Test', 'test@test.com2', NULL, 'Amrita', 'Email', NULL, '$2y$10$Z8HOn/rvSjBsQa6bY55ZGuy/.62ltRgqU8mvXM2pFg6SotBLustxK', '3|iKb8iWZCoAGZZ2v0XfDSjPdo0LBa9nVVND4u0DUs', NULL, NULL, 1, '2021-03-03 07:07:27', '2021-03-06 12:41:15'),
(5, 'Amit Khare', 'amit.khare588@gmail.com1', NULL, 'Vijaya', 'Google', 'https://lh3.googleusercontent.com/a-/AOh14Gidy3APTpo6njmklmaw0CKA5wdrRVn2iRWVTnlOZQ=s96-c', '$2y$10$WNI7QoNKRAZAVWomknUNNueBBodebX3Kt11N/8bzYIQCpb3DPYkuy', '4|7synq4OxjgoQy2LVkC4mbyw803kuTzTmHdSRcBeK', NULL, NULL, 1, '2021-03-03 07:20:05', '2021-03-11 13:25:41'),
(6, 'Amit Khare', 'amit.khare588@gmail.com', NULL, 'Manager', 'Google', 'https://lh3.googleusercontent.com/a-/AOh14Gidy3APTpo6njmklmaw0CKA5wdrRVn2iRWVTnlOZQ=s96-c', '$2y$10$e92dDtjmGBJuZ94XHRjZfeJYNKbR0BA3dnRH9zBdZwmPvhbfYcR8K', '080ccc343b4e3555e52bb356384119', NULL, NULL, NULL, '2021-03-03 07:24:39', '2021-03-04 01:13:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basics`
--
ALTER TABLE `basics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `networks`
--
ALTER TABLE `networks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `production_centres`
--
ALTER TABLE `production_centres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutorials`
--
ALTER TABLE `tutorials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basics`
--
ALTER TABLE `basics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `networks`
--
ALTER TABLE `networks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `production_centres`
--
ALTER TABLE `production_centres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tutorials`
--
ALTER TABLE `tutorials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
