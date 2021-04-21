const filesystem = require('fs');
const Usuario = require('../models/user');
const Proyecto = require('../models/proyecto');
const airtable = require('../util/airtable');

exports.getReportes = (request, response, next) => {
    const tasksTable = airtable('Tasks');
    //const iterationsTable = airtable('Iterations');

    const getRecords = async() => {
        const records = await tasksTable
            .select({
                view: "Global view",
            })
            .all();
        
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

exports.getWbs = (request, response, next) => { // NUEVO
    Proyecto.fetchProyectoTareasAnalisis(request.params.id)
    .then(([rows1,fieldData]) => {
        var tamañoA = rows1.length + 1;
        Proyecto.fetchProyectoTareasDiseño(request.params.id)
        .then(([rows2,fieldData]) => {
            var tamañoD = rows2.length + 1;
            Proyecto.fetchProyectoTareasImplementacion(request.params.id)
            .then(([rows3,fieldData]) => {
                var tamañoI = rows3.length + 1;
                Proyecto.fetchProyectoTareasPruebas(request.params.id)
                .then(([rows4,fieldData]) => {
                    var tamañoP = rows4.length + 1;
                    Proyecto.fetchProyectoTareasDespliegue(request.params.id)
                    .then(([rows5,fieldData]) => {
                        var tamañoDes = rows5.length + 1;
                        Proyecto.fetchPromedioWbs(request.params.id)
                        .then(([rows6,fieldData]) => {
                            Proyecto.fetchFases()
                            .then(([rows7,fieldData]) => {
                                response.render('wbs', {
                                    id: request.params.id,
                                    csrfToken: request.csrfToken(),
                                    userRol: request.session.rol,
                                    error: request.flash("error"),
                                    success: request.flash("success"),
                                    titulo: 'WBS',
                                    tareasAnalisis: rows1,
                                    tareasDiseño: rows2,
                                    tareasImplementacion: rows3,
                                    tareasPruebas: rows4,
                                    tareasDespliegue: rows5,
                                    total: rows6,
                                    fases: rows7,
                                    nA: tamañoA,
                                    nD:tamañoD,
                                    nI: tamañoI,
                                    nP: tamañoP,
                                    nDes: tamañoDes,
                                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                                });
                            }).catch(err => console.log(err));   
                        }).catch(err => console.log(err));    
                    }).catch(err => console.log(err));   
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));  
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.postWbs = (request, response, next) => { //NUEVO
    request.session.error = "";
    const ap_1 = request.body.ap_1;
    const ap_2 = request.body.ap_2;
    const ap_3 = request.body.ap_3;
    const ap_5 = request.body.ap_5;
    const ap_8 = request.body.ap_8;
    const ap_13 = request.body.ap_13;
    const id = request.body.id;

    Proyecto.updateTarea(ap_1, ap_2, ap_3, ap_5, ap_8, ap_13, id, request.params.id);
    Proyecto.fetchPromedioWbs(request.params.id)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
            
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getAgregarPractica = (request, response, next) => { // NUEVO
    Proyecto.fetchFases()
    .then(([rows,fieldData]) => {
        response.render('agregarPractica', {
            id: request.params.id,
            csrfToken: request.csrfToken(),
            error: request.session.error,
            userRol: request.session.rol,
            titulo: 'Agregar Practica',
            fases: rows,
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });
    }).catch(err => console.log(err));
};

exports.postAgregarPractica = (request, response, next) => { //NUEVO
    request.session.error = "";
    const nombrePractica = request.body.nombrePractica;
    const fase = request.body.fase;

    if(nombrePractica.length < 1){
        request.flash('error','Falta nombre de la practica de trabajo. 😢🙃');
        response.redirect('/proyectos/'+ request.params.id +'/wbs');
    }

    else if(fase == "Choose..."){
        request.flash('error','Falta nombre de la practica de trabajo. 😢🙃');
        response.redirect('/proyectos/'+ request.params.id +'/wbs');
    }

    else{
        Proyecto.savePracticaTrabajo(request.body.fase, request.params.id, request.body.nombrePractica)
        .then(([rows,fieldData]) => {
            console.log("Guardando Practica de tarea...");
            request.flash('success','Practica guardada exitosamente. 😁👍');
            response.redirect('/proyectos/'+ request.params.id +'/wbs');
        }).catch(err => console.log(err));
    }
};

exports.postModificarPractica = (request, response, next) => { 

    Proyecto.modTarea(request.params.id, request.params.id_fase, request.params.nombre_fase, request.params.id_tarea, request.params.nombre_tarea)
    Proyecto.fetchPromedioWbs(request.params.id)
    .then(([rows, fieldData]) => {
        request.flash('success','Practica Modificada exitosamente.');
        response.status(200).json(rows);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postEliminarPractica = (request, response, next) => {
    request.session.error = "";

    Proyecto.deletePractica(request.params.id, request.params.id_fase, request.params.id_tarea);
    Proyecto.fetchPromedioWbs(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            request.flash('success','Practica Eliminada exitosamente.');
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });
}

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

    Proyecto.fetchCasosDeUso(request.params.id)
    .then(([rows,fieldData]) => {
        response.render('CasoUso', {
            Casos: rows,
            id: request.params.id,
            success: request.flash("success"),
            error: request.session.error,
            userRol: request.session.rol,
            titulo: 'Caso de Uso',
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });
    }).catch(err => console.log(err));

};

exports.postCasoUso = (request, response, next) => {
    request.session.error = "";
    const casoUso = request.body.casoUso;
    const iteracion = request.body.iteracion;
    const epic = request.body.epic;
    const ap = request.body.ap;

    if(casoUso.length < 1 || iteracion.length < 1 || epic.length < 1 || ap.length < 1){
        request.session.error = "Te faltan campos por llenar";
        response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
    }
    else if(ap == "Choose..."){
        request.session.error = "Te faltó escoger el punto ágil";
        response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
    }
    else{
        Proyecto.saveCasoDeUso(request.body.casoUso, request.body.iteracion, request.body.epic, request.body.ap, "Pendiente", request.params.id)
        .then(([rows,fieldData]) => {
            console.log("Guardando caso de uso...");
            response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
        }).catch(err => console.log(err));
    }
}

exports.postStatus = (request, response, next) => {
    request.session.error = "";
    const status = request.body.status;
    const id = request.body.id;

    Proyecto.updateStatusCaso(status, id, request.params.id);
    Proyecto.fetchCasosDeUso(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });

}

exports.postEliminarCaso = (request, response, next) => {
    request.session.error = "";
    const id_proyecto = request.params.id;
    const id_caso = request.params.id_caso;

    Proyecto.deleteCasoDeUso(id_proyecto, id_caso);
    Proyecto.fetchCasosDeUso(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            request.flash('success','Caso de uso eliminado exitosamente.');
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });

}

exports.postNuevoProyecto = (request, response, next) => {
    const nombre_proyecto = request.body.nombre_proyecto;
    const descripcion = request.body.descripcion;
    var arrUsers = request.body.users;
    const image = request.file;

    console.log(nombre_proyecto);
    console.log(descripcion);
    console.log(image);
    console.log(arrUsers);

    if (nombre_proyecto.length == 0 && descripcion.length == 0 && arrUsers == undefined && !image){
        request.flash('error','No se recibio ningun dato. 😢🙃');
        response.redirect('/');
    }

    else if (nombre_proyecto.length == 0 || descripcion.length == 0 || arrUsers == undefined || !image){
        request.flash('error','Te faltaron campos por llenar. 😢🙃');
        response.redirect('/');
    }

    else if (!image) {
        console.error('Error al subir la imagen');
        request.flash('error','Error al subir la imagen. 😢🙃');
        return response.status(422).redirect('/');
    }

    else{
        const nuevo_proyecto = new Proyecto(nombre_proyecto, descripcion, image.filename);
        nuevo_proyecto.saveProyecto()
        .then(() => {
            nuevo_proyecto.saveCapacidad_Equipo(nombre_proyecto, descripcion);
            if (Array.isArray(arrUsers)){
                //console.log("la cague");
                for (var i = 0; i < arrUsers.length; i++) {
                    console.log(arrUsers[i]);
                    nuevo_proyecto.saveProyectoUser(arrUsers[i]);
                }
                request.flash('success','Nuevo proyecto agregado al sistema. 😁👍');
                response.redirect('/');
            }
            else {
                //console.log(arrUsers);
                nuevo_proyecto.saveProyectoUser(arrUsers);
                request.flash('success','Nuevo proyecto agregado al sistema. 😁👍');
                response.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
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

exports.postModificarCaso = (request, response, next) => {

    const nombre_caso = request.params.nombre_caso;
    const iteracion = request.params.iteracion;
    const epic = request.params.epic;
    const valor = request.params.valor;

    Proyecto.updateCasoDeUso(request.params.id, request.params.id_caso, nombre_caso, iteracion, epic, valor)
    Proyecto.fetchCasosDeUso(request.params.id)
    .then(([rows, fieldData]) => {
        request.flash('success','Caso de uso modificado exitosamente.');
        response.status(200).json(rows);

    })
    .catch(err => {
        console.log(err);
    });

}

exports.get = (request, response, next) => {
    Usuario.fetchRoles()
    .then(([rows,fieldData]) => {
        request.session.roles = rows;
    }).catch(err => console.log(err));

    Usuario.fetchUsers()
    .then(([rows,fieldData]) => {
        request.session.usuarios = rows;
    }).catch(err => console.log(err));

    Usuario.getRol(request.session.usuario)
    .then(([rows,fieldData]) => {
        request.session.rol = rows[0].id_rol;
        console.log(request.session.usuario);
        console.log(request.session.rol);
        Proyecto.fetchProyectosUsuario(request.session.usuario)
        .then(([rows,fieldData]) => {
            response.render('proyectos', {
                csrfToken: request.csrfToken(),
                roles: request.session.roles,
                users: request.session.usuarios,
                proyectos: rows,
                userRol: request.session.rol,
                error: request.flash("error"),
                success: request.flash("success"),
                titulo: 'Proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};