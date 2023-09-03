const mongoose = require('mongoose');
const cursoSchema = require('./cursos.model');

cursoSchema.statics = {
    crear: function(data, cb) {
        const curso = new this(data)
        curso.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const cursoModel = mongoose.model('curso', cursoSchema);
module.exports = cursoModel;