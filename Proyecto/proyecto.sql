-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2021 a las 04:54:41
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `id_privilegio` decimal(10,0) NOT NULL,
  `privilegio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `privilegio`
--

INSERT INTO `privilegio` (`id_privilegio`, `privilegio`) VALUES
('8001', 'crear proyecto'),
('8002', 'modificar proyecto'),
('8003', 'Crear tarea'),
('8004', 'modificar tarea'),
('8005', 'autenticarse'),
('8006', 'consultar proyecto'),
('8007', 'generar reporte'),
('8008', 'registrar caso de uso'),
('8009', 'modificar caso de uso'),
('8010', 'registrar punto agil'),
('8011', 'modificar punto agil'),
('8012', 'registrar fase'),
('8013', 'modificar fase'),
('8014', 'registrar capacidad de equipo'),
('8015', 'modificar capacidad de equipo'),
('8016', 'registrar tiempo wbs'),
('8017', 'modificar tiempo wbs'),
('8018', 'descargar plantilla wbs'),
('8019', 'agregar usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `nombre_proyecto` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `imagen` varchar(800) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`nombre_proyecto`, `descripcion`, `imagen`, `fecha`) VALUES
('Carrera rocky', 'ddasdsasdsadyyyyyyyyyyyyyyyyeeeeeeeeeeeeeeeeiiiiiiiiiiiirrrrrrrrg', '2021-04-02T02-45-36.007Z-59-595974_rocky-balboa-wallpapers-rocky-balboa-wallpaper-pc.jpg', '2021-04-02 02:45:36'),
('Creacion de areas verdes', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'https://goblincreative.com/magazine/wp-content/uploads/2018/03/realidad-virtual-la-era-de-la-experiencia-700x410.jpg', '2021-03-26 16:55:50'),
('Creacion de software intuitivo', 'dsafsgdhjkyymfgndfbsdvadgshdtjfym', 'https://concepto.de/wp-content/uploads/2015/03/software-1-e1550080097569.jpg', '2021-04-02 02:14:47'),
('Diseño web para natgas', 'En este proyecto trabajaremos con natgas para  crearle un diseño que eficiente sus procesos', 'https://blogsterapp.com/wp-content/uploads/2019/08/estructura-disen%CC%83o-web-corporativo-e1566205544151.png', '2021-03-26 17:55:33'),
('El fabuloso proyecto', 'dsafsadsasadfsafsagvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', '2021-04-02T02-50-02.653Z-58.jpg', '2021-04-02 02:50:02'),
('Sistema de riego automático (IOT)', 'aaaaaaaaaaaaaaaaaaaasssssssssssssssssddddddddddddddddddjjjjjjjjjjggggggggggggggggggggggggggkkkkkkkkkkfffffllllllll', 'http://www.foroambiental.com.mx/wp-content/uploads/2019/08/20190611181353n5B4xa-1024x395.jpg', '2021-03-26 18:00:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_usuario`
--

CREATE TABLE `proyecto_usuario` (
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre_proyecto` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto_usuario`
--

INSERT INTO `proyecto_usuario` (`nombre_usuario`, `nombre_proyecto`) VALUES
('1001', 'Creacion de software intuitivo'),
('1002', 'Creacion de software intuitivo'),
('1003', 'Creacion de software intuitivo'),
('1006', 'Carrera rocky'),
('1009', 'Carrera rocky'),
('1009', 'El fabuloso proyecto'),
('1014', 'El fabuloso proyecto'),
('1014', 'Sistema de riego automático (IOT)'),
('1015', 'El fabuloso proyecto'),
('1015', 'Sistema de riego automático (IOT)'),
('1017', 'Sistema de riego automático (IOT)'),
('1019', 'Sistema de riego automático (IOT)'),
('admin', 'Carrera rocky'),
('admin', 'Creacion de software intuitivo'),
('admin', 'Diseño web para natgas'),
('admin', 'El fabuloso proyecto'),
('admin', 'Sistema de riego automático (IOT)'),
('cliente', 'Creacion de areas verdes'),
('cliente', 'Diseño web para natgas'),
('cliente', 'Sistema de riego automático (IOT)'),
('CYSGOSH', 'Creacion de areas verdes'),
('CYSGOSH', 'Diseño web para natgas'),
('CYSGOSH', 'Sistema de riego automático (IOT)'),
('Davidguzley', 'Creacion de areas verdes'),
('Davidguzley', 'Diseño web para natgas'),
('Davidguzley', 'Sistema de riego automático (IOT)');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` decimal(10,0) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
('7001', 'miembro'),
('7002', 'externo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `id_rol` decimal(10,0) NOT NULL,
  `id_privilegio` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol_privilegio`
--

INSERT INTO `rol_privilegio` (`id_rol`, `id_privilegio`) VALUES
('7001', '8001'),
('7001', '8002'),
('7001', '8003'),
('7001', '8004'),
('7001', '8005'),
('7001', '8006'),
('7001', '8007'),
('7001', '8008'),
('7001', '8009'),
('7001', '8010'),
('7001', '8011'),
('7001', '8012'),
('7001', '8013'),
('7001', '8014'),
('7001', '8015'),
('7001', '8016'),
('7001', '8017'),
('7001', '8018'),
('7001', '8019'),
('7002', '8007');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contraseña` varchar(1000) NOT NULL,
  `tiempo_por_semana` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombre_usuario`, `nombre`, `contraseña`, `tiempo_por_semana`) VALUES
('1001', 'Nombre 1', '123', '17.00'),
('1002', 'Nombre 2', '234', '26.00'),
('1003', 'Nombre 3', '345', '29.00'),
('1004', 'Nombre 4', '456', '6.00'),
('1005', 'Nombre 5', '567', '8.00'),
('1006', 'Nombre 6', '678', '24.00'),
('1007', 'Nombre 7', '789', '16.00'),
('1008', 'Nombre 8', '890', '9.00'),
('1009', 'Nombre 9', '111', '14.00'),
('1010', 'Nombre 10', '222', '16.00'),
('1011', 'Nombre 11', '333', '16.00'),
('1012', 'Nombre 12', '444', '15.00'),
('1013', 'Nombre 13', '555', '19.00'),
('1014', 'Nombre 14', '666', '8.00'),
('1015', 'Nombre 15', '777', '28.00'),
('1016', 'Nombre 16', '888', '18.00'),
('1017', 'Nombre 17', '999', '15.00'),
('1018', 'Nombre 18', '321', '7.00'),
('1019', 'Nombre 19', '432', '10.00'),
('1020', 'Nombre 20', '543', '29.00'),
('admin', 'admin', '$2a$12$mJyrGxhpQj/7ybdnM0.y3et/HGKoyCf0FgMak1uCT3xNdS196PJZm', NULL),
('cliente', 'cliente', '$2a$12$/oqjQ7lERVy9JywD4rOJ9O0/L8Z.Fa6sVcwcEh8wVghjz1kzNfS5O', NULL),
('CYSGOSH', 'Julio', '$2a$12$Vm7cBQ6phi2X3mSbOTuPHOZyAcNd7wpiMgnHICJvkBuwy4jL3BzWe', NULL),
('Davidguzley', 'David Guzmán Leyva', '$2a$12$XuW4fcAvrTe1gbac6evYyelcleoVagmTCeU3/watbqsK2jF2pCF3O', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rol`
--

CREATE TABLE `usuario_rol` (
  `nombre_usuario` varchar(50) NOT NULL,
  `id_rol` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_rol`
--

INSERT INTO `usuario_rol` (`nombre_usuario`, `id_rol`) VALUES
('1001', '7001'),
('1002', '7001'),
('1003', '7001'),
('1004', '7002'),
('1005', '7002'),
('1006', '7002'),
('1007', '7002'),
('1008', '7001'),
('1009', '7001'),
('1010', '7002'),
('1011', '7001'),
('1012', '7001'),
('1013', '7001'),
('1014', '7002'),
('1015', '7001'),
('1016', '7002'),
('1017', '7002'),
('1018', '7002'),
('1019', '7002'),
('1020', '7002'),
('admin', '7001'),
('cliente', '7002'),
('CYSGOSH', '7001'),
('Davidguzley', '7001');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id_privilegio`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`nombre_proyecto`);

--
-- Indices de la tabla `proyecto_usuario`
--
ALTER TABLE `proyecto_usuario`
  ADD PRIMARY KEY (`nombre_usuario`,`nombre_proyecto`),
  ADD KEY `nombre_proyecto` (`nombre_proyecto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD PRIMARY KEY (`id_rol`,`id_privilegio`),
  ADD KEY `id_privilegio` (`id_privilegio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`nombre_usuario`);

--
-- Indices de la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD PRIMARY KEY (`nombre_usuario`,`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `proyecto_usuario`
--
ALTER TABLE `proyecto_usuario`
  ADD CONSTRAINT `proyecto_usuario_ibfk_1` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`),
  ADD CONSTRAINT `proyecto_usuario_ibfk_2` FOREIGN KEY (`nombre_proyecto`) REFERENCES `proyecto` (`nombre_proyecto`);

--
-- Filtros para la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `rol_privilegio_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegio` (`id_privilegio`);

--
-- Filtros para la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`nombre_usuario`) REFERENCES `usuario` (`nombre_usuario`),
  ADD CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
