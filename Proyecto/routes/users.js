const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/users_controller');

//Para redirigir en caso de no estar logeado
const isAuth = require('../util/is-auth');

//Redirige a los no miembros
const isMiembro = require('../util/is-miembro');

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

router.get('/login', usersController.getLogin);

router.post('/login', usersController.postLogin);

router.get('/logout', isAuth, usersController.getLogout);

router.post('/register', isAuth, isMiembro, usersController.postRegister);

router.post('/update', isAuth, usersController.postUpdate);

module.exports = router;