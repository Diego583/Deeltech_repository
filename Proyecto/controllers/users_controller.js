exports.getLogin = (request, response, next) => {
    response.render('login', {
        titulo: 'Inicio de sesion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario;
    request.session.contraseña = request.body.password;

    response.redirect('/');
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        console.log('Logout');  
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};