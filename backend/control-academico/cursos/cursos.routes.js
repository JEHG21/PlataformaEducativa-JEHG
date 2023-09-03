const curso = require('./cursos.controller');
module.exports = (router) => {
    router.post('/cursos/crear', curso.crearCurso);
    router.get('/cursos/listar', curso.listarCurso);
    router.get('/cursos/listar/:idCurso', curso.listarCursoPorID);
    router.put('/cursos/editar/:idCurso', curso.actualizarCurso);
    router.delete('/cursos/eliminar/:idCurso', curso.eliminarCurso);
}