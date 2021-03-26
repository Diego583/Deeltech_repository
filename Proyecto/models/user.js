const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User{
    constructor(nombre_usuario, nombre, contraseña, tiempo_por_semana, privilegios){
        this.nombre_usuario = nombre_usuario;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.tiempo_por_semana = tiempo_por_semana;
        this.privilegios = privilegios;
    }

    saveUser() {
        return bcrypt.hash(this.contraseña, 12)
            .then((password_encriptado) => {
                return db.execute('INSERT INTO usuario (nombre_usuario, nombre, contraseña) VALUES (?, ?, ?)',
                [this.nombre_usuario, this.nombre, password_encriptado]
            );
            }).catch(err => console.log(err));
    }

    saveUserRol(id_rol) {
        return db.execute('INSERT INTO  usuario_rol (nombre_usuario, id_rol) VALUES (?, ?)',
        [this.nombre_usuario, id_rol]);
    }

    static fetchRoles(){
        return db.execute('SELECT * FROM roles');
    }

    static fetchUsers(){
        return db.execute('SELECT * FROM usuario');
    }

    static getRol(nombre_usuario){
        return db.execute('SELECT * FROM usuario_rol WHERE nombre_usuario=?', [nombre_usuario]);
    }

    static fetchOne(nombre_usuario) {
        return db.execute('SELECT * FROM usuario WHERE nombre_usuario=?', [nombre_usuario]);
    }
} 