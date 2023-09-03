const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, { useNewUrlParser: true })
        .then(() => console.log(`Mongo está conectado en: ${dbURL}`))
        .catch(err => console.log(`La conexión tuvo un error: ${err}`))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongo está desconectado`);
            process.exit(0)
        });
    });
}