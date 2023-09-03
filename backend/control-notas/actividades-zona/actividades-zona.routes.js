const actividad = require('./actividades-zona.controller');
module.exports = (router) => {
    router.post('/actividades/crear', actividad.crearActividad);
    router.get('/actividades/listar', actividad.listarActividad);
    router.get('/actividades/listar/:idActividad', actividad.listarActividadPorID);
    router.put('/actividades/editar/:idActividad', actividad.actualizarActividad);
    router.delete('/actividades/eliminar/:idActividad', actividad.eliminarActividad);
}