const express = require('express');
const usuarioControlador = require('../controllers/usuario.controller');

const api = express.Router();

api.post('/login', usuarioControlador.login);
api.post('/registrar', usuarioControlador.registrarCliente);


module.exports = api;