--Ejercicio1--
--Actrices de “Las brujas de Salem”.--
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
--Nombres de los actores que aparecen en películas producidas por MGM en 1995.--

SELECT nombre
FROM Elenco E, Pelicula P
WHERE E.titulo = P.titulo and E.año = P.año
AND nomestudio = 'MGM' and año = 1995

SELECT nombre
FROM Elenco
WHERE año in (
SELECT año
FROM Pelicula
WHERE nomestudio='MGM' and año=1995
)

--Ejercicio3--
--Películas que duran más que “Lo que el viento se llevó” (de 1939).--
SELECT titulo
FROM Pelicula, Pelicula AS Peli
WHERE Peli.titulo = "Lo que el viento se llevó" 
AND Peli.año = 1939 
AND  Pelicula.duracion > Peli.duracion

SELECT titulo
FROM Pelicula
WHERE duracion>(
SELECT duracion
FROM Pelicula
WHERE titulo='Lo que el viento se llevo' and año=1939
)

--Ejercicio4--
--Productores que han hecho más películas que George Lucas.--

Select p.nombre
From película as pe, productor as p 
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
--Nombres de los productores de las películas en las que ha aparecido Sharon Stone.--
SELECT Productor.nombre
FROM Productor, Pelicula, Elenco
WHERE Prductor.idproductor = Pelicula.idproductor
and Pelicula.titulo = Elenco.titulo and Elenco.año = Pelicula.año
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
--Título de las películas que han sido filmadas más de una vez--

SELECT titulo
FROM Peliculas
GROUP BY titulo
HAVING count(titulo)>1

SELECT titulo 
FROM Películas, (SELECT titulo AS t1 FROM Peliculas GROUP BY titulo HAVING count(titulo)>1 ) as t
WHERE Peliculas.titulo = t .t1