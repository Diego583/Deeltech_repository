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

    static fetchProyectoTareasAnalisis(id_proyecto){ // NUEVO: Busqueda de tareas en fase Analisis
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Analisis" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasDiseño(id_proyecto){ // NUEVO: Busqueda de tareas en fase Diseño
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Diseño" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasImplementacion(id_proyecto){ // NUEVO: Busqueda de tareas en fase Implementacion
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Implementacion" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasPruebas(id_proyecto){ // NUEVO: Busqueda de tareas en fase Pruebas
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Pruebas" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasDespliegue (id_proyecto){ // NUEVO: Busqueda de tareas en fase Despliegue
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Despliegue" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static savePracticaTrabajo(fase, id_proyecto, nombre_practica){ // NUEVO: Guardar practica de tarea 
        return db.execute('INSERT into tareas (id_fase, id_proyecto, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13) values (?, ?, ?, 0, 0, 0, 0, 0, 0)', 
        [fase, id_proyecto, nombre_practica]);
    }

    static fetchFases(){ //NUEVO: Mostrar las fases
        return db.execute('SELECT * FROM fase');
    }

    static updateTarea(ap_1, ap_2, ap_3, ap_5, ap_8, ap_13, id_tarea, id_proyecto){ //NUEVO: Se actualiza la tabla
        return db.execute('UPDATE tareas SET ap_1 = ?, ap_2 = ?, ap_3 = ?, ap_5 = ?, ap_8 = ?, ap_13 = ? WHERE id_tarea = ? AND id_proyecto = ?', 
        [ap_1, ap_2, ap_3, ap_5, ap_8, ap_13, id_tarea, id_proyecto]);
    }

    static fetchPromedioWbs(id_proyecto){ //NUEVO: Se muestra el promedio de la tabla WBS
        return db.execute('SELECT round(AVG(ap_1),1) as Total_1, round(AVG(ap_2),1) as Total_2, round(AVG(ap_3),1) as Total_3, round(AVG(ap_5),1) as Total_5, round(AVG(ap_8),1) as Total_8, round(AVG(ap_13),1) as Total_13 FROM tareas WHERE id_proyecto = ?', 
        [id_proyecto]);
    }

    static updateCasoDeUso(idProyecto, idCaso, nuevoNombre, iteracion, epic, valor){
        return db.execute('UPDATE caso_de_uso SET nombre_caso_de_uso = ?, iteracion = ?, epic = ?, valor = ? WHERE id_proyecto = ? AND id_caso_de_uso = ?',
            [nuevoNombre, iteracion, epic, valor, idProyecto, idCaso]);
    }

    static deleteCasoDeUso(id_proyecto, id_caso){
        return db.execute('DELETE FROM caso_de_uso WHERE id_proyecto = ? AND id_caso_de_uso = ?',
            [id_proyecto, id_caso]);
    }

    saveCapacidad_Equipo(nombre_proyecto, descripcion){
        return db.execute('Insert into capacidad_equipo (id_proyecto) values ((SELECT id_proyecto from proyecto where nombre_proyecto = ? and descripcion=?))', [nombre_proyecto, descripcion]);
    }

} 