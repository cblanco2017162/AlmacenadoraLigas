const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = Schema({
    nombre: String,
    golesAfavor:Number,
    golesEnContra:Number,
    diferencia:Number,
    puntos: Number,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' },
    idTorneo:{type:Schema.Types.ObjectId, ref:'Torneos'}
});

module.exports = mongoose.model('Equipos', EquipoSchema);

