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

exports.postRegister = (request, response, next) => {
    request.session.error = "";

    const nombre_usuario = request.body.nombre_usuario;
    const nombre = request.body.nombre;
    const contraseña1 = request.body.contraseña1;
    const contraseña2 = request.body.contraseña2;


    Usuario.fetchOne(request.body.nombre_usuario)
    .then(([rows,fieldData]) => {
        if(rows.length > 0){
            request.session.error = "El usuario ya está en uso";
            response.redirect('/');
        }

        else if (nombre_usuario.length < 1 || nombre.length < 1 || contraseña1.length < 1 || contraseña2.length < 1){
            request.session.error = "Te faltaron campos por llenar.";
            response.redirect('/');
        }

        else if (contraseña1 != contraseña2){
            request.session.error = "Las contraseñas no coinciden.";
            response.redirect('/');
        }

        else{
            const nuevo_usuario = new Usuario(nombre_usuario, nombre, contraseña1);
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
    }).catch(err => console.log(err));

}

exports.postUpdate = (request, response, next) => {
    request.session.error = "";
    const nombre = request.body.nombre;
    const nombreUsuario = request.body.nombre_usuario_nuevo;
    const contraseña1 = request.body.contraseña1;
    const contraseña2 = request.body.contraseña2;

    Usuario.fetchOne(nombreUsuario)
    .then(([rows,fieldData]) => {
        if(rows.length > 0){
            request.session.error = "El usuario ya está en uso";
            response.redirect('/');
        }

        else if (nombreUsuario.length < 1 || nombre.length < 1 || contraseña1.length < 1 || contraseña2.length < 1){
            request.session.error = "Te faltaron campos por llenar.";
            response.redirect('/');
        }

        else if (contraseña1 != contraseña2){
            request.session.error = "Las contraseñas no coinciden";
            response.redirect('/');
        }

        else{
            console.log(request.body.nombre_usuario_nuevo);
            Usuario.updateUser(nombreUsuario, nombre, contraseña1, request.session.usuario)
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