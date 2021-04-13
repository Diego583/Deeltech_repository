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
                        response.render('wbs', {
                            id: request.params.id,
                            csrfToken: request.csrfToken(),
                            userRol: request.session.rol,
                            titulo: 'WBS',
                            tareasAnalisis: rows1,
                            tareasDiseño: rows2,
                            tareasImplementacion: rows3,
                            tareasPruebas: rows4,
                            tareasDespliegue: rows5,
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

    Proyecto.updateTarea(ap_1, ap_2, ap_3, ap_5, ap_8, ap_13, id, request.params.id)
        .then(([rows, fieldData]) => {
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
        request.session.error = "Falta nombre de la practica de trabajo";
        response.redirect('/proyectos/'+ request.params.id +'/agregar_practica');
    }

    else if(fase == "Choose..."){
        request.session.error = "Falta escoger la fase";
        response.redirect('/proyectos/'+ request.params.id +'/agregar_practica');
    }

    else{
        Proyecto.savePracticaTrabajo(request.body.fase, request.params.id, request.body.nombrePractica)
        .then(([rows,fieldData]) => {
            console.log("Guardando Practica de tarea...");
            response.redirect('/proyectos/'+ request.params.id +'/wbs');
        }).catch(err => console.log(err));
    }
};

exports.getCapacidadEquipo = (request, response, next) => {
    Usuario.fetchUsers_Proyects(request.params.id)
        .then(([rows,fieldData]) => {
            response.render('capacidadEquipo', {
                id: request.params.id,
                csrfToken: request.csrfToken(),
                userRol: request.session.rol,
                users: rows, 
                titulo: 'Capacidad Equipo',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
};

exports.getCasoUso = (request, response, next) => {

    Proyecto.fetchCasosDeUso(request.params.id)
    .then(([rows,fieldData]) => {
        response.render('CasoUso', {
            Casos: rows,
            id: request.params.id,
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

exports.getModificarCaso = (request, response, next) => {

    Proyecto.fetchCasosDeUso(request.params.id)
    .then(([rows,fieldData]) => {
        response.render('modificarCaso', {

            Casos: rows,
            id: request.params.id,
            error: request.session.error,
            userRol: request.session.rol,
            titulo: 'Modificar Caso de Uso',
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn === true ? true : false

        });

    }).catch(err => console.log(err));

};