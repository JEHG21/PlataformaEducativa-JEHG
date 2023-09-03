const facultad = require('./facultades.dao');

exports.crearFacultad = (req, res, next) => {
    const nuevaFacultad = {
        idFacultad: req.body.idFacultad,
        nombre: req.body.nombre
    }

    facultad.crear(nuevaFacultad, (err, facultad) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID de la facultad ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataFacultad = {
                idFacultad: facultad.idFacultad,
                nombre: facultad.nombre
            }
            // response 
        res.send({ dataFacultad });
    });
}

exports.listarFacultad = (req, res, next) => {
    facultad.listar((err, facultades) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(facultades);
    });

}

exports.actualizarFacultad = (req, res, next) => {
    const originalFacultad = {
        idFacultad: req.params.idFacultad,
        nombre: req.body.nombre
    }
    facultad.findOne({ idFacultad: originalFacultad.idFacultad }, (err, facultad) => {

        if (!facultad) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la facultad no existe' });
        } else {
            facultad.nombre = originalFacultad.nombre,

                facultad.save(err => {
                    if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                    res.status(200).send({ code: 200, message: 'Facultad actualizada exitosamente!' });
                })
        }
    });
}

exports.eliminarFacultad = (req, res) => {
    const facultadRecibida = req.params.idFacultad;

    facultad.findOneAndRemove({ idFacultad: facultadRecibida })
        .then(facultad => {
            if (!checkFound(res, facultad)) return;
            res.status(200).send({ code: 200, message: 'Facultad eliminada exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, facultad) {
    if (!facultad) {
        res.status(409).send({ code: 409, message: 'El ID de la facultad no existe' });
        return;
    }
    return facultad;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarFacultadPorID = (req, res, next) => {
    const originalFacultad = {
        idFacultad: req.params.idFacultad
    }
    facultad.findOne({ idFacultad: originalFacultad.idFacultad }, (err, facultad) => {

        if (!facultad) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la facultad no existe' });
        } else {
            const dataFacultad = {
                    idFacultad: facultad.idFacultad,
                    nombre: facultad.nombre,
                }
                // response 
            res.send(dataFacultad);
        }
    });
}