const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const asignarEquipoSchema = new Schema({
    idTorneo : {type: Schema.Types.ObjectId, ref: 'Torneos'},
    idEquipo : {type: Schema.Types.ObjectId, ref: 'Equipos'}
})

module.exports = mongoose.model('Asignaciones', asignarEquipoSchema);