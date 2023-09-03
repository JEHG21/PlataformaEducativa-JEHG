const mongoose = require('mongoose');
const actividadSchema = require('./actividades-zona.model');

actividadSchema.statics = {
    crear: function(data, cb) {
        const actividad = new this(data)
        actividad.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const actividadModel = mongoose.model('actividad', actividadSchema);
module.exports = actividadModel;