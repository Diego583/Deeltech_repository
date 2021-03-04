console.log("Corriendo servidor");

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//Rutas
const rutasUsers = require('./routes/users')

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

/* RUTA
app.get('/ruta', (request, response, next) => {
    response.render('ruta.ejs', {
        titulo: 'nombreTitulo',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});
*/

app.get('/inicio', (request, response, next) => {
    response.render('inicio', {
        titulo: 'Inicio',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/', (request, response, next) => {
    console.log(request.session);
    if(request.session.isLoggedIn === true ? true : false){
        response.redirect('/inicio');
    }
    else{
        response.redirect('/users/login')
    }
});

app.use( (request, response, next) => {
    response.status(404).render('404.ejs', {
        titulo: 'Nor found',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.listen(3000);