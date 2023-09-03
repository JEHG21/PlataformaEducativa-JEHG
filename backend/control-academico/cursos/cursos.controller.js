const curso = require('./cursos.dao');

exports.crearCurso = (req, res, next) => {
    const nuevoCurso = {
        idCurso: req.body.idCurso,
        nombre: req.body.nombre
    }

    curso.crear(nuevoCurso, (err, curso) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El ID del curso ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataCurso = {
                idCurso: curso.idCurso,
                nombre: curso.nombre
            }
            // response 
        res.send({ dataCurso });
    });
}

exports.listarCurso = (req, res, next) => {
    curso.listar((err, cursos) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(cursos);
    });

}

exports.actualizarCurso = (req, res, next) => {
    const originalCurso = {
        idCurso: req.params.idCurso,
        nombre: req.body.nombre
    }
    curso.findOne({ idCurso: originalCurso.idCurso }, (err, curso) => {

        if (!curso) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El carnet del estudiante no existe' });
        } else {
            curso.nombre = originalCurso.nombre,

                curso.save(err => {
                    if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                    res.status(200).send({ code: 200, message: 'Curso actualizado exitosamente!' });
                })
        }
    });
}

exports.eliminarCurso = (req, res) => {
    const cursoRecibido = req.params.idCurso;

    curso.findOneAndRemove({ idCurso: cursoRecibido })
        .then(curso => {
            if (!checkFound(res, curso)) return;
            res.status(200).send({ code: 200, message: 'Curso eliminado exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, curso) {
    if (!curso) {
        res.status(409).send({ code: 409, message: 'El ID del curso no existe' });
        return;
    }
    return curso;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarCursoPorID = (req, res, next) => {
    const originalCurso = {
        idCurso: req.params.idCurso
    }
    curso.findOne({ idCurso: originalCurso.idCurso }, (err, curso) => {

        if (!curso) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID del curso no existe' });
        } else {
            const dataCurso = {
                    idCurso: curso.idCurso,
                    nombre: curso.nombre,
                }
                // response 
            res.send(dataCurso);
        }
    });
}