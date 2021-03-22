CREATE TABLE Usuario(
	nombre_usuario varchar(50) NOT NULL,
    nombre varchar(50),
    contraseña varchar(50) ,
    Tiempo_por_semana numeric(6,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
);

CREATE TABLE Rol(
    id_rol numeric(10) NOT NULL,
    nombre varchar(100),
);

CREATE TABLE Privilegio(
    id_privilegio numeric(10) NOT NULL,
    privilegio varchar(100),
);

CREATE TABLE Rol_Privilegio(
    id_rol numeric(10) NOT NULL,
    id_privilegio numeric(10) NOT NULL,
);

CREATE TABLE Usuario_Rol(
	nombre_usuario varchar(50) NOT NULL,
    id_rol numeric(10) NOT NULL,
);

CREATE TABLE Proyecto(
	id_proyecto numeric(10) NOT NULL,
    nombre_proyecto varchar(100) ,
    descripción varchar(300),
    imagen varchar(400),

);

CREATE TABLE Proyecto_Usuario(
	nombre_usuario varchar(50) NOT NULL,
    id_proyecto numeric(10) NOT NULL,
    fecha datetime,
   
);

CREATE TABLE Puntos_Agiles( -- CHECAR SI SE AGREGA (id_valor, punto_agil, valor)
	id_Valor numeric(10) NOT NULL,
    Valor numeric(10) ,

);

CREATE TABLE Caso_de_uso(
	id_caso_de_uso numeric(10) NOT NULL,
    nombre_caso_de_uso varchar(200),
	iteracion numeric(10),
	epic varchar(50),
    id_Valor numeric(10),
    id_proyecto numeric(10),
);

CREATE TABLE Fase(
	id_fase numeric(10) NOT NULL,
    nombre_fase varchar(50),
    
);

CREATE TABLE Tareas(
	id_tarea numeric(10) NOT NULL,
    nombre_tarea varchar(50),
    status_tarea varchar(20),
);

CREATE TABLE Caso_de_Uso_Fase_Tarea(
    id_caso_de_uso numeric(10) NOT NULL,
    id_fase numeric(10) NOT NULL,
	id_tarea numeric(10) NOT NULL, --SE AGREGÓ
	maximo numeric(6,2),
);

CREATE TABLE Usuario_Tareas( -- CHECAR SI SE AGREGA EL id_proyecto
	nombre_usuario varchar(50) NOT NULL,
    id_tarea numeric(10) NOT NULL,
    tiempo_real numeric(6,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
);


-----------------------------------------------------------DEFINIR LLAVE PRIMARIA------------------------------------------------------------------------
ALTER TABLE Usuario add constraint llaveUsuario PRIMARY KEY (nombre_usuario)
ALTER TABLE Proyecto add constraint llaveProyecto PRIMARY KEY (id_proyecto)

ALTER TABLE Rol add constraint llaveRol PRIMARY KEY (id_rol)
ALTER TABLE Privilegio add constraint llavePrivilegio PRIMARY KEY (id_privilegio)
ALTER TABLE Rol_Privilegio add constraint llaveRol_Privilegio PRIMARY KEY (id_rol, id_privilegio)
ALTER TABLE Usuario_Rol add constraint llaveUsuario_Rol PRIMARY KEY (nombre_usuario, id_rol)

ALTER TABLE Proyecto_Usuario add constraint llaveProyecto_Usuario PRIMARY KEY (id_proyecto, nombre_usuario)
ALTER TABLE Puntos_Agiles add constraint llavePuntos_Agiles PRIMARY KEY (id_Valor)
ALTER TABLE Caso_de_uso add constraint llaveCaso_de_uso PRIMARY KEY (id_caso_de_uso)
ALTER TABLE Fase add constraint llaveFase PRIMARY KEY (id_fase)
ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint llaveCaso_de_Uso_Fase_Tarea PRIMARY KEY (id_caso_de_uso, id_fase, id_tarea)
ALTER TABLE Tareas add constraint llaveTareas PRIMARY KEY (id_tarea)
ALTER TABLE Usuario_Tareas add constraint llaveUsuario_Tareas PRIMARY KEY (nombre_usuario, id_tarea)
-------------------------------------------------------------FIN LLAVE PRIMARIA--------------------------------------------------------------------------


-----------------------------------------------------------DEFINIR LLAVES FORANEAS-----------------------------------------------------------------------
 ALTER TABLE Proyecto_Usuario add constraint cfProy_Usua_idusua foreign key (nombre_usuario) references Usuario(nombre_usuario);
 ALTER TABLE Proyecto_Usuario add constraint cfProy_Usua_idproy foreign key (id_proyecto) references Proyecto(id_proyecto);

 ALTER TABLE Usuario_Rol add constraint cfUsuarioRol_usuario foreign key (nombre_usuario) references Usuario(nombre_usuario);
 ALTER TABLE Usuario_Rol add constraint cfUsuarioRol_rol foreign key (id_rol) references Rol(id_rol);

 ALTER TABLE Rol_Privilegio add constraint cfRolPriv_privilegio foreign key (id_privilegio) references Privilegio(id_privilegio);
 ALTER TABLE Rol_Privilegio add constraint cfRolPriv_rol foreign key (id_rol) references Rol(id_rol)

 ALTER TABLE Caso_de_uso add constraint cfCaso_Uso_idvalor foreign key (id_Valor) references Puntos_Agiles(id_Valor);
 ALTER TABLE Caso_de_uso add constraint cfCaso_Uso_idproy foreign key (id_proyecto) references Proyecto(id_proyecto);

 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idCaso foreign key (id_caso_de_uso) references Caso_de_uso(id_caso_de_uso);
 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idFase foreign key (id_fase) references Fase(id_fase);
 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idTarea foreign key (id_tarea) references Tareas(id_tarea);

 ALTER TABLE Usuario_Tareas add constraint cfUsuarioTarea_idUsua foreign key (nombre_usuario) references Usuario(nombre_usuario);
 ALTER TABLE Usuario_Tareas add constraint cfUsuarioTarea_idTarea foreign key (id_tarea) references Tareas(id_tarea);
 --------------------------------------------------------------FIN LLAVES FORANEAS-----------------------------------------------------------------------



-----------------------------------------------------------PARA CAMBIO DE INFORMACIÓN-------------------------------------------------------------
--VER DATOS DE LA TABLA--
sp_help Fase
sp_help Usuario_Tareas


--CAMBIAR TIPO DE DATO--
ALTER TABLE Historias_de_Usuarios ALTER COLUMN Fecha_liberacion varchar(30)

ALTER TABLE Tareas ALTER COLUMN minimo numeric (6,2)
ALTER TABLE Tareas ALTER COLUMN maximo numeric (6,2)
ALTER TABLE Usuario_Tareas ALTER COLUMN tiempo_real numeric (6,2)
ALTER TABLE Usuario ALTER COLUMN Tiempo_por_semana numeric (6,2)

ALTER TABLE Caso_de_uso ALTER COLUMN nombre_caso_de_uso varchar (200)



--ELIMINAR TABLAS--
drop TABLE Proyecto_Usuario
drop TABLE Caso_de_Uso_Fase_Tarea
drop TABLE Fase
drop TABLE Caso_de_uso
drop TABLE Proyecto
drop TABLE Puntos_Agiles
drop TABLE Usuario_Tareas
drop TABLE Usuario
drop TABLE Tareas
drop TABLE Privilegio
drop TABLE Rol
drop TABLE Rol_Privilegio
drop TABLE Usuario_Rol

DELETE FROM Usuario
DELETE FROM Proyecto
DELETE FROM Proyecto_Usuario
DELETE FROM Puntos_Agiles
DELETE FROM Caso_de_uso
DELETE FROM Fase
DELETE FROM Tareas
DELETE FROM Caso_de_Uso_Fase_Tarea
DELETE FROM Usuario_Tareas

sp_helpconstraint Usuario_Tareas

SELECT * FROM sys.fn_helpcollations()


-----------------------------------------------------LLENADO DE BASE DE DATOS----------------------------------------------------------------------
SET DATEFORMAT dmy -- especificar formato de la fecha

SELECT * FROM Usuario
SELECT * FROM Proyecto
SELECT * FROM Proyecto_Usuario
SELECT * FROM Puntos_Agiles
SELECT * FROM Caso_de_uso
SELECT * FROM Fase
SELECT * FROM Tareas
SELECT * FROM Caso_de_Uso_Fase_Tarea
SELECT * FROM Usuario_Tareas

INSERT INTO Fase values (653, 'mamá') ;

BULK INSERT Equip03.Equip03.[Usuario]
   FROM 'e:\wwwroot\Equip03\Usuario.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Proyecto]
   FROM 'e:\wwwroot\Equip03\Proyecto.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Proyecto_Usuario]
   FROM 'e:\wwwroot\Equip03\Proyecto_Usuario.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Puntos_Agiles]
   FROM 'e:\wwwroot\Equip03\Puntos_Agiles.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Caso_de_uso]
   FROM 'e:\wwwroot\Equip03\Caso_de_uso.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Fase]
   FROM 'e:\wwwroot\Equip03\Fase.csv'
   WITH
      (
         CODEPAGE = 'ACP ',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Tareas]
   FROM 'e:\wwwroot\Equip03\Tareas.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Caso_de_Uso_Fase_Tarea]
   FROM 'e:\wwwroot\Equip03\Caso_de_Uso_Fase.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)

BULK INSERT Equip03.Equip03.[Usuario_Tareas]
   FROM 'e:\wwwroot\Equip03\Usuario_Tareas.csv'
   WITH
      (
         CODEPAGE = 'ACP',
         FIELDTERMINATOR = ',',
         ROWTERMINATOR = '\n'
)
