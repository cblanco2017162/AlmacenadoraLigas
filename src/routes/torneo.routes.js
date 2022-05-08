const express = require('express');
const controladorTorneo = require('../controllers/torneo.controller');
const md_autenticacion = require('../middlewares/autenticacion');
//const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarTorneo', md_autenticacion.Auth, controladorTorneo.agregarTorneos);
api.put('/editarTorneo/:idTorneo', md_autenticacion.Auth, controladorTorneo.editarTorneos);

module.exports = api;
