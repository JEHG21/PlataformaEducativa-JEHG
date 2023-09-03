const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const rolSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ver: {
        type: String,
        required: true,
        trim: true
    },
    crear: {
        type: String,
        required: true,
        trim: true
    },
    editar: {
        type: String,
        required: true,
        trim: true
    },
    eliminar: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = rolSchema;