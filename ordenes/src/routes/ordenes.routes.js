const express = require('express');
const router = express.Router();
const controladorOrdenes = require('../controller/ordones.controller');

router.get('/',controladorOrdenes.obtenerTodasLasOrdenes);
router.get('/:id',controladorOrdenes.obtenerOrdenPorId);
router.post('/',controladorOrdenes.crearOrden);
router.put('/asignarTecnico/:id',controladorOrdenes.asignarTecnico);
router.put('/cerrarOrden/:id',controladorOrdenes.cerrarOrden); 
router.put('/actulizarEstado/:id',controladorOrdenes.actualizarEstadoOrden);

module.exports = router;