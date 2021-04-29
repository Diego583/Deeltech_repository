const filesystem = require('fs');
const Usuario = require('../models/user');
const Proyecto = require('../models/proyecto');
const airtable = require('../util/airtable');
const { Console } = require('console');
const { table } = require('../util/airtable');

exports.getReportes = (request, response, next) => {
    var id_proyecto = request.params.id;

    Proyecto.getIteracion(id_proyecto)
    .then(([rows,fieldData]) => {
        //console.log(rows);
        response.render('reportes', {
            id: request.params.id,
            iteraciones: rows,
            userRol: request.session.rol,
            csrfToken: request.csrfToken(),
            titulo: 'Reportes',
            isLoggedIn: request.session.isLoggedIn === true ? true : false
        });
    }).catch(err => console.log(err));

};

exports.postReportes = (request, response, next) => {
    const tasksTable = airtable('Tasks');

    const iteracion = request.body.nombre_iteracion;
    const fechaInicio = Date.parse(request.body.fechaInicio);
    const fechaFin = Date.parse(request.body.fechaFin);
    var proyectoActual = request.params.id;

    console.log(iteracion);
    /*console.log(fechaInicio);
    console.log(fechaFin);*/

    const dias = Math.round(((fechaFin - fechaInicio)/(1000 * 3600 *24))+1);
    console.log(dias);

    //SACAR REGISTROS DE AIRTABLE
    const getRecords = async(id_proyecto, iteracion) => {
        const records = await tasksTable
            .select({
                view: "LiveProgress",
            })
            .all();

        console.log(id_proyecto);
        let estimacionTotal = 0;
        let arrTareas = [];
        for(let record of records){
            //console.log(record.fields.id_proyecto);
            //console.log(record.fields.Iterations);
            let arrColaboradores = [];
            if ((parseInt(id_proyecto, 10) == record.fields.id_proyecto) && (iteracion == record.fields.Iterations)){
                //console.log(record);
                estimacionTotal += record.fields.Estimation;
                //console.log(record.fields.Assigned);
                if (record.fields.Assigned != undefined){
                    for(let colaborador of record.fields.Assigned){
                        //console.log(colaborador.name);
                        arrColaboradores.push(colaborador.name);
                    }
                }
                //console.log(arrColaboradores);
                let tarea = {Name: record.fields.Name, Status: record.fields.Status, Estimation: record.fields.Estimation, Duration: record.fields.Duration, FinishedDate: record.fields.FinishedDate, Assigned: arrColaboradores};
                arrTareas.push(tarea);  
            }
        }

        let arrDias = [];
        let arrVPA = [];
        let arrData = [];

        let velocidadPlaneada = estimacionTotal/dias;
        console.log(velocidadPlaneada);

        let aux = velocidadPlaneada;
        for(let i = 1; i <= dias; i++){
            arrDias.push(i);
            arrVPA.push(velocidadPlaneada);
            velocidadPlaneada += aux;
        }

        let valorGanado = [];
        let valorReal = [];
        for(let i = 0 ; i<dias;i++){
            valorGanado[i]=0;
            valorReal[i]=0;
        }
        for(let tarea of arrTareas){
            let fechaFinTarea = Date.parse(tarea.FinishedDate);
            let diasTranscurridos = Math.round((fechaFinTarea - fechaInicio)/(1000 * 3600 *24));
            let aux=0, aux2=0;
            for(let t of arrTareas){
                
                let fechaFinTareas = Date.parse(t.FinishedDate); 
                if(fechaFinTarea==fechaFinTareas && t.Status=="Done"){
                    aux += t.Estimation;
                }
                if(fechaFinTarea==fechaFinTareas){
                    aux2 += (t.Duration*t.Assigned.length);
                }
                valorGanado[diasTranscurridos]=aux;
                valorReal[diasTranscurridos]=aux2;
            } 
        }
        let acum=0;
        let acum2=0;
        for(let i = 0 ; i<dias;i++){
            acum += valorGanado[i];
            valorGanado[i]=acum;
        }
        for(let i = 0 ; i<dias;i++){
            acum2 += valorReal[i];
            valorReal[i]=acum2;
        }


        arrData.push(arrDias);
        arrData.push(arrVPA);
        arrData.push(valorGanado);
        arrData.push(valorReal);

        console.log(arrData);
        //console.log(arrTareas);
        //console.log(estimacionTotal);
        response.status(200).json(arrData);
    };

    getRecords(proyectoActual, iteracion);
};

exports.postSendAirtable = (request, response, next) => {
    const tasksTable = airtable('Tasks');
    const id_proyecto = request.params.id;
    console.log(id_proyecto);

    const createRecord = async (fields) => {
        const createdRecord = await tasksTable.create(fields);
        console.log(createdRecord);
    }

    Proyecto.getTareasForAirtable(id_proyecto)
    .then(async([rows,fieldData]) => {
        //console.log(rows);
        let arrTareas = [];
        for(let tareas of rows){
            console.log(parseInt(id_proyecto, 10));
            let Name = tareas.nombre_iteracion + ' - ' + tareas.nombre_caso_de_uso + ' - ' + tareas.nombre_tarea + ' (' + tareas.nombre_fase + ')';
            let tarea = {Name: Name, Status: 'To Do', Estimation: parseFloat(tareas.maximo), id_proyecto: parseInt(id_proyecto, 10), Iterations: tareas.nombre_iteracion};
            arrTareas.push(tarea);
            Proyecto.setAirtableTarea(tareas.id_caso_de_uso, tareas.id_fase, tareas.id_tarea, id_proyecto);
        }
        //console.log(arrTareas);

        for(let fields of arrTareas){
            console.log(fields);
            await createRecord(fields);
        }

        request.flash('success','Tareas cargadas a airtable correctamente. 😁👍');
        response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
    }).catch(err => console.log(err));

};

exports.getPlaneacion = (request, response, next) => {
    Proyecto.fetchCasosDeUsoFaseTarea(request.params.id)
    .then(([rows,fieldData]) => {
        Proyecto.fetchTareasFases(request.params.id)
        .then(([rows1,fieldData]) => {
            Proyecto.fetchCasosDeUso(request.params.id)
            .then(([rows2,fieldData]) => {
                Proyecto.getTiempoReal(request.params.id)
                .then(([rows3,fieldData]) => {
                    Usuario.fetchSuma_Horas(request.params.id)
                    .then(([rows4,fieldData])=>{
                        Usuario.fetchPorcentajes(request.params.id)
                        .then(([rows5,fieldData]) => {
                            Proyecto.getmultiplicador(request.params.id)
                            .then(([rows6,fieldData]) => {
                                response.render('planeacion', {
                                    casosTareas: rows,
                                    tareas: rows1,
                                    casosUso: rows2,
                                    tiempoReal: rows3,
                                    tiempoUsuarios: rows4,
                                    porcentajes: rows5,
                                    multiplicador: rows6,
                                    id: request.params.id,
                                    csrfToken: request.csrfToken(),
                                    userRol: request.session.rol,
                                    error: request.flash("error"),
                                    success: request.flash("success"),
                                    titulo: 'Planeación',
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

exports.postMultiplicador = (request, response, next) => { //NUEVO
    const multiplicador = request.body.multiplicador;
    Proyecto.updateMultiplicador(multiplicador, request.params.id)
    .then(([rows,fieldData]) => {
        console.log("Multiplicador calculado");
        //request.flash('success','Practica guardada exitosamente. 😁👍');
        response.redirect('/proyectos/'+ request.params.id +'/planeacion');
    }).catch(err => console.log(err));
    
};

exports.postPlaneacion = (request, response, next) => { //NUEVO
    const nombre_caso_de_uso = request.body.CasoUso;
    const arrTareas = request.body.tarea
    const id_proyecto = request.params.proyecto_id;
    console.log(nombre_caso_de_uso);
    console.log(arrTareas);
    console.log(id_proyecto);

    if (nombre_caso_de_uso.length == 0 && arrTareas == undefined){
        request.flash('error','No se recibio ningun dato. 😢🙃');
        response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
    }

    else if (nombre_caso_de_uso.length == 0 || arrTareas == undefined){
        request.flash('error','Te faltaron campos por llenar. 😢🙃');
        response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
    }

    else{
        if (Array.isArray(arrTareas)){
            //console.log("Este es un arreglo");
            for (var i = 0; i < arrTareas.length; i++) {
                console.log(arrTareas[i]);
                Proyecto.saveCasosDeUsoFaseTarea(nombre_caso_de_uso, arrTareas[i], id_proyecto)
            }
            request.flash('success','Tareas agregadas a caso de uso correctamente. 😁👍');
            response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
        }
        else {
            console.log(arrTareas);
            Proyecto.saveCasosDeUsoFaseTarea(nombre_caso_de_uso, arrTareas, id_proyecto)
            request.flash('success','Tarea agregadas a caso de uso correctamente. 😁👍');
            response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
        }
    }

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

exports.postEliminarProyecto = (request, response, next) => {
    request.session.error = "";

    Proyecto.deleteProyecto(request.params.id)
    .then(() => {
         Proyecto.fetchProyectosUsuario(request.session.usuario)
        .then(([rows, fieldData]) => {
            request.flash('success','Proyecto eliminado correctamente.');
            response.status(200).json(rows)})
    }).catch(err => {
        console.log(err);
    });
}

exports.postModificarProyecto = (request, response, next) => {
    request.session.error = "";
    const id_proyecto = request.params.id;
    const users = request.params.users;

    Proyecto.deleteProyectoUsuario(id_proyecto)
    .then(() => { 
        let u = '', count = 0;
        for(let user of users) {
            count++;
            if (user== ','){
                Proyecto.modProyectoUsuario(id_proyecto, u)
                .catch(err => {
                    console.log(err);
                });
                u = '';
            } else {
                u += user;
            }
        }
        Proyecto.modProyectoUsuario(id_proyecto, u)
        .catch(err => {
            console.log(err);
        });
    }).then(() => { 
        Proyecto.modProyecto(id_proyecto, request.params.nombre, request.params.desc)
        .then(() => {
            Proyecto.fetchProyectosUsuario(request.session.usuario)
           .then(([rows, fieldData]) => {
               request.flash('success','Proyecto modificado correctamente.');
               response.status(200).json(rows)})
       }).catch(err => {
           console.log(err);
       });
    }).catch(err => {
        console.log(err);
    });
    
    /*Proyecto.deletePracticaCFT(request.params.id, request.params.id_fase, request.params.id_tarea);
    Proyecto.deletePractica(request.params.id, request.params.id_fase, request.params.id_tarea);
    Proyecto.fetchPromedioWbs(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            request.flash('success','Practica Eliminada exitosamente.');
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });*/
}

exports.postEliminarPractica = (request, response, next) => {
    request.session.error = "";

    Proyecto.deletePracticaCFT(request.params.id, request.params.id_fase, request.params.id_tarea);
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

exports.postEliminarPracticaPlaneacion = (request, response, next) => {
    request.session.error = "";

    Proyecto.deletePracticaCFTplaneacion(request.params.id, request.params.id_fase, request.params.id_tarea, request.params.id_caso)
    .then(() => {
        Proyecto.fetchTareasByCasoUso(request.params.id, request.params.id_caso)
        .then(([rows, fieldData]) => {
        console.log(rows);
        return response.status(200).json(rows)});
    }).catch(err => {
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
        Proyecto.getIteracion(request.params.id)
        .then(([rows2,fieldData]) => {
            response.render('CasoUso', {
                Casos: rows,
                id: request.params.id,
                iteraciones: rows2,
                success: request.flash("success"),
                error: request.flash("error"),
                userRol: request.session.rol,
                titulo: 'Caso de Uso',
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

};

exports.postIteracion = (request, response, next) => {
    const tasksIterations = airtable('Iterations');

    const createRecord = async (fields) => {
        const createdRecord = await tasksIterations.create(fields);
        console.log(createdRecord);
    }

    if((request.body.fechaInicio).length < 1 || (request.body.fechaFin).length < 1 || (request.body.nombreIteracion).length < 1){
        request.flash('error','Te faltan campos por llenar');
        response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
    }
    else{
        let iteracion = {IT: request.body.nombreIteracion, Status: 'Planning', id_proyecto: parseInt(request.params.id, 10)};
        Proyecto.setIteracion(request.body.fechaInicio, request.body.fechaFin, request.body.nombreIteracion, request.params.id)
        .then(([rows,fieldData]) => {
            createRecord(iteracion);
            console.log("Guardando iteracion...");
            request.flash('success','Nueva iteración agregada.');
            response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
        }).catch(err => console.log(err));
    }
}

exports.postCasoUso = (request, response, next) => {
    const casoUso = request.body.casoUso;
    const iteracion = request.body.iteracion;
    const epic = request.body.epic;
    const ap = request.body.ap;

    if(casoUso.length < 1 || iteracion < 0 || epic.length < 1 || ap.length < 1){
        request.flash('error','Te faltan campos por llenar');
        response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
    }
    else if(ap == "Choose..."){
        request.flash('error','Te faltó escoger el punto ágil');
        response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
    }
    else{
        console.log(request.body);
        Proyecto.saveCasoDeUso(request.body.casoUso, request.body.iteracion, request.body.epic, request.body.ap, "Pendiente", request.params.id)
        .then(([rows,fieldData]) => {
            console.log("Guardando caso de uso...");
            request.flash('success','Caso de uso agregado.');
            response.redirect('/proyectos/'+ request.params.id +'/caso_de_uso');
        }).catch(err => console.log(err));
    }
}

exports.postStatus = (request, response, next) => {
    request.session.error = "";
    const status = request.body.status;
    const id = request.body.id;

    Proyecto.updateStatusCaso(status, id, request.params.id)
        .then(() => {
            Proyecto.fetchCasosDeUso(request.params.id)
                .then(([rows,fieldData]) => {
                    Proyecto.getIteracion(request.params.id)
                        .then(([rows2,fieldData]) => {
                            let arr = [];
                            arr.push(rows);
                            arr.push(rows2);
                            response.status(200).json(arr);
                        }).catch(err => console.log(err));
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));

}

exports.postEliminarCaso = (request, response, next) => {
    request.session.error = "";
    const id_proyecto = request.params.id;
    const id_caso = request.params.id_caso;

    Proyecto.deleteCasoDeUsoFaseTarea(id_proyecto, id_caso);
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

exports.postIncomingTareaCasoUso = (request, response, next) => {
    const id = request.body.id;

    Proyecto.incomingTareasCasoUso(id, request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });

}

exports.postIncomingUsuarios = (request, response, next) => {

    Proyecto.incomingUsuarios(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });

}

exports.postAddTareaCasoUso = (request, response, next) => {
    const id = request.body.id;
    const ap = "ap_" + request.body.ap;
    const arrTareas = request.body.tareas;
    var id_proyecto = request.params.id;
    console.log(id);
    console.log(ap);
    console.log(arrTareas);
    console.log(id_proyecto);

    if (arrTareas.length < 1){
        console.log("Entre 1");
        request.flash('error','No se recibio ningun dato. 😢🙃');
        response.redirect('/proyectos/'+ id_proyecto +'/planeacion');
    }
    
    let tareas = [];
    for (let tarea of arrTareas){
        console.log("Entre 2");
        tareas.push(tarea);
    }
    
    console.log(tareas);
    for (let tarea of tareas) {
        Proyecto.getTiempoTarea(tarea, id_proyecto)
        .then(async([rows, fieldData]) => {

            for(let j = 0; j < fieldData.length; j++){
                if(fieldData[j].name === ap){
                    console.log(tarea);
                    console.log(fieldData[j].name);
                    console.log(rows[0][fieldData[j].name]);

                    const tiempo = rows[0][fieldData[j].name];
                    console.log(tiempo);
                    
                    console.log("Guardando");
                    await Proyecto.saveCasosDeUsoFaseTarea(id, tarea, id_proyecto, tiempo, 0);

                }
            }

        })
        .catch(err => {
            console.log(err);
        });
    }

    setTimeout(() => {

        Proyecto.fetchTareasByCasoUso(id_proyecto, id)
        .then(([rows, fieldData]) => {
            console.log(rows);
            request.flash('success','Tareas agregadas a caso de uso correctamente. 😁👍');
            //console.log(rows);
            return response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
        
    }, 500);

    


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

    Proyecto.updateCasoDeUso(request.params.id, request.params.id_caso, nombre_caso, iteracion, epic, valor);
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
        console.log(request.session);
        console.log("username: " + request.session.usuario)
        Proyecto.fetchProyectosUsuario(request.session.usuario)
        .then(([rows,fieldData]) => {
            Usuario.fetchOne(request.session.usuario)
            .then(([rows2,fieldData]) => {
                response.render('proyectos', {
                    csrfToken: request.csrfToken(),
                    roles: request.session.roles,
                    users: request.session.usuarios,
                    username: request.session.usuario,
                    proyectos: rows,
                    nombre: rows2,
                    userRol: request.session.rol,
                    error: request.flash("error"),
                    success: request.flash("success"),
                    titulo: 'Proyectos',
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};