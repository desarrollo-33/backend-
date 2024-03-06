// Importar la biblioteca Express para crear el servidor web
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará las solicitudes
const puerto = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Almacenamiento de usuarios en memoria (simulando una base de datos)
const usuarios = [];

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  // Respuesta con la lista de usuarios
  res.json(usuarios);
});

// Ruta para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  // Obtener el ID de la URL
  const id = req.params.id;

  // Buscar el usuario en el arreglo por su ID
  const usuario = usuarios.find(u => u.id === id);

  // Verificar si el usuario fue encontrado
  if (!usuario) {
    // Si no se encuentra, enviar un mensaje de error y código de estado 404 (No encontrado)
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Respuesta con los datos del usuario encontrado
  res.json(usuario);
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  // Obtener los datos del nuevo usuario del cuerpo de la solicitud
  const nuevoUsuario = req.body;

  // Agregar el nuevo usuario al arreglo de usuarios
  usuarios.push(nuevoUsuario);

  // Respuesta con un mensaje de éxito y los datos del nuevo usuario
  res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});

// Ruta para actualizar un usuario por su ID
app.put('/usuarios/:id', (req, res) => {
  // Obtener el ID de la URL
  const id = req.params.id;

  // Buscar el índice del usuario en el arreglo por su ID
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  // Verificar si el usuario fue encontrado
  if (usuarioIndex === -1) {
    // Si no se encuentra, enviar un mensaje de error y código de estado 404 (No encontrado)
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Obtener los nuevos datos del usuario del cuerpo de la solicitud
  const nuevoDatosUsuario = req.body;

  // Actualizar los datos del usuario en el arreglo
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...nuevoDatosUsuario };

  // Respuesta con un mensaje de éxito y los datos del usuario actualizado
  res.json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarios[usuarioIndex] });
});

// Ruta para eliminar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
  // Obtener el ID de la URL
  const id = req.params.id;

  // Buscar el índice del usuario en el arreglo por su ID
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  // Verificar si el usuario fue encontrado
  if (usuarioIndex === -1) {
    // Si no se encuentra, enviar un mensaje de error y código de estado 404 (No encontrado)
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Eliminar el usuario del arreglo
  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);

  // Respuesta con un mensaje de éxito y los datos del usuario eliminado
  res.json({ mensaje: 'Usuario eliminado exitosamente', usuario: usuarioEliminado[0] });
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
