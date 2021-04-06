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
        return db.execute('INSERT INTO proyecto_usuario (id_usuario, id_proyecto) VALUES ((SELECT id_usuario from usuario where nombre_usuario = ?), (SELECT id_proyecto from proyecto where nombre_proyecto = ?))',
        [nombre_usuario, this.nombre_proyecto]);
    }

    static fetchProyectos(nombre_usuario){
        return db.execute('SELECT * FROM proyecto WHERE=?', [nombre_usuario]);
    }

    static fetchProyectosUsuario(nombre_usuario){
        return db.execute('SELECT P.id_proyecto, P.nombre_proyecto, descripcion, imagen FROM proyecto_usuario AS PU, proyecto AS P, usuario AS U WHERE PU.id_proyecto = P.id_proyecto AND PU.id_usuario = U.id_usuario AND U.nombre_usuario = ? ORDER BY fecha DESC', [nombre_usuario]);
    }

    static fetchProyectoUsuarioByName(nombre_proyecto, nombre_usuario){
        return db.execute('SELECT P.nombre_proyecto, descripcion, imagen FROM proyecto_usuario AS PU, proyecto AS P, usuario AS U WHERE PU.id_proyecto = P.id_proyecto AND U.id_usuario = PU.id_usuario AND P.nombre_proyecto LIKE ? AND nombre_usuario = ? ORDER BY fecha DESC', ['%'+nombre_proyecto+'%', nombre_usuario]);
    }
} 