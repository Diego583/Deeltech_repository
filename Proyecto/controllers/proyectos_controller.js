const Usuario = require('../models/user');
const Proyecto = require('../models/proyecto');
const airtable = require('../util/airtable');

exports.getReportes = (request, response, next) => {
    const table = airtable('Tasks');

    const getRecords = async() => {
        const records = await table
            .select({
                view: "Global view",
                cellFormat: 'json'
            })
            .firstPage();
        //console.log(records);
        response.render('reportes', {
            id: request.params.id,
            Records: records,
            userRol: request.session.rol,
            titulo: 'Reportes',
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });
    };

    getRecords();
};

exports.getPlaneacion = (request, response, next) => {
    response.render('planeacion', {
        id: request.params.id,
        userRol: request.session.rol,
        titulo: 'Planeacion',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getWbs = (request, response, next) => {
    response.render('wbs', {
        id: request.params.id,
        userRol: request.session.rol,
        titulo: 'WBS',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getCapacidadEquipo = (request, response, next) => {
    Usuario.fetchSuma_Horas(request.params.id)
    .then(([rows1,fieldData])=>{
        Usuario.fetchUsers_Proyects(request.params.id)
        .then(([rows2,fieldData]) => {
            Usuario.fetchPorcentajes(request.params.id)
            .then(([rows3,fieldData]) => {
                response.render('capacidadEquipo', {
                    id: request.params.id,
                    csrfToken: request.csrfToken(),
                    userRol: request.session.rol,
                    users: rows2, 
                    tiempoP: rows1,
                    porcentaje: rows3,
                    titulo: 'Capacidad Equipo',
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
    
};

exports.postCapacidadEquipo = (request, response, next) => {
    console.log(request.body);

    var arrUsers_proyecto = request.body.id_proyecto;
    var arrUsers_usuario = request.body.id_usuario;
    var arrUsers_horario = request.body.horario;

    const nuevos_horarios = new Usuario(request.body.id_proyecto, request.body.id_usuario, request.body.horario);
    nuevos_horarios.getHorarios1(request.body.id_proyecto)
        .then(() => {
            if(Array.isArray(arrUsers_proyecto)){
                for (var i = 0; i < arrUsers_proyecto.length; i++) {
                    nuevos_horarios.saveHorarios(arrUsers_proyecto[i],arrUsers_usuario[i],arrUsers_horario[i]);
                }
                response.redirect('/proyectos/'+ arrUsers_proyecto[i-1] +'/capacidad_de_equipo');
            }
            else{
                nuevos_horarios.saveHorarios(request.body.id_proyecto, request.body.id_usuario, request.body.horario)
                response.redirect('/proyectos/'+ request.body.id_proyecto +'/capacidad_de_equipo');
            }
        }).catch(err => console.log(err));
}

exports.postporcentajes = (request, response, next) => {
    console.log(request.body);

    const nuevos_porcentajes = new Usuario();
    nuevos_porcentajes.setporcentajes(request.body.tiempo_perdido, request.body.errores_registro, request.body.overhead, request.body.productivas, request.body.operativos, request.body.humano, request.body.cmmi, request.body.id_proyecto)
        .then(() => {
            response.redirect('/proyectos/'+ request.body.id_proyecto +'/capacidad_de_equipo');
        }).catch(err => console.log(err));
        
}

exports.postBuscar = (request, response, next) => {
    //console.log(request.body);
    //console.log(request.body.valor_busqueda);
    const nombre_proyecto = request.body.valor_busqueda;
    Proyecto.fetchProyectoUsuarioByName(nombre_proyecto, request.session.usuario)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCasoUso = (request, response, next) => {
    response.render('casoUso', {
        id: request.params.id,
        userRol: request.session.rol,
        titulo: 'Caso de Uso',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};
exports.getNuevoProyecto = (request, response, next) => {
    Usuario.fetchUsers()
        .then(([rows,fieldData]) => {
            response.render('nuevoProyecto', {
                csrfToken: request.csrfToken(),
                userRol: request.session.rol,
                users: rows, 
                titulo: 'Nuevo Proyecto',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
};

exports.postNuevoProyecto = (request, response, next) => {
    /*console.log(request.body.nombre_proyecto);
    console.log(request.body.descripcion);*/
    console.log(request.body.users);

    var arrUsers = request.body.users;

    const image = request.file;
    //console.log(image);

    if(!image) {
        console.error('Error al subir la imagen');
        return response.status(422).redirect('/');
    }

    const nuevo_proyecto = new Proyecto(request.body.nombre_proyecto, request.body.descripcion, image.filename);
    nuevo_proyecto.saveProyecto()
        .then(() => {
            if (Array.isArray(arrUsers)){
                console.log("la cague");
                for (var i = 0; i < arrUsers.length; i++) {
                    console.log(arrUsers[i]);
                    nuevo_proyecto.saveProyectoUser(arrUsers[i]);
                }
                response.redirect('/');
            }
            else {
                //console.log(arrUsers);
                nuevo_proyecto.saveProyectoUser(arrUsers);
                response.redirect('/');
            }
        }).catch(err => console.log(err));
}

exports.postBuscar = (request, response, next) => {
    //console.log(request.body);
    //console.log(request.body.valor_busqueda);
    const nombre_proyecto = request.body.valor_busqueda;
    Proyecto.fetchProyectoUsuarioByName(nombre_proyecto, request.session.usuario)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.get = (request, response, next) => {
    Usuario.getRol(request.session.usuario)
    .then(([rows,fieldData]) => {
        request.session.rol = rows[0].id_rol;
        console.log(request.session.rol);
        console.log(request.session);
        Proyecto.fetchProyectosUsuario(request.session.usuario)
        .then(([rows,fieldData]) => {
            response.render('proyectos', {
                csrfToken: request.csrfToken(),
                proyectos: rows,
                userRol: request.session.rol, 
                titulo: 'Proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};