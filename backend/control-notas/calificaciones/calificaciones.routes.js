const calificacion = require('./calificaciones.controller');
module.exports = (router) => {
    router.post('/calificaciones/crear', calificacion.crearCalificacion);
    router.get('/calificaciones/listar', calificacion.listarCalificacion);
    router.get('/calificaciones/listar/:idCalificacion', calificacion.listarCalificacionPorID);
    router.put('/calificaciones/editar/:idCalificacion', calificacion.actualizarCalificacion);
    router.delete('/calificaciones/eliminar/:idCalificacion', calificacion.eliminarCalificacion);
}