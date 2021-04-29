-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2021 a las 17:44:32
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectoo`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProyecto` (IN `uid_proyecto` INT(11))  BEGIN
DELETE from capacidad_equipo where id_proyecto = uid_proyecto;
 DELETE from caso_de_uso_fase_tarea where id_proyecto = uid_proyecto;
 DELETE from caso_de_uso where id_proyecto = uid_proyecto;
 DELETE from tareas where id_proyecto = uid_proyecto;
 DELETE from work_item_list where id_proyecto = uid_proyecto;
 DELETE from proyecto_usuario where id_proyecto = uid_proyecto;
 DELETE from iteracion where id_proyecto = uid_proyecto;
 DELETE from proyecto where id_proyecto = uid_proyecto;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capacidad_equipo`
--

CREATE TABLE `capacidad_equipo` (
  `id_capacidad_equipo` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `tiempo_perdido` decimal(6,1) DEFAULT NULL,
  `errores_registro` decimal(6,1) DEFAULT NULL,
  `overhead` decimal(6,1) DEFAULT NULL,
  `productivas` decimal(6,1) DEFAULT NULL,
  `operativos` decimal(6,1) DEFAULT NULL,
  `humano` decimal(6,1) DEFAULT NULL,
  `cmmi` decimal(6,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `capacidad_equipo`
--

INSERT INTO `capacidad_equipo` (`id_capacidad_equipo`, `id_proyecto`, `tiempo_perdido`, `errores_registro`, `overhead`, `productivas`, `operativos`, `humano`, `cmmi`) VALUES
(19, 20020, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caso_de_uso`
--

CREATE TABLE `caso_de_uso` (
  `id_caso_de_uso` int(11) NOT NULL,
  `nombre_caso_de_uso` varchar(200) DEFAULT NULL,
  `id_iteracion` int(11) NOT NULL,
  `epic` varchar(200) DEFAULT NULL,
  `valor` decimal(10,0) DEFAULT NULL,
  `status_caso` varchar(30) DEFAULT NULL,
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `caso_de_uso`
--

INSERT INTO `caso_de_uso` (`id_caso_de_uso`, `nombre_caso_de_uso`, `id_iteracion`, `epic`, `valor`, `status_caso`, `id_proyecto`) VALUES
(54, 'CU2', 9, 'epic cdu', '3', 'Pendiente', 20020);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caso_de_uso_fase_tarea`
--

CREATE TABLE `caso_de_uso_fase_tarea` (
  `id_caso_de_uso` int(11) NOT NULL,
  `id_fase` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `maximo` decimal(6,2) DEFAULT NULL,
  `airtable` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `caso_de_uso_fase_tarea`
--

INSERT INTO `caso_de_uso_fase_tarea` (`id_caso_de_uso`, `id_fase`, `id_tarea`, `id_proyecto`, `maximo`, `airtable`) VALUES
(54, 58001, 40051, 20020, '0.00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fase`
--

CREATE TABLE `fase` (
  `id_fase` int(11) NOT NULL,
  `nombre_fase` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fase`
--

INSERT INTO `fase` (`id_fase`, `nombre_fase`) VALUES
(58000, 'Analisis'),
(58001, 'Diseño'),
(58002, 'Implementacion'),
(58003, 'Pruebas'),
(58004, 'Despliegue');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iteracion`
--

CREATE TABLE `iteracion` (
  `id_iteracion` int(11) NOT NULL,
  `nombre_iteracion` varchar(30) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `iteracion`
--

INSERT INTO `iteracion` (`id_iteracion`, `nombre_iteracion`, `id_proyecto`, `fechaInicio`, `fechaFin`) VALUES
(9, 'IT1', 20020, '2021-04-29', '2021-05-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegio`
--

CREATE TABLE `privilegio` (
  `id_privilegio` int(11) NOT NULL,
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
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `multiplicador` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre_proyecto`, `descripcion`, `imagen`, `fecha`, `multiplicador`) VALUES
(20020, '20020 ', 'delete proyecto ', '2021-04-29T15-02-08.989Z-cjgrovest.jpeg', '2021-04-29 15:02:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_usuario`
--

CREATE TABLE `proyecto_usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `tiempo_por_semana` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto_usuario`
--

INSERT INTO `proyecto_usuario` (`id_usuario`, `id_proyecto`, `tiempo_por_semana`) VALUES
(10000, 20020, NULL),
(10004, 20020, NULL),
(10005, 20020, NULL),
(10006, 20020, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(78000, 'miembro'),
(78001, 'externo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_privilegio`
--

CREATE TABLE `rol_privilegio` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int(11) NOT NULL,
  `id_fase` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `nombre_tarea` varchar(300) DEFAULT NULL,
  `ap_1` decimal(5,2) DEFAULT NULL,
  `ap_2` decimal(5,2) DEFAULT NULL,
  `ap_3` decimal(5,2) DEFAULT NULL,
  `ap_5` decimal(5,2) DEFAULT NULL,
  `ap_8` decimal(5,2) DEFAULT NULL,
  `ap_13` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `id_fase`, `id_proyecto`, `nombre_tarea`, `ap_1`, `ap_2`, `ap_3`, `ap_5`, `ap_8`, `ap_13`) VALUES
(40051, 58001, 20020, 'practica', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contraseña` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `nombre`, `contraseña`) VALUES
(10000, 'admin', 'admin', '$2a$12$CFjij1JVmD1ZAuj19KnMWuxDZvB1NClbyyD5Y50FfkHF.qA3QIhoC'),
(10002, 'diego', 'Diego', '$2a$12$bIZ9Dds2xNntfnPTM3H.nuNrCfa04papACdQb88RL8ZlK/V0K7wKe'),
(10003, 'david', 'david', '$2a$12$voTNjKuj7scJ2STLNcPb0ex1oLhhB9geoZHPAoyOSlJHzoa95wTH.'),
(10004, 'enrique', 'enrique', '$2a$12$eWylBbsiT8PC4tQI5yHnCOiQ/T57FuLZHeZWfpjTpy8Mf9.mL6OuO'),
(10005, 'leo', 'leo', '$2a$12$sg241.V7o9mNyXWAmWGUre04Bj.gUPQs1T3mQ/Y/PDpFTOziIfKJe'),
(10006, 'emilio', 'emilio', '$2a$12$vp9A1i2aIfQU52eLeHNZ1.OH2SNIzLkovB0U2QiRyBLv0KMr.jdCa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_rol`
--

CREATE TABLE `usuario_rol` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_rol`
--

INSERT INTO `usuario_rol` (`id_usuario`, `id_rol`) VALUES
(10000, 78000),
(10002, 78000),
(10003, 78000),
(10004, 78000),
(10005, 78000),
(10006, 78000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `work_item_list`
--

CREATE TABLE `work_item_list` (
  `id_work_item` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `Nombre` varchar(500) DEFAULT NULL,
  `Estado` varchar(200) DEFAULT NULL,
  `Estimacion` decimal(10,2) DEFAULT NULL,
  `Duracion` decimal(10,2) DEFAULT NULL,
  `FechaFin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capacidad_equipo`
--
ALTER TABLE `capacidad_equipo`
  ADD PRIMARY KEY (`id_capacidad_equipo`,`id_proyecto`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  ADD PRIMARY KEY (`id_caso_de_uso`),
  ADD KEY `id_proyecto` (`id_proyecto`),
  ADD KEY `caso_de_uso_ibfk_2` (`id_iteracion`);

--
-- Indices de la tabla `caso_de_uso_fase_tarea`
--
ALTER TABLE `caso_de_uso_fase_tarea`
  ADD PRIMARY KEY (`id_caso_de_uso`,`id_fase`,`id_tarea`,`id_proyecto`),
  ADD KEY `id_fase` (`id_fase`),
  ADD KEY `id_tarea` (`id_tarea`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `fase`
--
ALTER TABLE `fase`
  ADD PRIMARY KEY (`id_fase`);

--
-- Indices de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD PRIMARY KEY (`id_iteracion`),
  ADD KEY `id_proyecto` (`id_proyecto`);

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
  ADD PRIMARY KEY (`id_tarea`,`id_fase`,`id_proyecto`),
  ADD KEY `id_fase` (`id_fase`),
  ADD KEY `id_proyecto` (`id_proyecto`);

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
-- Indices de la tabla `work_item_list`
--
ALTER TABLE `work_item_list`
  ADD PRIMARY KEY (`id_work_item`,`id_proyecto`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capacidad_equipo`
--
ALTER TABLE `capacidad_equipo`
  MODIFY `id_capacidad_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  MODIFY `id_caso_de_uso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `fase`
--
ALTER TABLE `fase`
  MODIFY `id_fase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58005;

--
-- AUTO_INCREMENT de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  MODIFY `id_iteracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id_privilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80000;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20022;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78002;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40052;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;

--
-- AUTO_INCREMENT de la tabla `work_item_list`
--
ALTER TABLE `work_item_list`
  MODIFY `id_work_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `capacidad_equipo`
--
ALTER TABLE `capacidad_equipo`
  ADD CONSTRAINT `capacidad_equipo_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  ADD CONSTRAINT `caso_de_uso_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`),
  ADD CONSTRAINT `caso_de_uso_ibfk_2` FOREIGN KEY (`id_iteracion`) REFERENCES `iteracion` (`id_iteracion`);

--
-- Filtros para la tabla `caso_de_uso_fase_tarea`
--
ALTER TABLE `caso_de_uso_fase_tarea`
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_1` FOREIGN KEY (`id_caso_de_uso`) REFERENCES `caso_de_uso` (`id_caso_de_uso`),
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_2` FOREIGN KEY (`id_fase`) REFERENCES `fase` (`id_fase`),
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_3` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id_tarea`),
  ADD CONSTRAINT `caso_de_uso_fase_tarea_ibfk_4` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD CONSTRAINT `iteracion_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

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
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_fase`) REFERENCES `fase` (`id_fase`),
  ADD CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Filtros para la tabla `usuario_rol`
--
ALTER TABLE `usuario_rol`
  ADD CONSTRAINT `usuario_rol_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `usuario_rol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

--
-- Filtros para la tabla `work_item_list`
--
ALTER TABLE `work_item_list`
  ADD CONSTRAINT `work_item_list_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
