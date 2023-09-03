const mongoose = require('mongoose');
const rolSchema = require('./roles.model');

rolSchema.statics = {
    crear: function(data, cb) {
        const rol = new this(data)
        rol.save(cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const rolModel = mongoose.model('roles', rolSchema);
module.exports = rolModel;