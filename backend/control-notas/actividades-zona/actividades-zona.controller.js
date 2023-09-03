const actividad = require('./actividades-zona.dao');

exports.crearActividad = (req, res, next) => {
    const nuevaActividad = {
        idActividad: req.body.idActividad,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        ponderacion: req.body.ponderacion
    }

    actividad.crear(nuevaActividad, (err, actividad) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID de la actividad ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataActividad = {
                idActividad: actividad.idActividad,
                nombre: actividad.nombre,
                descripcion: actividad.descripcion,
                ponderacion: actividad.ponderacion
            }
            // response 
        res.send({ dataActividad });
    });
}

exports.listarActividad = (req, res, next) => {
    actividad.listar((err, actividades) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(actividades);
    });

}

exports.actualizarActividad = (req, res, next) => {
    const originalActividad = {
        idActividad: req.params.idActividad,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        ponderacion: req.body.ponderacion
    }
    actividad.findOne({ idActividad: originalActividad.idActividad }, (err, actividad) => {

        if (!actividad) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la actividad no existe' });
        } else {
            actividad.nombre = originalActividad.nombre,
                actividad.descripcion = originalActividad.descripcion,
                actividad.ponderacion = originalActividad.ponderacion

            actividad.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Actividad actualizada exitosamente!' });
            })
        }
    });
}

exports.eliminarActividad = (req, res) => {
    const actividadRecibida = req.params.idActividad;

    actividad.findOneAndRemove({ idActividad: actividadRecibida })
        .then(actividad => {
            if (!checkFound(res, actividad)) return;
            res.status(200).send({ code: 200, message: 'Actividad eliminada exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, actividad) {
    if (!actividad) {
        res.status(409).send({ code: 409, message: 'El ID de la actividad no existe' });
        return;
    }
    return actividad;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarActividadPorID = (req, res, next) => {
    const originalActividad = {
        idActividad: req.params.idActividad
    }
    actividad.findOne({ idActividad: originalActividad.idActividad }, (err, actividad) => {

        if (!actividad) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID de la actividad no existe' });
        } else {
            const dataActividad = {
                    idActividad: actividad.idActividad,
                    nombre: actividad.nombre,
                    descripcion: actividad.descripcion,
                    ponderacion: actividad.ponderacion
                }
                // response 
            res.send(dataActividad);
        }
    });
}