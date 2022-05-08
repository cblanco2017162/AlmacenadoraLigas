const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorneoSchema = Schema({
    nombreTorneo: String,
    equiposTotal: String,
    idUsuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
});

module.exports = mongoose.model('Torneos', TorneoSchema);