const mongoose = require('mongoose');
const sedeSchema = require('./sedes.model');

sedeSchema.statics = {
    crear: function(data, cb) {
        const sede = new this(data)
        sede.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const sedeModel = mongoose.model('sede', sedeSchema);
module.exports = sedeModel;