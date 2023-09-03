const estudiantes = require('./estudiantes.controller');
module.exports = (router) => {
    router.post('/estudiantes/crear', estudiantes.crearEstudiante);
    router.get('/estudiantes/listar', estudiantes.listarEstudiante);
    router.get('/estudiantes/listar/:carnet', estudiantes.listarEstudiantePorID);
    router.put('/estudiantes/editar/:carnet', estudiantes.actualizarEstudiante);
    router.delete('/estudiantes/eliminar/:carnet', estudiantes.eliminarEstudiante);
}