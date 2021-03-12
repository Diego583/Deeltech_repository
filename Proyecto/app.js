console.log("Corriendo servidor");

//Para redirigir en caso de no estar logeado
const isAuth = require('./util/is-auth');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');

const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

//Rutas
const rutasUsers = require('./routes/users')
const rutasProyectos = require('./routes/proyectos')

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Para acceder a los valores de las cookies
app.use(cookieParser());

//Para trabajar con sesiones
app.use(session({
    secret: 'kñsjdnrkncllñkm', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use('/users', rutasUsers);

app.use('/proyectos', rutasProyectos);

/* RUTA
app.get('/ruta', (request, response, next) => {
    response.render('ruta.ejs', {
        titulo: 'nombreTitulo',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});
*/

app.get('/', isAuth, (request, response, next) => {
    console.log(request.session);
    response.redirect('/proyectos');
});

app.use( (request, response, next) => {
    response.status(404).render('404', {
        titulo: 'Not found',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.listen(3000);