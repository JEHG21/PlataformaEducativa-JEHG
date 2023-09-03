const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const calificacionSchema = new Schema({
    idCalificacion: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    carnetEstudiante: {
        type: String,
        required: true,
        trim: true
    },
    idActividad: {
        type: String,
        required: true,
        trim: true
    },
    punteo: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = calificacionSchema;