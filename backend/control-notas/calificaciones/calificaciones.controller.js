const calificacion = require('./calificaciones.dao');

exports.crearCalificacion = (req, res, next) => {
    const nuevaCalificacion = {
        idCalificacion: req.body.idCalificacion,
        carnetEstudiante: req.body.carnetEstudiante,
        idActividad: req.body.idActividad,
        punteo: req.body.punteo
    }

    calificacion.crear(nuevaCalificacion, (err, calificacion) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID de la calificación ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataCalificacion = {
                idCalificacion: calificacion.idCalificacion,
                carnetEstudiante: calificacion.carnetEstudiante,
                idActividad: calificacion.idActividad,
                punteo: calificacion.punteo
            }
            // response 
        res.send({ dataCalificacion });
    });
}

exports.listarCalificacion = (req, res, next) => {
    calificacion.listar((err, calificaciones) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(calificaciones);
    });

}

exports.actualizarCalificacion = (req, res, next) => {
    const originalCalificacion = {
        idCalificacion: req.params.idCalificacion,
        carnetEstudiante: req.body.carnetEstudiante,
        idActividad: req.body.idActividad,
        punteo: req.body.punteo
    }
    calificacion.findOne({ idCalificacion: originalCalificacion.idCalificacion }, (err, calificacion) => {

        if (!calificacion) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la actividad no existe' });
        } else {
            calificacion.carnetEstudiante = originalCalificacion.carnetEstudiante,
                calificacion.idActividad = originalCalificacion.idActividad,
                calificacion.punteo = originalCalificacion.punteo

            calificacion.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Calificacion actualizada exitosamente!' });
            })
        }
    });
}

exports.eliminarCalificacion = (req, res) => {
    const calificacionRecibida = req.params.idCalificacion;

    calificacion.findOneAndRemove({ idCalificacion: calificacionRecibida })
        .then(calificacion => {
            if (!checkFound(res, calificacion)) return;
            res.status(200).send({ code: 200, message: 'Calificación eliminada exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, calificacion) {
    if (!calificacion) {
        res.status(409).send({ code: 409, message: 'El ID de la calificación no existe' });
        return;
    }
    return calificacion;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarCalificacionPorID = (req, res, next) => {
    const originalCalificacion = {
        idCalificacion: req.params.idCalificacion
    }
    calificacion.findOne({ idCalificacion: originalCalificacion.idCalificacion }, (err, calificacion) => {

        if (!calificacion) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la calificación no existe' });
        } else {
            const dataCalificacion = {
                    idCalificacion: calificacion.idCalificacion,
                    carnetEstudiante: calificacion.carnetEstudiante,
                    idActividad: calificacion.idActividad,
                    punteo: calificacion.punteo
                }
                // response 
            res.send(dataCalificacion);
        }
    });
}