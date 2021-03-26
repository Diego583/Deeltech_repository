const Usuario = require('../models/user');
const Proyecto = require('../models/proyecto');

exports.getReportes = (request, response, next) => {
    response.render('reportes', {
        userRol: request.session.rol,
        titulo: 'Reportes',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getPlaneacion = (request, response, next) => {
    response.render('planeacion', {
        userRol: request.session.rol,
        titulo: 'Planeacion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getWbs = (request, response, next) => {
    response.render('wbs', {
        userRol: request.session.rol,
        titulo: 'WBS',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getCapacidadEquipo = (request, response, next) => {
    response.render('capacidadEquipo', {
        userRol: request.session.rol,
        titulo: 'Capacidad de Equipo',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getCasoUso = (request, response, next) => {
    response.render('casoUso', {
        userRol: request.session.rol,
        titulo: 'Caso de Uso',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};
exports.getNuevoProyecto = (request, response, next) => {
    Usuario.fetchUsers()
        .then(([rows,fieldData]) => {
            response.render('nuevoProyecto', {
                userRol: request.session.rol,
                users: rows, 
                titulo: 'Nuevo Proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
};

exports.postNuevoProyecto = (request, response, next) => {
    console.log(request.body.nombre_proyecto);
    console.log(request.body.descripcion);
    console.log(request.body.imagen);
    console.log(request.body.users);
    let arrUsers = request.body.users;

    const nuevo_proyecto = new Proyecto(request.body.nombre_proyecto, request.body.descripcion, request.body.imagen);
    nuevo_proyecto.saveProyecto()
        .then(() => {
            for (var i = 0; i < arrUsers.length; i++) {
                console.log(arrUsers[i]);
                nuevo_proyecto.saveProyectoUser(arrUsers[i]);
            }
            response.redirect('/proyectos');
        }).catch(err => console.log(err));
}

exports.get = (request, response, next) => { 
    Usuario.getRol(request.session.usuario)
    .then(([rows,fieldData]) => {
        request.session.rol = rows[0].id_rol;
        console.log(request.session);
        response.render('proyectos', {
            userRol: request.session.rol, 
            titulo: 'Proyectos',
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });
    }).catch(err => console.log(err));
};