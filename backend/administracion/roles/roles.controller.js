const rol = require('./roles.dao');

exports.crearRol = (req, res, next) => {
    const nuevoRol = {
        nombre: req.body.nombre,
        ver: req.body.ver,
        crear: req.body.crear,
        editar: req.body.editar,
        eliminar: req.body.eliminar
    }

    rol.crear(nuevoRol, (err, rol) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El rol ingresado ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        const dataRol = {
                nombre: rol.nombre,
                ver: rol.ver,
                crear: rol.crear,
                editar: rol.editar,
                eliminar: rol.eliminar
            }
            // response 
        res.send({ dataRol });
    });
}

exports.listarRol = (req, res, next) => {
    rol.listar((err, roles) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(roles);
    });

}

exports.actualizarRol = (req, res, next) => {
    const originalRol = {
        _id: req.params._id,
        nombre: req.body.nombre,
        ver: req.body.ver,
        crear: req.body.crear,
        editar: req.body.editar,
        eliminar: req.body.eliminar
    }
    rol.findOne({ _id: originalRol._id }, (err, rol) => {

        if (!rol) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID del rol no existe' });
        } else {
            rol.nombre = originalRol.nombre,
                rol.ver = originalRol.ver,
                rol.crear = originalRol.crear,
                rol.editar = originalRol.editar,
                rol.eliminar = originalRol.eliminar

            rol.save(err => {
                if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                res.status(200).send({ code: 200, message: 'Rol actualizado exitosamente!' });
            })
        }
    });
}

exports.eliminarRol = (req, res) => {
    const rolRecibido = req.params._id;

    rol.findOneAndRemove({ _id: rolRecibido })
        .then(rol => {
            if (!checkFound(res, rol)) return;
            res.status(200).send({ code: 200, message: 'Rol eliminado exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, rol) {
    if (!rol) {
        res.status(409).send({ code: 409, message: 'El ID del rol no existe' });
        return;
    }
    return rol;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarRolPorID = (req, res, next) => {
    const originalRol = {
        _id: req.params._id
    }
    rol.findOne({ _id: originalRol._id }, (err, rol) => {

        if (!rol) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID del rol no existe' });
        } else {
            const dataRol = {
                    _id: rol._id,
                    nombre: rol.nombre,
                    ver: rol.ver,
                    crear: rol.crear,
                    editar: rol.editar,
                    eliminar: rol.eliminar
                }
                // response 
            res.send(dataRol);
        }
    });
}