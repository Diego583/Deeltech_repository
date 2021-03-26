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
} 