const mongoose = require('mongoose');
const estudianteSchema = require('./estudiantes.model');

estudianteSchema.statics = {
    crear: function(data, cb) {
        const estudiante = new this(data)
        estudiante.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    }
}

const estudianteModel = mongoose.model('estudiante', estudianteSchema);
module.exports = estudianteModel;