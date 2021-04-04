-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-04-2021 a las 21:57:46
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
-- Estructura de tabla para la tabla `caso_de_uso`
--

CREATE TABLE `caso_de_uso` (
  `id_caso_de_uso` decimal(10,0) NOT NULL,
  `nombre_caso_de_uso` varchar(200) DEFAULT NULL,
  `iteracion` decimal(10,0) DEFAULT NULL,
  `epic` varchar(50) DEFAULT NULL,
  `valor` decimal(10,0) DEFAULT NULL,
  `status_caso` varchar(20) DEFAULT NULL,
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caso_de_uso_fase_tarea`
--

CREATE TABLE `caso_de_uso_fase_tarea` (
  `id_caso_de_uso` decimal(10,0) NOT NULL,
  `id_fase` decimal(10,0) NOT NULL,
  `id_tarea` decimal(10,0) NOT NULL,
  `maximo` decimal(6,2) DEFAULT NULL,
  `tiempo_real` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fase`
--

CREATE TABLE `fase` (
  `id_fase` decimal(10,0) NOT NULL,
  `nombre_fase` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `id_privilegio` decimal(10,0) NOT NULL,
  `privilegio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre_proyecto` varchar(100) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `imagen` varchar(800) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre_proyecto`, `descripcion`, `imagen`, `fecha`) VALUES
(2000, 'Videojuego de realidad virtual', 'Este proyecto será para dispositivos móviles.', '2021-04-04T02-36-23.831Z-google_asistente_thumb1200_4-3.jpg', '2021-04-04 02:36:25'),
(2009, 'Pagina web de restaurante', 'En este proyecto trabajaremos para  crearle una pagina que eficiente sus procesos a un restaurante', '2021-04-04T03-16-05.223Z-por-que-tener-una-pagina-web.png', '2021-04-04 03:16:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_usuario`
--

CREATE TABLE `proyecto_usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto_usuario`
--

INSERT INTO `proyecto_usuario` (`id_usuario`, `id_proyecto`) VALUES
(1027, 2000),
(1027, 2009),
(1028, 2009);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` decimal(10,0) NOT NULL,
  `id_fase` decimal(10,0) NOT NULL,
  `nombre_tarea` varchar(50) DEFAULT NULL,
  `ap_1` decimal(5,1) DEFAULT NULL,
  `ap_2` decimal(5,1) DEFAULT NULL,
  `ap_3` decimal(5,1) DEFAULT NULL,
  `ap_5` decimal(5,1) DEFAULT NULL,
  `ap_8` decimal(5,1) DEFAULT NULL,
  `ap_13` decimal(5,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `contraseña` varchar(1000) NOT NULL,
  `tiempo_por_semana` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `nombre`, `contraseña`, `tiempo_por_semana`) VALUES
(1001, 'juanperron', 'Juan Pablo', '$2a$12$pih2qa/gfA.u4COFcisqF.6ZiLxyXZgCBd74cFcSQGp', '17.00'),
(1002, 'usuario2', 'Nombre 2', '234', '26.00'),
(1003, 'usuario3', 'Nombre 3', '345', '29.00'),
(1004, 'usuario4', 'Nombre 4', '456', '6.00'),
(1005, 'usuario5', 'Nombre 5', '567', '8.00'),
(1006, 'usuario6', 'Nombre 6', '678', '24.00'),
(1007, 'usuario7', 'Nombre 7', '789', '16.00'),
(1008, 'usuario8', 'Nombre 8', '890', '9.00'),
(1009, 'usuario9', 'Nombre 9', '111', '14.00'),
(1010, 'usuario10', 'Nombre 10', '222', '16.00'),
(1011, 'juanperron', 'Juan Pablo', '$2a$12$pih2qa/gfA.u4COFcisqF.6ZiLxyXZgCBd74cFcSQGp', '16.00'),
(1012, 'usuario12', 'Nombre 12', '444', '15.00'),
(1013, 'usuario13', 'Nombre 13', '555', '19.00'),
(1014, 'usuario14', 'Nombre 14', '666', '8.00'),
(1015, 'usuario15', 'Nombre 15', '777', '28.00'),
(1016, 'usuario16', 'Nombre 16', '888', '18.00'),
(1017, 'usuario17', 'Nombre 17', '999', '15.00'),
(1018, 'usuario18', 'Nombre 18', '321', '7.00'),
(1019, 'usuario19', 'Nombre 19', '432', '10.00'),
(1020, 'usuario20', 'Nombre 20', '543', '29.00'),
(1022, 'ulmo123', 'Emilio', '$2a$12$OiV6JPscYFFwKeJLo851Ue71bdF8XcEoExkm/dWuCUX', NULL),
(1027, 'admin', 'admin', '$2a$12$WhphQWNZ.rGLBcJBbTDn9.zupACjHuJZfD5LAcO44mElP3aQo9.v.', NULL),
(1028, 'cliente', 'cliente', '$2a$12$RvY7MQNRYPLpSUP.NBY2Xe0c2z82EidxjDIJtgcPaJ9I4zAZmNJFm', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rol`
--

CREATE TABLE `usuario_rol` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_rol`
--

INSERT INTO `usuario_rol` (`id_usuario`, `id_rol`) VALUES
(1001, '7001'),
(1002, '7001'),
(1003, '7001'),
(1004, '7002'),
(1005, '7002'),
(1006, '7002'),
(1007, '7002'),
(1008, '7001'),
(1009, '7001'),
(1010, '7002'),
(1011, '7001'),
(1012, '7001'),
(1013, '7001'),
(1014, '7002'),
(1015, '7001'),
(1016, '7002'),
(1017, '7002'),
(1018, '7002'),
(1019, '7002'),
(1020, '7002'),
(1027, '7001'),
(1028, '7002');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  ADD PRIMARY KEY (`id_caso_de_uso`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `caso_de_uso_fase_tarea`
--
ALTER TABLE `caso_de_uso_fase_tarea`
  ADD PRIMARY KEY (`id_caso_de_uso`,`id_fase`,`id_tarea`),
  ADD KEY `id_fase` (`id_fase`),
  ADD KEY `id_tarea` (`id_tarea`);

--
-- Indices de la tabla `fase`
--
ALTER TABLE `fase`
  ADD PRIMARY KEY (`id_fase`);

--
-- Indices de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id_privilegio`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `proyecto_usuario`
--
ALTER TABLE `proyecto_usuario`
  ADD PRIMARY KEY (`id_usuario`,`id_proyecto`),
  ADD KEY `id_proyecto` (`id_proyecto`);

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
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`,`id_fase`),
  ADD KEY `id_fase` (`id_fase`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2010;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1029;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  ADD CONSTRAINT `caso_de_uso_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `caso_de_uso_fase_tarea`
--
ALTER TABLE `caso_de_uso_fase_tarea`
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_1` FOREIGN KEY (`id_caso_de_uso`) REFERENCES `caso_de_uso` (`id_caso_de_uso`),
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_2` FOREIGN KEY (`id_fase`) REFERENCES `fase` (`id_fase`),
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_3` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id_tarea`);

--
-- Filtros para la tabla `proyecto_usuario`
--
ALTER TABLE `proyecto_usuario`
  ADD CONSTRAINT `proyecto_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `proyecto_usuario_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `rol_privilegio`
--
ALTER TABLE `rol_privilegio`
  ADD CONSTRAINT `rol_privilegio_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`),
  ADD CONSTRAINT `rol_privilegio_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegio` (`id_privilegio`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_fase`) REFERENCES `fase` (`id_fase`);

--
-- Filtros para la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
