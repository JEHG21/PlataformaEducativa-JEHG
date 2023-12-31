const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex', true);
const facultadSchema = new Schema({
    idFacultad: {
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

module.exports = facultadSchema;