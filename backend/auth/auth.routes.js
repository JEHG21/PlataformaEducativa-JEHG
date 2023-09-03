const users = require('./auth.controller');
module.exports = (router) => {
    router.post('/registro', users.crearUsuario);
    router.post('/login', users.loginUsuario);
    router.get('/usuarios/listar', users.listarUsuario);
    router.get('/usuarios/listar/:_id', users.listarUsuarioPorID);
    router.put('/usuarios/editar/:_id', users.actualizarUsuario);
    router.delete('/usuarios/eliminar/:_id', users.eliminarUsuario);
}