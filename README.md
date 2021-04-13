# Repositorio de DeelTech

David Guzmán Leyva A01706417

Diego Carrillo Torres A01612532

Diego Emilio Barrera Hernández A01366802

Enrique Santos Fraire A01705746

Leonardo Alvarado Menéndez A01705998


# Instrucciones de uso:

-1. Clonar el repositorio

-2. Se abre VS y la terminal de VS

-3. Se abre la carpeta "Proyecto" en la terminal 
  - ls: para ver lo archivos
  - cd: para abrir archivos

-4. Ya abierta la carpeta "Proyecto, hacer un "npm install"

-5. Identificar copia de base de datos:
  - Esta copia se encuentra en la carpeta "Proyecto"
  - Con el nombre "proyecto"

-6. Hacer copia de base de datos
  - Iniciar el servidor de Xampp
  - Acceder a MySQL
  -# Crear una nueva base de datos con el nombre "proyecto"
  - Se tendra que hacer un "ctrl + c" de la copia previamente identificada y "ctrl + v"

-7. Crear el archivo "airtable.js" en la carpeta "util" con el siguiente código

var Airtable = require('airtable');

module.exports = new Airtable({apiKey: 'keykb63i6wmy8nYC7'}).base('appigpq6U2yrVUY3w');

-8. Se guarda el archivo "airtable.js"

-9. Por último ya se podrá hacer el "npm start"


# ASPECTOS A CONSIDERAR

- RECUERDA QUE PARA QUE JALE DEBES TENER EL SERVIDOR DE XAMPP PRENDIDO!!!

- Se trabaja sobre "localhost:5000"

- Si julio tiene que ver este proyecto o si alguien conoce a julio, diganle que me marque -> 722 109 3984

# SI NO LLEGA A JALAR EL PROYECTO DESPUES DE ESTOS PASOS, MARCAR A LOS SIGUIENTES NUMEROS

- David Guzmán Leyva -> 427 110 3432

- Diego Carrillo Torres -> 444 178 5881

- Diego Emilio Barrera Hernández -> 722 109 3984

- Enrique Santos Fraire -> 427 104 2627

- Leonardo Alvarado Menéndez -> 735 276 2202
