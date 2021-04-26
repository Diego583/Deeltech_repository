-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-04-2021 a las 01:35:16
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
-- Base de datos: `proyectoo`
--

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
(4, 20005, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(40, 'diseño web', 1, 'diseño web', '1', 'Terminado', 20005),
(41, 'cola', 1, 'cola', '1', 'Pendiente', 20005),
(42, 'perritos', 2, 'perritos', '2', 'Pendiente', 20005);

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
(40, 58001, 40034, 20005, '0.00', 1),
(40, 58001, 40035, 20005, '14.50', 1),
(41, 58001, 40034, 20005, '25.00', 1),
(41, 58001, 40035, 20005, '14.50', 1),
(42, 58001, 40034, 20005, '0.00', 1),
(42, 58004, 40036, 20005, '12.00', 1);

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
(1, 'IT1', 20005, '2021-04-01', '2021-04-24'),
(2, 'IT2', 20005, '2021-03-01', '2021-04-17');

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
(20005, 'prueba', 'prueba', '2021-04-25T00-05-25.257Z-por-que-tener-una-pagina-web.png', '2021-04-25 00:05:25', NULL);

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
(10000, 20005, NULL);

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
(40034, 58001, 20005, 'arriba amlo', '25.00', '0.00', '0.00', '0.00', '0.00', '0.00'),
(40035, 58001, 20005, 'mamahuevo', '14.50', '0.00', '0.00', '0.00', '0.00', '0.00'),
(40036, 58004, 20005, 'emilio', '0.00', '12.00', '0.00', '0.00', '0.00', '0.00');

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
(10000, 'admin', 'admin', '$2a$12$CFjij1JVmD1ZAuj19KnMWuxDZvB1NClbyyD5Y50FfkHF.qA3QIhoC');

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
(10000, 78000);

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
  MODIFY `id_capacidad_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  MODIFY `id_caso_de_uso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `fase`
--
ALTER TABLE `fase`
  MODIFY `id_fase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58005;

--
-- AUTO_INCREMENT de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  MODIFY `id_iteracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id_privilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80000;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20006;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78002;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40037;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10002;

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
