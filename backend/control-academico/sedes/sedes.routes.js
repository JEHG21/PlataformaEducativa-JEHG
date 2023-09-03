const sede = require('./sedes.controller');
module.exports = (router) => {
    router.post('/sedes/crear', sede.crearSede);
    router.get('/sedes/listar', sede.listarSede);
    router.get('/sedes/listar/:idSede', sede.listarSedePorID);
    router.put('/sedes/editar/:idSede', sede.actualizarSede);
    router.delete('/sedes/eliminar/:idSede', sede.eliminarSede);
}