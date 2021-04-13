console.log("Corriendo servidor");

//Para redirigir en caso de no estar logeado
const isAuth = require('./util/is-auth');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');

const session = require('express-session');

const csrf = require('csurf');
const csrfProtection = csrf();

const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.set('views', 'views');

//Rutas
const rutasUsers = require('./routes/users')
const rutasProyectos = require('./routes/proyectos')

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Para carga de archivos
const multer = require('multer');

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos.
app.use(multer(
    { storage: fileStorage }
    //{ dest: 'uploads' }
    ).single('imagen'));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//Para acceder a los recursos de la carpeta uploads
app.use(express.static(path.join(__dirname, 'uploads')));

//Para acceder a los valores de las cookies
app.use(cookieParser());

//Para trabajar con sesiones
app.use(session({
    secret: 'kñsjdnrkncllñkm', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Para estar protegido ante CSRF
app.use(csrfProtection);

app.use(flash());

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
    response.redirect('/proyectos');
});

app.use( (request, response, next) => {
    response.status(404).render('404', {
        titulo: 'Not found',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.listen(process.env.PORT || 5000);