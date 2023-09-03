const mongoose = require('mongoose');
const calificacionSchema = require('./calificaciones.model');

calificacionSchema.statics = {
    crear: function(data, cb) {
        const calificacion = new this(data)
        calificacion.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const calificacionModel = mongoose.model('calificaciones', calificacionSchema);
module.exports = calificacionModel;