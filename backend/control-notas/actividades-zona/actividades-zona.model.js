const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const actividadSchema = new Schema({
    idActividad: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    ponderacion: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = actividadSchema;