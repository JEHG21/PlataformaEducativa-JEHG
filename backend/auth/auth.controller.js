const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.crearUsuario = (req, res, next) => {
    const newUser = {
        nombre: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.crear(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send({ code: 409, message: 'El email del usuario ya existe!' });
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            // response 
        res.send({ dataUser });
    });
}

exports.loginUsuario = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });

        if (!user) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'Algo está mal!' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }
                res.send({ dataUser });
            } else {
                // password wrong
                res.status(409).send({ code: 409, message: 'Algo está mal!' });
            }
        }
    });
}

exports.listarUsuario = (req, res, next) => {
    User.listar((err, usuarios) => {
        if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
        res.send(usuarios);
    });
}

exports.actualizarUsuario = (req, res, next) => {
    const originalUsuario = {
        _id: req.params._id,
        nombre: req.body.nombre,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password)
    }
    User.findOne({ _id: originalUsuario._id }, (err, usuario) => {

        if (!usuario) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID del usuario no existe' });
        } else {
            usuario.nombre = originalUsuario.nombre,
                usuario.email = originalUsuario.email,
                // usuario.password = originalUsuario.password

                usuario.save(err => {
                    if (err) return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
                    res.status(200).send({ code: 200, message: 'Usuario actualizado exitosamente!' });
                })
        }
    });
}

exports.eliminarUsuario = (req, res) => {
    const usuarioRecibido = req.params._id;

    User.findOneAndRemove({ _id: usuarioRecibido })
        .then(usuario => {
            if (!checkFound(res, usuario)) return;
            res.status(200).send({ code: 200, message: 'Usuario eliminado exitosamente!' });
        })
        .catch(err => {
            if (checkServerError(res, err)) return;
        });
}

function checkFound(res, usuario) {
    if (!usuario) {
        res.status(409).send({ code: 409, message: 'El ID del usuario no existe' });
        return;
    }
    return usuario;
}

function checkServerError(res, err) {
    if (err) {
        return res.status(500).send({ code: 500, message: 'Ocurrió un error en el servidor!' });
    }
}

exports.listarUsuarioPorID = (req, res, next) => {
    const originalUsuario = {
        _id: req.params._id
    }
    User.findOne({ _id: originalUsuario._id }, (err, usuario) => {

        if (!usuario) {
            // email does not exist
            res.status(409).send({ code: 409, message: 'El ID del usuario no existe' });
        } else {
            const dataUsuario = {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email,
                    password: usuario.password,
                    createdAt: usuario.createdAt
                }
                // response 
            res.send(dataUsuario);
        }
    });
}