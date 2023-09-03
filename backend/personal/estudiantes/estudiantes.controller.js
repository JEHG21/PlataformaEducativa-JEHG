const estudiante = require('./estudiantes.dao');

exports.crearEstudiante = (req, res, next) => {
    const newEstudiante = {
        carnet: req.body.carnet,
        nombre: req.body.nombre,
        correo: req.body.correo,
        celular: req.body.celular,
        estado: req.body.estado
    }

    estudiante.crear(newEstudiante, (err, estudiante) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El carnet del estudiante ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataEstudiante = {
                carnet: estudiante.carnet,
                nombre: estudiante.nombre,
                correo: estudiante.correo,
                celular: estudiante.celular,
                estado: estudiante.estado
            }
            // response 
        res.send({ dataEstudiante });
    });
}

exports.listarEstudiante = (req, res, next) => {
    estudiante.listar((err, estudiantes) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(estudiantes);
    });
}

exports.actualizarEstudiante = (req, res, next) => {
    const originalEstudiante = {
        carnet: req.params.carnet,
        nombre: req.body.nombre,
        correo: req.body.correo,
        celular: req.body.celular,
        estado: req.body.estado
    }
    estudiante.findOne({ carnet: originalEstudiante.carnet }, (err, estudiante) => {

        if (!estudiante) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El carnet del estudiante no existe' });
        } else {
            estudiante.nombre = originalEstudiante.nombre,
                estudiante.correo = originalEstudiante.correo,
                estudiante.celular = originalEstudiante.celular,
                estudiante.estado = originalEstudiante.estado

            estudiante.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Estudiante actualizado exitosamente!' });
            })
        }
    });
}

exports.eliminarEstudiante = (req, res) => {
    const carnetRecibido = req.params.carnet;

    estudiante.findOneAndRemove({ carnet: carnetRecibido })
        .then(estudiante => {
            if (!checkFound(res, estudiante)) return;
            res.status(200).send({ code: 200, message: 'Estudiante eliminado exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, estudiante) {
    if (!estudiante) {
        res.status(409).send({ code: 409, message: 'El carnet del estudiante no existe' });
        return;
    }
    return estudiante;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarEstudiantePorID = (req, res, next) => {
    const originalEstudiante = {
        carnet: req.params.carnet
    }
    estudiante.findOne({ carnet: originalEstudiante.carnet }, (err, estudiante) => {

        if (!estudiante) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El carnet del estudiante no existe' });
        } else {
            const dataEstudiante = {
                    carnet: estudiante.carnet,
                    nombre: estudiante.nombre,
                    correo: estudiante.correo,
                    celular: estudiante.celular,
                    estado: estudiante.estado
                }
                // response 
            res.send(dataEstudiante);
        }
    });
}