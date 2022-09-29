const express = require('express');
const router = express.Router();
const multer = require('../utils/multer');
const sessions = require('express-session');


// RUTAS GET ->>>> rutasGet
const get = require('./rutasGet');
router.get('/', get.inicio);
router.get('/yourevent', get.startYourEvent);
router.get('/yourevent/CreateEvents', get.createEvents);
router.get('/yourevent/myEvents', get.myEvents);
router.get('/yourevent/myEvents/updateEvents/:id_evento', get.updateEvents);
router.get('/yourevent/perfilUsuario', get.perfilUsuario);


// LOGIN and REGISTRO ->>> Controllers
const crud = require('../controllers/formularios');
router.all('/registro', crud.registro);
router.all('/login', crud.login);
router.all('/logout', crud.logout);


// CRUD eventos ->>> Controllers
const eventos = require("../controllers/eventos");
router.all('/yourevent/myEvents/delete/:id_evento', eventos.delete);
router.post('/yourevent/myEventsCreate', multer.single('image'), eventos.onEvent);
router.post('/yourevent/myEventsUpdate',  eventos.updateEvents);



module.exports = router;
