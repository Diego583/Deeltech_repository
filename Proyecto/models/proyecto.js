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
        return db.execute('INSERT INTO caso_de_uso (nombre_caso_de_uso, id_iteracion, epic, valor, status_caso, id_proyecto) VALUES (?, ?, ?, ?, ?, ?)',
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
        return db.execute('SELECT * FROM caso_de_uso as cdu, iteracion as i WHERE i.id_iteracion=cdu.id_iteracion and i.id_proyecto = ? ORDER BY i.id_iteracion DESC',[id_proyecto]);
    }

    static updateStatusCaso(status, id_caso, id_proyecto){
        return db.execute('UPDATE caso_de_uso set status_caso = ? WHERE id_caso_de_uso = ? AND id_proyecto = ?', 
        [status, id_caso, id_proyecto]);
    }

    static fetchProyectoTareasAnalisis(id_proyecto){ // NUEVO: Busqueda de tareas en fase Analisis
        return db.execute('SELECT tareas.id_fase, fase.nombre_fase, id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Analisis" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasDiseño(id_proyecto){ // NUEVO: Busqueda de tareas en fase Diseño
        return db.execute('SELECT tareas.id_fase, fase.nombre_fase, id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Diseño" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasImplementacion(id_proyecto){ // NUEVO: Busqueda de tareas en fase Implementacion
        return db.execute('SELECT tareas.id_fase, fase.nombre_fase, id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Implementacion" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasPruebas(id_proyecto){ // NUEVO: Busqueda de tareas en fase Pruebas
        return db.execute('SELECT tareas.id_fase, fase.nombre_fase, id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Pruebas" AND proyecto.id_proyecto = ?', 
        [id_proyecto]);
    }

    static fetchProyectoTareasDespliegue (id_proyecto){ // NUEVO: Busqueda de tareas en fase Despliegue
        return db.execute('SELECT tareas.id_fase, fase.nombre_fase, id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13 FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND fase.nombre_fase = "Despliegue" AND proyecto.id_proyecto = ?', 
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
        return db.execute('UPDATE caso_de_uso SET nombre_caso_de_uso = ?, id_iteracion = ?, epic = ?, valor = ? WHERE id_proyecto = ? AND id_caso_de_uso = ?',
            [nuevoNombre, iteracion, epic, valor, idProyecto, idCaso]);
    }

    static deleteCasoDeUsoFaseTarea(id_proyecto, id_caso){
        return db.execute('DELETE FROM caso_de_uso_fase_tarea WHERE id_proyecto = ? AND id_caso_de_uso = ?',
        [id_proyecto, id_caso]);
    }

    static deleteCasoDeUso(id_proyecto, id_caso){
        return db.execute('DELETE FROM caso_de_uso WHERE id_proyecto = ? AND id_caso_de_uso = ?',
        [id_proyecto, id_caso]);
    }

    static deleteProyecto(id_proyecto){
        return db.execute('CALL `deleteProyecto`(?)',
        [id_proyecto]);
    }

    static incomingUsuarios(id_proyecto){
        return db.execute('SELECT U.id_usuario, nombre_usuario, id_proyecto FROM usuario U, proyecto_usuario P WHERE U.id_usuario = P.id_usuario',
        [id_proyecto]);
    }

    saveCapacidad_Equipo(nombre_proyecto, descripcion){
        return db.execute('Insert into capacidad_equipo (id_proyecto) values ((SELECT id_proyecto from proyecto where nombre_proyecto = ? and descripcion=?))', 
        [nombre_proyecto, descripcion]);
    }

    static modTarea(idProyecto, idFase, nombreFase, idTarea, nombreTarea){
        return db.execute('UPDATE tareas SET nombre_tarea = ?, id_fase = (SELECT id_fase FROM fase WHERE nombre_fase = ?) WHERE id_proyecto = ? AND id_fase = ? AND id_tarea = ?',
            [nombreTarea, nombreFase, idProyecto, idFase, idTarea]);
    }

    static modProyectoUsuario(idProyecto, id_usuario){
        return db.execute('INSERT INTO proyecto_usuario (id_usuario, id_proyecto) VALUES ((SELECT id_usuario from usuario where id_usuario = ?), (SELECT id_proyecto from proyecto where id_proyecto = ?))',
            [id_usuario, idProyecto]);
    }

    static modProyecto(idProyecto, nombre_proyecto, descripcion){
        return db.execute('UPDATE proyecto SET nombre_proyecto = ?, descripcion = ? WHERE id_proyecto = ?',
            [nombre_proyecto, descripcion, idProyecto]);
    }

    static deleteProyectoUsuario(id_proyecto){
        return db.execute('DELETE FROM proyecto_usuario WHERE id_proyecto = ?',
            [id_proyecto]);
    }

    static deletePracticaCFT(id_proyecto, id_fase, id_tarea){
        return db.execute('DELETE FROM caso_de_uso_fase_tarea WHERE id_proyecto = ? AND id_fase = ? AND id_tarea = ?',
            [id_proyecto, id_fase, id_tarea]);
    }

    static deletePracticaCFTplaneacion(id_proyecto, id_fase, id_tarea, id_caso){
        return db.execute('DELETE FROM caso_de_uso_fase_tarea WHERE id_proyecto = ? AND id_fase = ? AND id_tarea = ? AND id_caso_de_uso = ?',
            [id_proyecto, id_fase, id_tarea, id_caso]);
    }

    static deletePractica(id_proyecto, id_fase, id_tarea){
        return db.execute('DELETE FROM tareas WHERE id_proyecto = ? AND id_fase = ? AND id_tarea = ?',
            [id_proyecto, id_fase, id_tarea]);
    }


    static fetchTareasFases(id_proyecto){ //Se muestran las tareas con las fases
        return db.execute('SELECT id_tarea, nombre_tarea, ap_1, ap_2, ap_3, ap_5, ap_8, ap_13, fase.nombre_fase FROM tareas, proyecto, fase WHERE tareas.id_fase = fase.id_fase AND tareas.id_proyecto = proyecto.id_proyecto AND proyecto.id_proyecto = ?',
            [id_proyecto]);
    }

    static fetchCasosDeUsoFaseTarea(id_proyecto){ //Se muestran los casos de uso fase tareas por nombre
        return db.execute('SELECT caso_de_uso.id_caso_de_uso, caso_de_uso.nombre_caso_de_uso, fase.id_fase, fase.nombre_fase, tareas.id_tarea, tareas.nombre_tarea, caso_de_uso_fase_tarea.maximo FROM caso_de_uso_fase_tarea, caso_de_uso, fase, tareas, proyecto WHERE caso_de_uso_fase_tarea.id_proyecto = proyecto.id_proyecto AND caso_de_uso_fase_tarea.id_fase = fase.id_fase AND caso_de_uso_fase_tarea.id_tarea = tareas.id_tarea AND caso_de_uso_fase_tarea.id_caso_de_uso = caso_de_uso.id_caso_de_uso AND proyecto.id_proyecto = ?',
        [id_proyecto]);
    }

    static saveCasosDeUsoFaseTarea(id_caso_de_uso, id_tarea, id_proyecto, maximo, airtable) {
        return db.execute('INSERT INTO caso_de_uso_fase_tarea(id_caso_de_uso, id_fase, id_tarea, id_proyecto, maximo, airtable) VALUES (?, (SELECT fase.id_fase FROM fase, tareas WHERE fase.id_fase = tareas.id_fase and tareas.id_tarea = ?), ?, ?, ?, ?)',
        [id_caso_de_uso, id_tarea, id_tarea, id_proyecto, maximo, airtable]);
    }

    static fetchTareasYFasesCasos(nombre_caso_de_uso, id_proyecto){
        return db.execute('SELECT DISTINCT caso_de_uso.nombre_caso_de_uso, fase.nombre_fase, tareas.nombre_tarea FROM proyecto, fase, tareas, caso_de_uso_fase_tarea, caso_de_uso WHERE caso_de_uso_fase_tarea.id_fase = fase.id_fase AND caso_de_uso_fase_tarea.id_tarea = tareas.id_tarea AND caso_de_uso.nombre_caso_de_uso = ? AND proyecto.id_proyecto = caso_de_uso_fase_tarea.id_proyecto AND proyecto.id_proyecto = ?',
        [nombre_caso_de_uso, id_proyecto]);
    }

    static incomingTareasCasoUso(id_caso_de_uso, id_proyecto){
        return db.execute('select t.nombre_tarea, t.id_tarea from tareas as t where id_tarea not in (select id_tarea from caso_de_uso_fase_tarea where id_caso_de_uso = ?) and id_proyecto = ?',
        [id_caso_de_uso, id_proyecto]);
    }

    static fetchTareasByCasoUso(id_proyecto, id_caso_de_uso){ //Se muestran los casos de uso fase tareas por nombre
        return db.execute('SELECT caso_de_uso.id_caso_de_uso, tareas.id_tarea, tareas.nombre_tarea, fase.id_fase, fase.nombre_fase, caso_de_uso_fase_tarea.maximo FROM caso_de_uso_fase_tarea, caso_de_uso, fase, tareas, proyecto WHERE caso_de_uso_fase_tarea.id_proyecto = proyecto.id_proyecto AND caso_de_uso_fase_tarea.id_fase = fase.id_fase AND caso_de_uso_fase_tarea.id_tarea = tareas.id_tarea AND caso_de_uso_fase_tarea.id_caso_de_uso = caso_de_uso.id_caso_de_uso AND proyecto.id_proyecto = ? AND caso_de_uso.id_caso_de_uso = ?',
        [id_proyecto, id_caso_de_uso]);
    }

    static getTiempoTarea(id_tarea, id_proyecto){ //Se muestran los casos de uso fase tareas por nombre
        return db.execute('SELECT * FROM tareas WHERE id_tarea = ? AND id_proyecto = ?',
        [id_tarea, id_proyecto]);
    }

    static getTiempoReal(id_proyecto){ //Se muestran las sumas en minutos y horas de caso_de_uso_fase_tarea
        return db.execute('SELECT round(SUM(maximo),2) as "SumaMinutos", round(SUM(maximo)/60,2) as "SumaHoras" FROM caso_de_uso_fase_tarea WHERE id_proyecto = ?',
        [id_proyecto]);
    }

    static updateMultiplicador(multiplicador, id_proyecto){ //Se actualiza el multplicador
        return db.execute('UPDATE proyecto SET multiplicador = ? WHERE id_proyecto = ?',
        [multiplicador, id_proyecto]);
    }

    static getmultiplicador(id_proyecto){ //Se muestran el multiplicador 
        return db.execute('select multiplicador from proyecto WHERE id_proyecto = ?',
        [id_proyecto]);
    }

    static getSumaTareasByCasoUso(id_caso_de_uso, id_proyecto){ //Se muestra la suma de las tareas de un caso
        return db.execute('SELECT SUM(maximo) as sumaTareas FROM caso_de_uso_fase_tarea WHERE id_caso_de_uso = ? and id_proyecto = ?',
        [id_caso_de_uso, id_proyecto]);
    }

    static getTareasForAirtable(id_proyecto){ //Se muestran el multiplicador 
        return db.execute('SELECT caso_de_uso.id_caso_de_uso, caso_de_uso.nombre_caso_de_uso, tareas.nombre_tarea, fase.nombre_fase, caso_de_uso_fase_tarea.maximo, fase.id_fase, tareas.id_tarea, iteracion.nombre_iteracion FROM caso_de_uso_fase_tarea, caso_de_uso, fase, tareas, proyecto, iteracion WHERE caso_de_uso_fase_tarea.id_proyecto = proyecto.id_proyecto AND caso_de_uso_fase_tarea.id_fase = fase.id_fase AND caso_de_uso_fase_tarea.id_tarea = tareas.id_tarea AND caso_de_uso_fase_tarea.id_caso_de_uso = caso_de_uso.id_caso_de_uso AND proyecto.id_proyecto = ? and iteracion.id_iteracion=caso_de_uso.id_iteracion',
        [id_proyecto]);
    }

    static setAirtableTarea(id_caso_de_uso, id_fase, id_tarea, id_proyecto){ //Se muestra la suma de las tareas de un caso
        return db.execute('UPDATE caso_de_uso_fase_tarea SET airtable = 1 WHERE id_caso_de_uso = ? AND id_fase = ? AND id_tarea = ? AND id_proyecto = ?',
        [id_caso_de_uso, id_fase, id_tarea, id_proyecto]);
    }

    static getIterations(id_proyecto){ //Saca las iteraciones
        return db.execute('SELECT distinct(nombre_iteracion) FROM iteracion as i, caso_de_uso as cdu WHERE i.id_iteracion=cdu.id_iteracion and cdu.id_proyecto=?',
        [id_proyecto]);
    }

    static setIteracion(fechaInicio, fechaFin, nombreIteracion, id_proyecto){ //Se muestra la suma de las tareas de un caso
        return db.execute('Insert into  iteracion (fechaInicio, fechaFin, nombre_iteracion, id_proyecto) values (?,?,?,?) ',
        [fechaInicio, fechaFin, nombreIteracion, id_proyecto]);
    }

    static getIteracion(id_proyecto){ //Se muestra la suma de las tareas de un caso
        return db.execute('select * from iteracion where id_proyecto=? order by id_iteracion desc',
        [id_proyecto]);
    }
}