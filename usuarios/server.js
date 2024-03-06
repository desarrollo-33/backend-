// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;

// Almacenamiento de usuarios en memoria (simulando una base de datos)
const usuarios = [];

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  // Devuelve todos los usuarios como una respuesta JSON
  res.json(usuarios);
});

// Ruta para obtener un usuario por su ID
app.get('/usuarios/:id', (req, res) => {
  // Obtiene el ID de los parámetros de la URL
  const id = req.params.id;
  // Busca el usuario en el array de usuarios por su ID
  const usuario = usuarios.find(u => u.id === id);

  // Verifica si el usuario fue encontrado
  if (!usuario) {
    // Si el usuario no se encuentra, responde con un código de estado 404 y un mensaje JSON
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Devuelve el usuario encontrado como una respuesta JSON
  res.json(usuario);
});

// Ruta para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  // Obtiene el nuevo usuario del cuerpo de la solicitud
  const nuevoUsuario = req.body;
  // Agrega el nuevo usuario al array de usuarios
  usuarios.push(nuevoUsuario);

  // Responde con un código de estado 201 y un mensaje JSON que incluye el usuario agregado
  res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
});

// Ruta para actualizar un usuario por su ID
app.put('/usuarios/:id', (req, res) => {
  // Obtiene el ID de los parámetros de la URL
  const id = req.params.id;
  // Busca el índice del usuario en el array de usuarios por su ID
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  // Verifica si el usuario fue encontrado
  if (usuarioIndex === -1) {
    // Si el usuario no se encuentra, responde con un código de estado 404 y un mensaje JSON
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Obtiene los nuevos datos del usuario del cuerpo de la solicitud
  const nuevosDatosUsuario = req.body;
  // Actualiza los datos del usuario en el array de usuarios
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...nuevosDatosUsuario };

  // Responde con un mensaje JSON que indica que el usuario fue actualizado exitosamente
  // y devuelve el usuario actualizado como parte de la respuesta
  res.json({ mensaje: 'Usuario actualizado exitosamente', usuario: usuarios[usuarioIndex] });
});

// Ruta para eliminar un usuario por su ID
app.delete('/usuarios/:id', (req, res) => {
  // Obtiene el ID de los parámetros de la URL
  const id = req.params.id;
  // Busca el índice del usuario en el array de usuarios por su ID
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  // Verifica si el usuario fue encontrado
  if (usuarioIndex === -1) {
    // Si el usuario no se encuentra, responde con un código de estado 404 y un mensaje JSON
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Elimina el usuario del array de usuarios
  const usuarioEliminado = usuarios.splice(usuarioIndex, 1);

  // Responde con un mensaje JSON que indica que el usuario fue eliminado exitosamente
  // y devuelve el usuario eliminado como parte de la respuesta
  res.json({ mensaje: 'Usuario eliminado exitosamente', usuario: usuarioEliminado[0] });
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
