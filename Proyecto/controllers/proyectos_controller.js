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