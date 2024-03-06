const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const puerto = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Almacenamiento de usuarios en memoria (simulando una base de datos)
const usuarios = [];

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});
-





// Ruta para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  res.json(usuario);
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  usuarios.push(nuevoUsuario);

  res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});

// Ruta para actualizar un usuario por su ID
app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  const nuevoDatosUsuario = req.body;
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...nuevoDatosUsuario };

  res.json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarios[usuarioIndex] });
});

// Ruta para eliminar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);

  res.json({ mensaje: 'Usuario eliminado exitosamente', usuario: usuarioEliminado[0] });
});

// Iniciar el servidor
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
