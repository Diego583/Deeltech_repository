CREATE TABLE Usuario(
	id_usuario numeric(3) NOT NULL,
    nombre varchar(50),
    contraseña varchar(50) ,
    Tiempo_por_semana numeric(4,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
    
);

CREATE TABLE Proyecto(
	id_proyecto numeric(5) NOT NULL,
    nombre_proyecto varchar(50) ,
    descripción varchar(200),
    status_proyecto varchar(20),

);

CREATE TABLE Proyecto_Usuario(
	id_usuario numeric(3) NOT NULL,
    id_proyecto numeric(5) NOT NULL,
    fecha datetime,
   
);

CREATE TABLE Puntos_Agiles( -- CHECAR SI SE AGREGA (id_valor, punto_agil, valor)
	id_Valor numeric(3) NOT NULL,
    Valor numeric(20) ,

);

CREATE TABLE Caso_de_uso(
	id_caso_de_uso numeric(10) NOT NULL,
    nombre_caso_de_uso varchar(200),
    id_Valor numeric(3),
    id_proyecto numeric(5),
);

CREATE TABLE Historias_de_Usuarios(-- CHECAR SI SE DESEA "YO COMO" "QUIERO" "PARA"
	id_historias numeric(10) NOT NULL,
    iteración varchar(30),
    historia varchar(200),
    Fecha_liberacion varchar(30),
    fecha_levantamiento datetime,
    id_caso_de_uso numeric(10),
);

CREATE TABLE Fase(
	id_fase numeric(3) NOT NULL,
    nombre_fase varchar(30),
    
);

CREATE TABLE Tareas(
	id_tarea numeric(10) NOT NULL,
    nombre_tarea varchar(50),
    minimo numeric(4,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
    maximo numeric(4,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
    status_tareas varchar(20),
    --id_caso_de_uso_fase numeric(10),
);

CREATE TABLE Caso_de_Uso_Fase_Tarea(
	--id_caso_de_uso_fase numeric(10) NOT NULL,
    id_caso_de_uso numeric(10) NOT NULL,
    id_fase numeric(3) NOT NULL,
	id_tarea numeric(10) NOT NULL, --SE AGREGÓ
);

CREATE TABLE Criterios_de_Aceptacion(
	id_caso_de_prueba numeric(10) NOT NULL,
    descripción varchar(200),
    resultado_esperado varchar(50),
    notas varchar(200),
    id_caso_de_uso numeric(10),
);

CREATE TABLE Usuario_Tareas( -- CHECAR SI SE AGREGA EL id_proyecto
	id_usuario numeric(3) NOT NULL,
    id_tarea numeric(10) NOT NULL,
    tiempo_real numeric(4,2), -- CHECAR SI SE PUEDE PONER VAIRABLE 'TIME'
);


--DEFINIR LLAVE PRIMARIA--
ALTER TABLE Usuario add constraint llaveUsuario PRIMARY KEY (id_usuario)
ALTER TABLE Proyecto add constraint llaveProyecto PRIMARY KEY (id_proyecto)
ALTER TABLE Proyecto_Usuario add constraint llaveProyecto_Usuario PRIMARY KEY (id_proyecto, id_usuario)
ALTER TABLE Puntos_Agiles add constraint llavePuntos_Agiles PRIMARY KEY (id_Valor)
ALTER TABLE Caso_de_uso add constraint llaveCaso_de_uso PRIMARY KEY (id_caso_de_uso)
ALTER TABLE Historias_de_Usuarios add constraint llaveHistorias_de_Usuarios PRIMARY KEY (id_historias)
ALTER TABLE Fase add constraint llaveFase PRIMARY KEY (id_fase)
--ALTER TABLE Caso_de_Uso_Fase add constraint llaveCaso_de_Uso_Fase PRIMARY KEY (id_caso_de_uso_fase)
ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint llaveCaso_de_Uso_Fase_Tarea PRIMARY KEY (id_caso_de_uso, id_fase, id_tarea)
ALTER TABLE Criterios_de_Aceptacion add constraint llaveCriterios_de_Aceptacion PRIMARY KEY (id_caso_de_prueba)
ALTER TABLE Tareas add constraint llaveTareas PRIMARY KEY (id_tarea)
ALTER TABLE Usuario_Tareas add constraint llaveUsuario_Tareas PRIMARY KEY (id_usuario, id_tarea)

 --DEFINIR LLAVES FORANEAS--
 ALTER TABLE Proyecto_Usuario add constraint cfProy_Usua_idusua foreign key (id_usuario) references Usuario(id_usuario);
 ALTER TABLE Proyecto_Usuario add constraint cfProy_Usua_idproy foreign key (id_proyecto) references Proyecto(id_proyecto);

 ALTER TABLE Caso_de_uso add constraint cfCaso_Uso_idvalor foreign key (id_Valor) references Puntos_Agiles(id_Valor);
 ALTER TABLE Caso_de_uso add constraint cfCaso_Uso_idproy foreign key (id_proyecto) references Proyecto(id_proyecto);

 ALTER TABLE Historias_de_Usuarios add constraint cfHistorias_usuario_idCaso foreign key (id_caso_de_uso) references Caso_de_uso(id_caso_de_uso);

 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idCaso foreign key (id_caso_de_uso) references Caso_de_uso(id_caso_de_uso);
 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idFase foreign key (id_fase) references Fase(id_fase);
 ALTER TABLE Caso_de_Uso_Fase_Tarea add constraint cfCaso_Fase_idTarea foreign key (id_tarea) references Tareas(id_tarea);

 ALTER TABLE Criterios_de_Aceptacion add constraint cfCriterios_idCaso foreign key (id_caso_de_uso) references Caso_de_uso(id_caso_de_uso);

 --ALTER TABLE Tareas add constraint cfTarea_idCasoFase foreign key (id_caso_de_uso_fase) references Caso_de_Uso_Fase(id_caso_de_uso_fase);

 ALTER TABLE Usuario_Tareas add constraint cfUsuarioTarea_idUsua foreign key (id_usuario) references Usuario(id_usuario);
 ALTER TABLE Usuario_Tareas add constraint cfUsuarioTarea_idTarea foreign key (id_tarea) references Tareas(id_tarea);



-----------------------------------------------------------PARA CAMBIO DE INFORMACIÓN-------------------------------------------------------------
--VER DATOS DE LA TABLA--
sp_help Fase
sp_help Usuario_Tareas


--CAMBIAR TIPO DE DATO--
ALTER TABLE Historias_de_Usuarios ALTER COLUMN Fecha_liberacion varchar(30)

ALTER TABLE Tareas ALTER COLUMN minimo numeric (4,2)
ALTER TABLE Tareas ALTER COLUMN maximo numeric (4,2)
ALTER TABLE Usuario_Tareas ALTER COLUMN tiempo_real numeric (4,2)
ALTER TABLE Usuario ALTER COLUMN Tiempo_por_semana numeric (4,2)

ALTER TABLE Caso_de_uso ALTER COLUMN nombre_caso_de_uso varchar (200)



--ELIMINAR TABLAS--
drop TABLE Usuario
drop TABLE Proyecto
drop TABLE Proyecto_Usuario
drop TABLE Puntos_Agiles
drop TABLE Caso_de_uso
drop TABLE Historias_de_Usuarios
drop TABLE Fase
drop TABLE Tareas
drop TABLE Caso_de_Uso_Fase_Tarea
drop TABLE Criterios_de_Aceptacion
drop TABLE Usuario_Tareas

DELETE FROM Fase
DELETE FROM Usuario_Tareas

sp_helpconstraint Usuario_Tareas


-----------------------------------------------------LLENADO DE BASE DE DATOS----------------------------------------------------------------------
SET DATEFORMAT dmy -- especificar formato de la fecha

SELECT * FROM Usuario
SELECT * FROM Proyecto
SELECT * FROM Proyecto_Usuario
SELECT * FROM Puntos_Agiles
SELECT * FROM Caso_de_uso
SELECT * FROM Historias_de_Usuarios
SELECT * FROM Fase
SELECT * FROM Tareas
SELECT * FROM Caso_de_Uso_Fase_Tarea
SELECT * FROM Criterios_de_Aceptacion
SELECT * FROM Usuario_Tareas

INSERT INTO Caso_de_uso values (1019, 'Que al consultar la preaprobación la dirección se consulte con ayuda del api de google de direcciones', 302, 213) ;

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

BULK INSERT Equip03.Equip03.[Historias_de_Usuarios]
   FROM 'e:\wwwroot\Equip03\Historias_de_Usuarios.csv'
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
         CODEPAGE = 'ACP',
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

BULK INSERT Equip03.Equip03.[Criterios_de_Aceptacion]
   FROM 'e:\wwwroot\Equip03\Criterios_de_Aceptacion.csv'
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

--¿QUE ONDA CON EL UTF-8?
--TENEMOS PROBLEMA EN LA ÚLTIMA TABLA