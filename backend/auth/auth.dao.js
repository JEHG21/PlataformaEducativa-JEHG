const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
    crear: function(data, cb) {
        const user = new this(data)
        user.save(cb);
    },
    login: function(query, cb) {
        this.find(query, cb);
    },
    listar: function(query, cb) {
        this.find(query, cb);
    },
}

const authModel = mongoose.model('usuario', authSchema);
module.exports = authModel;