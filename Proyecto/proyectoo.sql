-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2021 a las 22:09:19
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteProyecto` (IN `uid_proyecto` INT(11))  BEGIN
DELETE from capacidad_equipo where id_proyecto = uid_proyecto;
 DELETE from caso_de_uso_fase_tarea where id_proyecto = uid_proyecto;
 DELETE from caso_de_uso where id_proyecto = uid_proyecto;
 DELETE from tareas where id_proyecto = uid_proyecto;
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
(22, 20023, '15.0', '5.0', '25.0', '50.0', '30.0', '10.0', '10.0');

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
(55, 'Autenticarse en el sistema', 10, 'login', '3', 'Terminado', 20023),
(56, 'Registrar proyecto', 10, 'registro', '5', 'Terminado', 20023),
(57, 'Modificar proyecto', 10, 'modificar', '8', 'Terminado', 20023),
(58, 'Consultar proyectos', 11, 'Visualizacion', '2', 'Terminado', 20023),
(59, 'Registrar tarea', 11, 'registro', '8', 'Terminado', 20023),
(60, 'Modificar tarea', 11, 'modificar', '3', 'Terminado', 20023),
(61, 'Generar reporte', 12, 'reportes', '13', 'Pendiente', 20023);

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
(55, 58000, 40052, 20023, '29.00', 1),
(55, 58001, 40054, 20023, '44.00', 1),
(55, 58002, 40056, 20023, '64.00', 1),
(55, 58002, 40057, 20023, '54.00', 1),
(55, 58003, 40058, 20023, '25.00', 1),
(55, 58003, 40059, 20023, '50.00', 1),
(55, 58003, 40060, 20023, '50.00', 1),
(55, 58004, 40061, 20023, '38.00', 1),
(55, 58004, 40062, 20023, '35.00', 1),
(56, 58000, 40052, 20023, '45.00', 1),
(56, 58000, 40053, 20023, '26.00', 1),
(56, 58001, 40054, 20023, '61.00', 1),
(56, 58001, 40055, 20023, '48.00', 1),
(56, 58002, 40056, 20023, '97.00', 1),
(56, 58002, 40057, 20023, '86.00', 1),
(56, 58003, 40058, 20023, '32.00', 1),
(56, 58003, 40059, 20023, '80.00', 1),
(56, 58003, 40060, 20023, '80.00', 1),
(56, 58004, 40061, 20023, '49.00', 1),
(56, 58004, 40062, 20023, '46.00', 1),
(57, 58000, 40052, 20023, '66.00', 1),
(57, 58000, 40053, 20023, '37.00', 1),
(57, 58001, 40055, 20023, '59.00', 1),
(57, 58002, 40056, 20023, '141.00', 1),
(57, 58002, 40057, 20023, '128.00', 1),
(57, 58003, 40058, 20023, '39.00', 1),
(57, 58003, 40059, 20023, '120.00', 1),
(57, 58003, 40060, 20023, '120.00', 1),
(58, 58000, 40052, 20023, '18.00', 1),
(58, 58000, 40053, 20023, '14.40', 1),
(58, 58002, 40056, 20023, '50.00', 1),
(58, 58002, 40057, 20023, '45.00', 1),
(58, 58003, 40058, 20023, '18.00', 1),
(58, 58003, 40059, 20023, '36.00', 1),
(58, 58003, 40060, 20023, '36.00', 1),
(58, 58004, 40061, 20023, '30.00', 1),
(58, 58004, 40062, 20023, '27.00', 1),
(59, 58000, 40052, 20023, '66.00', 1),
(59, 58001, 40054, 20023, '79.00', 1),
(59, 58001, 40055, 20023, '59.00', 1),
(59, 58002, 40056, 20023, '141.00', 1),
(59, 58002, 40057, 20023, '128.00', 1),
(59, 58003, 40059, 20023, '120.00', 1),
(59, 58003, 40060, 20023, '120.00', 1),
(60, 58000, 40052, 20023, '29.00', 1),
(60, 58000, 40053, 20023, '20.00', 1),
(60, 58001, 40055, 20023, '38.00', 1),
(60, 58002, 40056, 20023, '64.00', 1),
(60, 58002, 40057, 20023, '54.00', 1),
(60, 58003, 40058, 20023, '25.00', 1),
(60, 58003, 40059, 20023, '50.00', 1),
(60, 58003, 40060, 20023, '50.00', 1),
(61, 58002, 40056, 20023, '196.00', 1),
(61, 58002, 40057, 20023, '166.00', 1),
(61, 58003, 40058, 20023, '44.00', 1),
(61, 58003, 40059, 20023, '150.00', 1),
(61, 58003, 40060, 20023, '150.00', 1),
(61, 58004, 40061, 20023, '86.00', 1),
(61, 58004, 40062, 20023, '83.00', 1);

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
(10, 'Avance 1', 20023, '2021-02-08', '2021-02-19'),
(11, 'Avance 2', 20023, '2021-02-15', '2021-02-26'),
(12, 'Avance 3', 20023, '2021-03-01', '2021-03-05'),
(13, 'Avance 4', 20023, '2021-03-08', '2021-03-26'),
(14, 'Avance 5', 20023, '2021-03-26', '2021-04-16');

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
(20023, 'Project Manager', 'Es una herramienta de gestión de proyectos que permite a las organización de natgas gestionar tareas, proyectos y trabajo en equipo; para que de esa manera se pueda evitar el uso de material externo, como es excel y word. Cabe recalcar que se tiene una conexión exitosa con airtable.', '2021-04-29T16-47-10.352Z-project-manager-para-empresas.png', '2021-04-29 16:47:10', '1.50');

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
(10000, 20023, '100.00');

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
(78000, 'miembro natdev\r\n'),
(78001, 'stakeholder\r\n');

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
(40052, 58000, 20023, 'Definición de requerimientos', '10.80', '18.00', '29.00', '45.00', '66.00', '92.00'),
(40053, 58000, 20023, 'Verificación con stakeholders', '10.00', '14.40', '20.00', '26.00', '37.00', '44.00'),
(40054, 58001, 20023, 'MOCKUP', '24.40', '32.00', '44.00', '61.00', '79.00', '97.00'),
(40055, 58001, 20023, 'Algoritmo / D.Actividad', '21.80', '27.80', '38.00', '48.00', '59.00', '75.00'),
(40056, 58002, 20023, 'Front end', '42.00', '50.00', '64.00', '97.00', '141.00', '196.00'),
(40057, 58002, 20023, 'Back end', '37.00', '45.00', '54.00', '86.00', '128.00', '166.00'),
(40058, 58003, 20023, 'Usabilidad', '13.00', '18.00', '25.00', '32.00', '39.00', '44.00'),
(40059, 58003, 20023, 'Test front', '28.00', '36.00', '50.00', '80.00', '120.00', '150.00'),
(40060, 58003, 20023, 'Test back', '28.00', '36.00', '50.00', '80.00', '120.00', '150.00'),
(40061, 58004, 20023, 'Despliegue front', '22.00', '30.00', '38.00', '49.00', '67.00', '86.00'),
(40062, 58004, 20023, 'Despliegue Back', '19.00', '27.00', '35.00', '46.00', '64.00', '83.00');

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capacidad_equipo`
--
ALTER TABLE `capacidad_equipo`
  MODIFY `id_capacidad_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `caso_de_uso`
--
ALTER TABLE `caso_de_uso`
  MODIFY `id_caso_de_uso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `fase`
--
ALTER TABLE `fase`
  MODIFY `id_fase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58005;

--
-- AUTO_INCREMENT de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  MODIFY `id_iteracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id_privilegio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80000;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20024;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78002;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40063;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
