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

    static saveCasoDeUso(nombre_caso_de_uso, iteracion, epic, valor, status, id_proyecto) {
        return db.execute('INSERT INTO caso_de_uso (nombre_caso_de_uso, iteracion, epic, valor, status_caso, id_proyecto) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre_caso_de_uso, iteracion, epic, valor, status, id_proyecto]);

    }

    static fetchProyectos(nombre_usuario){
        return db.execute('SELECT * FROM proyecto WHERE=?', [nombre_usuario]);
    }

    static fetchProyectosUsuario(nombre_usuario){
        return db.execute('SELECT P.nombre_proyecto, descripcion, imagen, P.id_proyecto FROM proyecto_usuario AS PU, proyecto AS P, usuario AS U WHERE PU.id_proyecto = P.id_proyecto AND PU.id_usuario = U.id_usuario AND U.nombre_usuario = ? ORDER BY fecha DESC', [nombre_usuario]);
    }

    static fetchProyectoUsuarioByName(nombre_proyecto, nombre_usuario){
        return db.execute('SELECT P.nombre_proyecto, descripcion, imagen, P.id_proyecto FROM proyecto_usuario AS PU, proyecto AS P, usuario AS U WHERE PU.id_proyecto = P.id_proyecto AND U.id_usuario = PU.id_usuario AND P.nombre_proyecto LIKE ? AND nombre_usuario = ? ORDER BY fecha DESC', ['%'+nombre_proyecto+'%', nombre_usuario]);
    }

    static fetchCasosDeUso(id_proyecto){
        return db.execute('SELECT * FROM caso_de_uso WHERE id_proyecto = ?',[id_proyecto]);
    }

    static updateStatusCaso(status, id_caso, id_proyecto){
        return db.execute('UPDATE caso_de_uso set status_caso = ? WHERE id_caso_de_uso = ? AND id_proyecto = ?', 
        [status, id_caso, id_proyecto]);
    }

    static updateCasoDeUso(idProyecto, idCaso, nuevoNombre, iteracion, epic, valor){
        return db.execute('UPDATE caso_de_uso SET nombre_caso_de_uso = ?, iteracion = ?, epic = ?, valor = ? WHERE id_proyecto = ? AND id_caso_de_uso = ?',
            [nuevoNombre, iteracion, epic, valor, idProyecto, idCaso]);
    }

    static deleteCasoDeUso(id_proyecto, id_caso){
        return db.execute('DELETE FROM caso_de_uso WHERE id_proyecto = ? AND id_caso_de_uso = ?',
            [id_proyecto, id_caso]);
    }
} 