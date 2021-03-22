--Ejercicio1--
--Actrices de �Las brujas de Salem�.--
SELECT nombre
FROM Actor A, Elenco E
WHERE Actor.nombre = Elenco.nombre
AND sexo = 'F' and titulo = 'Las brujas de Salem'

SELECT nombre
FROM Elenco
Where titulo = 'Las brujas de Salem'
AND nombre IN (
SELECT nombre
FROM Actor
Where sexo = 'F'
)

--Ejercicio2--
--Nombres de los actores que aparecen en pel�culas producidas por MGM en 1995.--

SELECT nombre
FROM Elenco E, Pelicula P
WHERE E.titulo = P.titulo and E.a�o = P.a�o
AND nomestudio = 'MGM' and a�o = 1995

SELECT nombre
FROM Elenco
WHERE a�o in (
SELECT a�o
FROM Pelicula
WHERE nomestudio='MGM' and a�o=1995
)

--Ejercicio3--
--Pel�culas que duran m�s que �Lo que el viento se llev� (de 1939).--
SELECT titulo
FROM Pelicula, Pelicula AS Peli
WHERE Peli.titulo = "Lo que el viento se llev�" 
AND Peli.a�o = 1939 
AND  Pelicula.duracion > Peli.duracion

SELECT titulo
FROM Pelicula
WHERE duracion>(
SELECT duracion
FROM Pelicula
WHERE titulo='Lo que el viento se llevo' and a�o=1939
)

--Ejercicio4--
--Productores que han hecho m�s pel�culas que George Lucas.--

Select p.nombre
From pel�cula as pe, productor as p 
Where p.idproductor = pe.idproductor
Group by p.nombre
Having count(p.nombre) > count('George Lucas')

SELECT Productor.nombre
FROM Productor, Pelicula
WHERE Pelicula.idproductor = Productor.idproductor
GROUP BY Productor.nombre
HAVING count(productor.nombre)>(
SELECT count(titulo)
FROM Pelicula, Productor
WHERE Pelicula.idproductor = Productor.idproductor
AND Productor.nombre = 'George Lucas'
)

--Ejercicio5--
--Nombres de los productores de las pel�culas en las que ha aparecido Sharon Stone.--
SELECT Productor.nombre
FROM Productor, Pelicula, Elenco
WHERE Prductor.idproductor = Pelicula.idproductor
and Pelicula.titulo = Elenco.titulo and Elenco.a�o = Pelicula.a�o
AND Elenco.nombre = 'Sharon Stone'

SELECT Productor.nombre
FROM Productor, Pelicula
WHERE Prductor.idproductor = Pelicula.idproductor
AND titulo in (
SELECT titulo
FROM Elenco
Where nombre = 'Sharon Stone'
)

--Ejercicio6--
--T�tulo de las pel�culas que han sido filmadas m�s de una vez--

SELECT titulo
FROM Peliculas
GROUP BY titulo
HAVING count(titulo)>1

SELECT titulo 
FROM Pel�culas, (SELECT titulo AS t1 FROM Peliculas GROUP BY titulo HAVING count(titulo)>1 ) as t
WHERE Peliculas.titulo = t .t1