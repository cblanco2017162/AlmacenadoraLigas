const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TorneoSchema = Schema({
    nombreTorneo: String,
    equiposTotal: String
});

module.exports = mongoose.model('Torneos', TorneoSchema);