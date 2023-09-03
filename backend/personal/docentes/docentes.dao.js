const mongoose = require('mongoose');
const docenteSchema = require('./docentes.model');

docenteSchema.statics = {
    crear: function(data, cb) {
        const docente = new this(data)
        docente.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const docenteModel = mongoose.model('docente', docenteSchema);
module.exports = docenteModel;