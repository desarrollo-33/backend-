const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controller/controller');

router.get('/', controladorUsuarios.obtenerTodosLosUsuarios);
router.get('/:id', controladorUsuarios.obtenerUsuarioPorId);
router.post('/', controladorUsuarios.crearUsuario);
router.put('/:id', controladorUsuarios.actualizarUsuario);
router.put('/cambiarCargo/:id', controladorUsuarios.cambiarCargorUsuario);
router.delete('/:id', controladorUsuarios.eliminarUsuario);

module.exports = router;