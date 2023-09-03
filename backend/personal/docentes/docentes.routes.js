const docente = require('./docentes.controller');
module.exports = (router) => {
    router.post('/docentes/crear', docente.crearDocente);
    router.get('/docentes/listar', docente.listarDocente);
    router.get('/docentes/listar/:dpi', docente.listarDocentePorID);
    router.put('/docentes/editar/:dpi', docente.actualizarDocente);
    router.delete('/docentes/eliminar/:dpi', docente.eliminarDocente);
}