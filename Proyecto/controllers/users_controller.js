const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {
    response.render('login', {
        csrfToken: request.csrfToken(),
        titulo: 'Inicio de Sesion',
        error: request.session.error,
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postLogin = (request, response, next) => {
    request.session.error = "";
    const username = request.body.usuario;
    //console.log(username);
    Usuario.fetchOne(username)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {
                request.session.error = "El usuario y/o contraseña son incorrectas";
                response.redirect('/users/login');
            } else {
                //console.log(request.body.contraseña);
                //console.log(rows[0].contraseña);
                bcrypt.compare(request.body.contraseña, rows[0].contraseña)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.usuario = username;
                            return request.session.save(err => {
                                response.redirect('/');
                            });
                        }
                        request.session.error = "El usuario y/o contraseña son incorrectas";
                        response.redirect('/users/login');
                    }).catch(err => {
                        request.session.error = "El usuario y/o contraseña son incorrectas";
                        response.redirect('/users/login');
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.getRegister = (request, response, next) => {
    Usuario.fetchRoles()
        .then(([rows,fieldData]) => {
            response.render('register', {
                csrfToken: request.csrfToken(),
                userRol: request.session.rol,
                roles: rows, 
                titulo: 'Registrar nuevo usuario',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
};

exports.postRegister = (request, response, next) => {
    const nuevo_usuario = new Usuario(request.body.nombre_usuario, request.body.nombre, request.body.contraseña);
    nuevo_usuario.saveUser()
        .then(() => {
            console.log(request.body.rol);
            nuevo_usuario.saveUserRol(request.body.rol)
            response.redirect('/');
        }).catch(err => console.log(err));
}