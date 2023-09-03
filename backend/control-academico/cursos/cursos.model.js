const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const cursoSchema = new Schema({
    idCurso: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = cursoSchema;