const express = require('express');
const controladorEquipo = require('../controllers/equipo.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');


const api = express.Router();

api.post('/agregarEquipo', [md_autenticacion.Auth, md_roles.varCliente], controladorEquipo.agregarEquipos);
api.put('/editarEquipo/idEquipo', [md_autenticacion.Auth, md_roles.varCliente], controladorEquipo.editarEquipos);
api.delete('/eliminarEquipo/idEquipo', [md_autenticacion.Auth, md_roles.varCliente], controladorEquipo.eliminarEquipos);

module.exports = api;