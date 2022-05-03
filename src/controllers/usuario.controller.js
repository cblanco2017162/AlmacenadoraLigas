const Usuario = require('../models/usuario.model');
const underscore = require('underscore');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')

function registrar(req, res) {
    var parametros = req.body;
    var usuarioModelo = new Usuario;
    Usuario.findOne({ usuario: parametros.usuario }, (err, ususarioEncontrado) => {
        if (underscore.isEmpty(usuarioEncontrado)) {
            usuarioModelo.nombre = parametros.nombre;
            usuarioModelo.email = parametros.email;
            usuarioModelo.rol = 'CLIENTE';
            bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                usuarioModelo.password = passwordEncriptada
                usuarioModelo.save((err, usuarioGuardado) => {
                    return res.status(200).send({ Usuario: usuarioGuardado })
                });
            })
        } else {
            return res.status(500).send({ mensaje: "El el correo ya esta en uso, utilice uno diferente" })
        }
    })
}



function creacionAdmin() {
    var usuarioModel = new Usuario();
    Usuario.findOne({ usuario: 'SuperAdmin' }, (err, usuarioEncontrado) => {

        if (underscore.isEmpty(usuarioEncontrado)) {

            usuarioModel.nombre = 'SuperAdmin';
            usuarioModel.email = 'Administrador por Defecto';
            usuarioModel.rol = 'ADMIN';

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save(() => {
                    console.log("Administrador creado con exito")
                });

            });
        } else {
            console.log("El administrador ya existe")
        }
    })
}

function login(req, res) {
    var parametros = req.body;
    Empresa.findOne({ usuario: parametros.usuario }, (err, empresaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (empresaEncontrada) {
            bcrypt.compare(parametros.password, empresaEncontrada.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            return res.status(200)
                                .send({ token: jwt.crearToken(empresaEncontrada) })
                        } else {
                            empresaEncontrada.password = undefined;
                            return res.status(200)
                                .send({ empresa: empresaEncontrada })
                        }

                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La clave no coincide' });
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el usuario no se encuentra registrado.' })
        }
    })
}

module.exports={
    registrar,
    creacionAdmin,
    login
}