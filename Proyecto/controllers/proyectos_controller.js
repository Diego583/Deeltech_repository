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

exports.getWbs = (request, response, next) => {
    response.render('wbs', {
        id: request.params.id,
        userRol: request.session.rol,
        titulo: 'WBS',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
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

exports.postEliminarCaso = (request, response, next) => {
    request.session.error = "";
    const id_proyecto = request.params.id;
    const id_caso = request.params.id_caso;

    Proyecto.deleteCasoDeUso(id_proyecto, id_caso);
    Proyecto.fetchCasosDeUso(request.params.id)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.status(200).json(rows);

        })
        .catch(err => {
            console.log(err);
        });

}

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

exports.postModificarCaso = (request, response, next) => {

    const nombre_caso = request.params.nombre_caso;
    const iteracion = request.params.iteracion;
    const epic = request.params.epic;
    const valor = request.params.valor;

    Proyecto.updateCasoDeUso(request.params.id, request.params.id_caso, nombre_caso, iteracion, epic, valor)
    Proyecto.fetchCasosDeUso(request.params.id)
    .then(([rows, fieldData]) => {
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
        console.log(request.session.rol);
        console.log(request.session);
        Proyecto.fetchProyectosUsuario(request.session.usuario)
        .then(([rows,fieldData]) => {
            response.render('proyectos', {
                csrfToken: request.csrfToken(),
                roles: request.session.roles,
                users: request.session.usuarios,
                proyectos: rows,
                userRol: request.session.rol,
                error: request.session.error,
                titulo: 'Proyectos',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};