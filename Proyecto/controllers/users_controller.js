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
                error: request.session.error,
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
};

exports.postRegister = (request, response, next) => {
    request.session.error = "";

    if (request.body.contraseña1 != request.body.contraseña2){
        request.session.error = "Las contraseñas no coinciden";
        response.redirect('/users/register');
    }

    else{
        const nuevo_usuario = new Usuario(request.body.nombre_usuario, request.body.nombre, request.body.contraseña1);
        nuevo_usuario.saveUser()
            .then(() => {
                nuevo_usuario.getIdUser(request.body.nombre_usuario)
                    .then(([rows,fieldData]) => {
                        var id_usuario = rows[0].id_usuario;
                        //console.log(id_usuario);
                        //console.log(request.body.rol);
                        nuevo_usuario.saveUserRol(id_usuario, request.body.rol);
                        response.redirect('/');
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    }
}

exports.getUpdate = (request, response, next) => {
    response.render('update', {
        userRol: request.session.rol,
        csrfToken: request.csrfToken(),
        titulo: 'Modificar Usuario',
        error: request.session.error,
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postUpdate = (request, response, next) => {
    request.session.error = "";
    const username = request.body.nombre_usuario_nuevo;

    Usuario.fetchOne(request.body.nombre_usuario_nuevo)
    .then(([rows,fieldData]) => {
        if(rows.length > 0){
            request.session.error = "El usuario ya está en uso";
            response.redirect('/users/update');
        }

        else if (request.body.contraseña1 != request.body.contraseña2){
            request.session.error = "Las contraseñas no coinciden";
            response.redirect('/users/update');
        }

        else{
            console.log(request.body.nombre_usuario_nuevo);
            Usuario.updateUser(request.body.nombre_usuario_nuevo, request.body.nombre, request.body.contraseña1, request.session.usuario)
            .then(() => {
                request.session.isLoggedIn = true;
                request.session.usuario = username;
                return request.session.save(err => {
                    response.redirect('/');
                });
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
};