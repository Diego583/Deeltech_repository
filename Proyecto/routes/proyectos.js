const express = require('express');
const router = express.Router();
const path = require('path');
const proyectosController = require('../controllers/proyectos_controller');

//Para redirigir en caso de no estar logeado
const isAuth = require('../util/is-auth');

//Redirige a los no miembros
const isMiembro = require('../util/is-miembro');

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

//Para acceder a los recursos de la carpeta uploads
router.use(express.static(path.join(__dirname,'..', 'uploads')));

router.get('/:id/reportes', isAuth, proyectosController.getReportes);

router.get('/:id/planeacion', isAuth, isMiembro, proyectosController.getPlaneacion);

router.get('/:id/wbs', isAuth, isMiembro, proyectosController.getWbs);

router.post('/:id/wbs', isAuth, isMiembro, proyectosController.postWbs);

router.get('/:id/agregar_practica', isAuth, isMiembro, proyectosController.getAgregarPractica); // Agregar tarea de WBS

router.post('/:id/agregar_practica', isAuth, isMiembro, proyectosController.postAgregarPractica); // Agregar tarea de WBS

router.get('/:id/capacidad_de_equipo', isAuth, isMiembro, proyectosController.getCapacidadEquipo);

router.get('/:id/caso_de_uso', isAuth, isMiembro, proyectosController.getCasoUso);

router.post('/:id/caso_de_uso', isAuth, isMiembro, proyectosController.postCasoUso);

router.post('/:id/status', isAuth, isMiembro, proyectosController.postStatus);

router.get('/:id/modificar_caso_de_uso', isAuth, isMiembro, proyectosController.getModificarCaso);

//router.get('/nuevo_proyecto', isAuth, isMiembro, proyectosController.getNuevoProyecto);

router.post('/nuevo_proyecto', isAuth, isMiembro, proyectosController.postNuevoProyecto);

router.get('/', isAuth, proyectosController.get);

router.post('/buscar', isAuth, proyectosController.postBuscar);

module.exports = router;