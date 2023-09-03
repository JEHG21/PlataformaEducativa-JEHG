const rol = require('./roles.controller');
module.exports = (router) => {
    router.post('/roles/crear', rol.crearRol);
    router.get('/roles/listar', rol.listarRol);
    router.get('/roles/listar/:_id', rol.listarRolPorID);
    router.put('/roles/editar/:_id', rol.actualizarRol);
    router.delete('/roles/eliminar/:_id', rol.eliminarRol);
}