const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Proyecto{
    constructor(nombre_proyecto, descripcion, imagen){
        this.nombre_proyecto = nombre_proyecto;
        this.descripcion = descripcion;
        this.imagen = imagen
    }

    saveProyecto() {
        return db.execute('INSERT INTO proyecto (nombre_proyecto, descripcion, imagen) VALUES (?, ?, ?)',
        [this.nombre_proyecto, this.descripcion, this.imagen]);
    }

    saveProyectoUser(nombre_usuario) {
        return db.execute('INSERT INTO  proyecto_usuario (nombre_usuario, nombre_proyecto) VALUES (?, ?)',
        [nombre_usuario, this.nombre_proyecto]);
    }

    static fetchProyectos(nombre_usuario){
        return db.execute('SELECT * FROM proyecto WHERE=?', [nombre_usuario]);
    }

    static fetchProyectosUsuario(nombre_usuario){
        return db.execute('SELECT P.nombre_proyecto, descripcion, imagen FROM proyecto_usuario AS PU,proyecto AS P WHERE PU.nombre_proyecto = P.nombre_proyecto AND nombre_usuario = ? ORDER BY fecha', [nombre_usuario]);
    }
} 