const express = require('express');
const path = require('path');
const usersController = require('../controllers/users_controller');
const router = express.Router();

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

router.get('/login', usersController.getLogin);

router.post('/login', usersController.postLogin);

router.get('/logout', usersController.getLogout);

module.exports = router;