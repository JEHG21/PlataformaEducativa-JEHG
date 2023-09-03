const facultad = require('./facultades.controller');
module.exports = (router) => {
    router.post('/facultades/crear', facultad.crearFacultad);
    router.get('/facultades/listar', facultad.listarFacultad);
    router.get('/facultades/listar/:idFacultad', facultad.listarFacultadPorID);
    router.put('/facultades/editar/:idFacultad', facultad.actualizarFacultad);
    router.delete('/facultades/eliminar/:idFacultad', facultad.eliminarFacultad);
}