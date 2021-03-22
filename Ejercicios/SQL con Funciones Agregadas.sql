SELECT nombre, SUM(sueldo) as 'Sueldo total' 
FROM Elenco 
GROUP BY nombre

--El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's.

SELECT nomestudio, SUM(presupuesto) AS 'TotalPrecio'
FROM peliculas, estudio
WHERE estudio.nomestudio = peliculas.nomestudio
GROUP BY nomestudio

--Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película.

SELECT nombre, AVG(sueldo) as promedio
FROM Elenco, Actor
WHERE Elenco.nombre = Actor.nombre AND sexo = 'masculino'
GROPI
HAVING AVG(sueldo) > 5000000
ORDER BY AVG(sueldo) DESC

--Título y año de producción de las películas con menor presupuesto. (Por ejemplo, la película de Titanic se ha producido en varias veces entre la lista de películas estaría la producción de Titanic y el año que fue filmada con menor presupuesto).

SELECT titulo, año, MIN(presupuesto) as presupuesto
FROM pelicula

SELECT E.RFC, E.Fecha, cantidad
FROM Entregan as E, (SELECT RFC, MIN(cantidad) as presupuesto FROM Entregan GROUP BY RFC) as T
WHERE E.cantidad = presupuesto and E.RFC = T.RFC

--Mostrar el sueldo de la actriz mejor pagada.

SELECT nombre, max(sueldo)
FROM elenco
WHERE sexo = 'mujer'
