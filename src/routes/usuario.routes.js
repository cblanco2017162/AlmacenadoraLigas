const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');
const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/login', usuarioControlador.login);
api.post('/registrar', usuarioControlador.registrarCliente);
api.put('/editarUsuario/:idUsuario',  [md_autenticacion.Auth, md_roles.varAdmin], usuarioControlador.editarUsuario);
api.delete('/eliminarUsuario/:idUsuario', [md_autenticacion.Auth, md_roles.varAdmin], usuarioControlador.eliminarUsuario);
api.put('/editarse/:idUsuario', [md_autenticacion.Auth, md_roles.varCliente], usuarioControlador.editarseUsuario);


module.exports = api;