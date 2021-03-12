module.exports = (request, response, next) => {
    if (request.session.rol != 7001) {
        return response.redirect('/');
    }
    next();
}