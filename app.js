const express=require('express')
const cors=require('cors')
var app = express()

const usuarioRutas=require('./src/routes/usuario.routes');
const torneoRutas=require('./src/routes/torneo.routes');
const equipoRutas=require('./src/routes/equipo.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', usuarioRutas, torneoRutas, equipoRutas);


module.exports = app;