const docente = require('./docentes.dao');

exports.crearDocente = (req, res, next) => {
    const nuevoDocente = {
        dpi: req.body.dpi,
        nombre: req.body.nombre,
        correo: req.body.correo,
        celular: req.body.celular,
        estado: req.body.estado
    }

    docente.crear(nuevoDocente, (err, docente) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El dpi del docente ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataDocente = {
                dpi: docente.dpi,
                nombre: docente.nombre,
                correo: docente.correo,
                celular: docente.celular,
                estado: docente.estado
            }
            // response 
        res.send({ dataDocente });
    });
}

exports.listarDocente = (req, res, next) => {
    docente.listar((err, docentes) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(docentes);
    });

}

exports.actualizarDocente = (req, res, next) => {
    const originalDocente = {
        dpi: req.params.dpi,
        nombre: req.body.nombre,
        correo: req.body.correo,
        celular: req.body.celular,
        estado: req.body.estado
    }
    docente.findOne({ dpi: originalDocente.dpi }, (err, docente) => {

        if (!docente) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El dpi del docente no existe' });
        } else {
            docente.nombre = originalDocente.nombre,
                docente.correo = originalDocente.correo,
                docente.celular = originalDocente.celular,
                docente.estado = originalDocente.estado

            docente.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Docente actualizado exitosamente!' });
            })
        }
    });
}

exports.eliminarDocente = (req, res) => {
    const dpiRecibido = req.params.dpi;

    docente.findOneAndRemove({ dpi: dpiRecibido })
        .then(docente => {
            if (!checkFound(res, docente)) return;
            res.status(200).send({ code: 200, message: 'Docente eliminado exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, docente) {
    if (!docente) {
        res.status(409).send({ code: 409, message: 'El dpi del docente no existe' });
        return;
    }
    return estudiante;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarDocentePorID = (req, res, next) => {
    const originalDocente = {
        dpi: req.params.dpi
    }
    docente.findOne({ dpi: originalDocente.dpi }, (err, docente) => {

        if (!docente) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El dpi del docente no existe' });
        } else {
            const dataDocente = {
                    dpi: docente.dpi,
                    nombre: docente.nombre,
                    correo: docente.correo,
                    celular: docente.celular,
                    estado: docente.estado
                }
                // response 
            res.send(dataDocente);
        }
    });
}