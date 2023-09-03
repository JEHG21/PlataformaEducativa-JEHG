const seccion = require('./secciones.dao');

exports.crearSeccion = (req, res, next) => {
    const nuevaSeccion = {
        idSeccion: req.body.idSeccion,
        seccion: req.body.seccion
    }

    seccion.crear(nuevaSeccion, (err, seccion) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID de la seccion ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataSeccion = {
                idSeccion: seccion.idSeccion,
                seccion: seccion.seccion
            }
            // response 
        res.send({ dataSeccion });
    });
}

exports.listarSeccion = (req, res, next) => {
    seccion.listar((err, secciones) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(secciones);
    });

}

exports.actualizarSeccion = (req, res, next) => {
    const originalSeccion = {
        idSeccion: req.params.idSeccion,
        seccion: req.body.seccion
    }
    seccion.findOne({ idSeccion: originalSeccion.idSeccion }, (err, seccion) => {

        if (!seccion) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El carnet del estudiante no existe' });
        } else {
            seccion.seccion = originalSeccion.seccion,

                seccion.save(err => {
                    if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                    res.status(200).send({ code: 200, message: 'Sección actualizada exitosamente!' });
                })
        }
    });
}

exports.eliminarSeccion = (req, res) => {
    const seccionRecibida = req.params.idSeccion;

    seccion.findOneAndRemove({ idSeccion: seccionRecibida })
        .then(seccion => {
            if (!checkFound(res, seccion)) return;
            res.status(200).send({ code: 200, message: 'Sección eliminada exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, seccion) {
    if (!seccion) {
        res.status(409).send({ code: 409, message: 'El ID de la sección no existe' });
        return;
    }
    return seccion;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarSeccionPorID = (req, res, next) => {
    const originalSeccion = {
        idSeccion: req.params.idSeccion
    }
    seccion.findOne({ idSeccion: originalSeccion.idSeccion }, (err, seccion) => {

        if (!seccion) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la sección no existe' });
        } else {
            const dataSeccion = {
                    idSeccion: seccion.idSeccion,
                    seccion: seccion.seccion,
                }
                // response 
            res.send(dataSeccion);
        }
    });
}