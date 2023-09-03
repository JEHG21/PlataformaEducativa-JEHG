const mongoose = require('mongoose');
const seccionSchema = require('./secciones.model');

seccionSchema.statics = {
    crear: function(data, cb) {
        const seccion = new this(data)
        seccion.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const seccionModel = mongoose.model('seccion', seccionSchema);
module.exports = seccionModel;