const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JornadasSchema = Schema({
    idPrimerEquipo:{type:Schema.Types.ObjectId,ref:'Equipos'},
    idSegundoEquipo:{type:Schema.Types.ObjectId,ref:'Equipos'},
    golesDeEquipo1:Number,
    golesDeEquipo2:Number,
    jornada:Number
});

module.exports = mongoose.model('Jornadas', JornadasSchema);