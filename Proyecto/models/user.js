const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User{
    constructor(nombre_usuario, nombre, contraseña){
        this.nombre_usuario = nombre_usuario;
        this.nombre = nombre;
        this.contraseña = contraseña;
    }

    saveUser() {
        return bcrypt.hash(this.contraseña, 12)
            .then((password_encriptado) => {
                //console.log(password_encriptado);
                return db.execute('INSERT INTO usuario (nombre_usuario, nombre, contraseña) VALUES (?, ?, ?)',
                [this.nombre_usuario, this.nombre, password_encriptado]
            );
            }).catch(err => console.log(err));
    }

    saveUserRol(id_usuario, id_rol) {
        return db.execute('INSERT INTO  usuario_rol (id_usuario, id_rol) VALUES (?, ?)',
        [id_usuario, id_rol]);
    }

    static fetchRoles(){
        return db.execute('SELECT * FROM roles');
    }

    static fetchUsers(){
        return db.execute('SELECT * FROM usuario');
    }

    getIdUser(nombre_usuario){
        return db.execute('SELECT id_usuario FROM usuario where nombre_usuario = ?', [nombre_usuario]);
    }

    static getRol(nombre_usuario){
        return db.execute('SELECT id_rol from usuario_rol as ur, usuario as u WHERE ur.id_usuario = u.id_usuario and u.nombre_usuario = ?', [nombre_usuario]);
    }

    static fetchOne(nombre_usuario) {
        return db.execute('SELECT * FROM usuario WHERE nombre_usuario=?', [nombre_usuario]);
    }

    static updateUser(nombre_usuario_nuevo, nombre, constraseña, nombre_usuario) { //NUEVO

        return bcrypt.hash(constraseña, 12)
            .then((password_encriptado) => {

                return db.execute('UPDATE usuario set nombre_usuario = ?, nombre = ?, contraseña = ? WHERE nombre_usuario = ?', 
                [nombre_usuario_nuevo, nombre, password_encriptado, nombre_usuario]

            );
            }).catch(err => console.log(err));
    }
} 