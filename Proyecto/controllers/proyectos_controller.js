const Usuario = require('../models/user');

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
    response.render('nuevoProyecto', {
        userRol: request.session.rol,
        titulo: 'Nuevo Proyecto',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postNuevoProyecto = (request, response, next) => {
    response.redirect('/proyectos');
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