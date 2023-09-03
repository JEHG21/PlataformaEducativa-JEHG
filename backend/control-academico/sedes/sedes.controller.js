const sede = require('./sedes.dao');

exports.crearSede = (req, res, next) => {
    const nuevaSede = {
        idSede: req.body.idSede,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        celular: req.body.celular,
        correo: req.body.correo
    }

    sede.crear(nuevaSede, (err, sede) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID de sede ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataSede = {
                idSede: sede.idSede,
                nombre: sede.nombre,
                direccion: sede.direccion,
                celular: sede.celular,
                correo: sede.estado
            }
            // response 
        res.send({ dataSede });
    });
}

exports.listarSede = (req, res, next) => {
    sede.listar((err, sedes) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(sedes);
    });

}

exports.actualizarSede = (req, res, next) => {
    const originalSede = {
        idSede: req.params.idSede,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        celular: req.body.celular,
        correo: req.body.correo
    }
    sede.findOne({ idSede: originalSede.idSede }, (err, sede) => {

        if (!sede) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la sede no existe' });
        } else {
            sede.nombre = originalSede.nombre,
                sede.direccion = originalSede.direccion,
                sede.celular = originalSede.celular,
                sede.correo = originalSede.correo

            sede.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Sede actualizada exitosamente!' });
            })
        }
    });
}

exports.eliminarSede = (req, res) => {
    const sedeRecibida = req.params.idSede;

    sede.findOneAndRemove({ idSede: sedeRecibida })
        .then(sede => {
            if (!checkFound(res, sede)) return;
            res.status(200).send({ code: 200, message: 'Sede eliminada exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, sede) {
    if (!sede) {
        res.status(409).send({ code: 409, message: 'El ID de la sede no existe' });
        return;
    }
    return sede;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarSedePorID = (req, res, next) => {
    const originalSede = {
        idSede: req.params.idSede
    }
    sede.findOne({ idSede: originalSede.idSede }, (err, sede) => {

        if (!sede) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la sede no existe' });
        } else {
            const dataSede = {
                    idSede: sede.idSede,
                    nombre: sede.nombre,
                    direccion: sede.direccion,
                    celular: sede.celular,
                    correo: sede.correo,
                }
                // response 
            res.send(dataSede);
        }
    });
}