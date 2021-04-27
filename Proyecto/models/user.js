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

    static updateUser(nombre, constraseña, nombre_usuario) { //NUEVO

        return bcrypt.hash(constraseña, 12)
            .then((password_encriptado) => {

                return db.execute('UPDATE usuario set nombre = ?, contraseña = ? WHERE nombre_usuario = ?', 
                [nombre, password_encriptado, nombre_usuario]

            );
            }).catch(err => console.log(err));
    }

    static fetchUsers_Proyects(id_proyecto){
        return db.execute('SELECT us.id_usuario, us.nombre_usuario, pu.tiempo_por_semana FROM `proyecto_usuario` as pu, usuario as us WHERE us.id_usuario=pu.id_usuario and id_proyecto=? and us.id_usuario in (select id_usuario as miembro from usuario_rol where id_rol!=7002)', [id_proyecto]);
    }

    static fetchSuma_Horas(id_proyecto){
        return db.execute('select sum(tiempo_por_semana) as tiempo from (SELECT us.id_usuario, us.nombre_usuario, pu.tiempo_por_semana FROM `proyecto_usuario` as pu, usuario as us WHERE us.id_usuario=pu.id_usuario and id_proyecto=? and us.id_usuario in (select id_usuario as miembro from usuario_rol where id_rol!=7002)) as t', [id_proyecto]);
    }

    static fetchPorcentajes(id_proyecto){
        return db.execute('select * from capacidad_equipo where id_proyecto = ?', [id_proyecto]);
    }

    saveHorarios(id_proyecto, nombre, horario) {
        return db.execute('UPDATE  proyecto_usuario set tiempo_por_semana=? where id_proyecto=? and id_usuario=?',[horario, id_proyecto, nombre]);
    }

    getHorarios1(id_proyecto) {
        return db.execute('select id_usuario from proyecto_usuario where id_proyecto=?',[id_proyecto]);
    }

    setporcentajes(tiempo_perdido, errores_registro, overhead, productivas, operativos, humano, cmmi, id_proyecto){
        return db.execute('update capacidad_equipo set  tiempo_perdido=?, errores_registro=?, overhead=?, productivas=?, operativos=?, humano=?, cmmi=? where id_proyecto=?', [tiempo_perdido, errores_registro, overhead, productivas, operativos, humano, cmmi, id_proyecto]);
    }
} 