const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EquipoSchema = Schema({
    nombre: String,
    puntos: Number,
    torneoPertenece : String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
});

module.exports = mongoose.model('Equipos', EquipoSchema);