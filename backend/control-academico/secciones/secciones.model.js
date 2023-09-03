const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const seccionSchema = new Schema({
    idSeccion: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    seccion: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = seccionSchema;