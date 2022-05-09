const express = require('express');
const controladorTorneo = require('../controllers/torneo.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarTorneo', md_autenticacion.Auth, controladorTorneo.agregarTorneos);
api.put('/editarTorneo/:idTorneo', md_autenticacion.Auth, controladorTorneo.editarTorneos);
api.delete('/eliminarTorneo/:idEquipo', md_autenticacion.Auth, controladorTorneo.eliminarTorneos);
api.get('/obtenerTorneo/:nombreTorneo', md_autenticacion.Auth, controladorTorneo.obtenerTorneosPorNombre);
//api.post('/agregarTorneo/:nombreEquipo', [md_autenticacion.Auth, md_roles.varCliente], controladorTorneo.asignarEquipo);
api.post('/agregarPartido',[md_autenticacion.Auth, md_roles.varCliente], controladorTorneo.agregarJornada);
api.get('/generarPdf',[md_autenticacion.Auth, md_roles.varCliente], controladorTorneo.crearPDF);

module.exports = api;
