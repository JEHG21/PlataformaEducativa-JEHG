'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const estudiantesRoutes = require('./personal/estudiantes/estudiantes.routes');
const docentesRoutes = require('./personal/docentes/docentes.routes');
const sedesRoutes = require('./control-academico/sedes/sedes.routes');
const facultadesRoutes = require('./control-academico/facultades/facultades.routes');
const cursosRoutes = require('./control-academico/cursos/cursos.routes');
const seccionesRoutes = require('./control-academico/secciones/secciones.routes');
const actividadesRoutes = require('./control-notas/actividades-zona/actividades-zona.routes');
const calificacionesRoutes = require('./control-notas/calificaciones/calificaciones.routes');
const rolesRoutes = require('./administracion/roles/roles.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
    res.send('auth');
});

estudiantesRoutes(router);
router.get('/', (req, res) => {
    res.send('estudiantes');
});

docentesRoutes(router);
router.get('/', (req, res) => {
    res.send('docentes');
});

sedesRoutes(router);
router.get('/', (req, res) => {
    res.send('sedes');
});

facultadesRoutes(router);
router.get('/', (req, res) => {
    res.send('facultades');
});

cursosRoutes(router);
router.get('/', (req, res) => {
    res.send('cursos');
});

seccionesRoutes(router);
router.get('/', (req, res) => {
    res.send('secciones');
});

actividadesRoutes(router);
router.get('/', (req, res) => {
    res.send('actividades');
});

calificacionesRoutes(router);
router.get('/', (req, res) => {
    res.send('calificaciones');
});

rolesRoutes(router);
router.get('/', (req, res) => {
    res.send('roles');
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`Servidor corriendo en el puerto: ${propierties.PORT}`));