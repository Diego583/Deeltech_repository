module.exports = (request, response, next) => {
    if (request.session.rol != 78000) {
        return response.redirect('/');
    }
    next();
}