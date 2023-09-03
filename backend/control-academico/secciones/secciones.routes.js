const seccion = require('./secciones.controller');
module.exports = (router) => {
    router.post('/secciones/crear', seccion.crearSeccion);
    router.get('/secciones/listar', seccion.listarSeccion);
    router.get('/secciones/listar/:idSeccion', seccion.listarSeccionPorID);
    router.put('/secciones/editar/:idSeccion', seccion.actualizarSeccion);
    router.delete('/secciones/eliminar/:idSeccion', seccion.eliminarSeccion);
}