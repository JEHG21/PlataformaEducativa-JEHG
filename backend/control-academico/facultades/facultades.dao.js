const mongoose = require('mongoose');
const facultadSchema = require('./facultades.model');

facultadSchema.statics = {
    crear: function(data, cb) {
        const facultad = new this(data)
        facultad.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const facultadModel = mongoose.model('facultad', facultadSchema);
module.exports = facultadModel;