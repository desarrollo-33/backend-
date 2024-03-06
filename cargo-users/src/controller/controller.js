const Usuario = require('../model/usuario');

let usuariosEmpresariales = [];

function obtenerTodosLosUsuarios(req, res){
    res.json(usuariosEmpresariales);
}

function obtenerUsuarioPorId(req, res){
    const usuario = usuariosEmpresariales.find(u => u.id ===  parseInt (req.params.id));
    if (usuario){
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
}

function crearUsuario(req, res){
    const {nombre, email, empresa, cargo} = req.body;
    const nuevoUsuario = new Usuario(usuariosEmpresariales.length+ 1, nombre, email, empresa, cargo);
    usuariosEmpresariales.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
}

function actualizarUsuario(req, res){
    const usuario = usuariosEmpresariales.find(u => u.id === parseInt(req.params.id));
   if (usuario) {
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.email = req.body.email || usuario.email;
    usuario.empresa = req.body.empresa || usuario.empresa;
    usuario.cargo = req.body.cargo || usuario.cargo;
    res.json(usuario);
   } else{
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
   }
}

function cambiarCargorUsuario(req, res){
    const usuario = usuariosEmpresariales.find(u => u.id === parseInt(req.params.id));
   if (usuario) {
    usuario.cargo = req.body.cargo || usuario.cargo;
    res.json(usuario);
   }else{
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
   }
}

function eliminarUsuario(req, res){
    usuariosEmpresariales = usuariosEmpresariales.filter(u => u.id !== parseInt(req.params.id));
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
}

module.exports = {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    cambiarCargorUsuario,
    eliminarUsuario
}