// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Importa el módulo body-parser para analizar datos del cuerpo de la solicitud HTTP
const bodyParser = require('body-parser');

// Crea una instancia de la aplicación Express
const app = express();
// Define el puerto en el que la aplicación estará escuchando
const port = 3000;

// Middleware para analizar datos del cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

// Array para almacenar los usuarios (simulación de una base de datos)
let users = [
  { id: 1, name: 'Usuario 1' },
  { id: 2, name: 'Usuario 2' },
  { id: 3, name: 'Usuario 3' },
  { id: 4, name: 'Usuario 4' },
  { id: 5, name: 'Usuario 5' },
  { id: 6, name: 'Usuario 6' }
];

// Ruta para obtener la lista de usuarios (método GET)
app.get('/users', (req, res) => {
  // Envía la lista de usuarios en formato JSON como respuesta
  res.json(users);
});

// Ruta para obtener un usuario por ID (método GET)
app.get('/users/:id', (req, res) => {
  // Extrae el parámetro de la URL que representa el ID del usuario
  const userId = parseInt(req.params.id);
  // Busca el usuario en el array por su ID
  const user = users.find(u => u.id === userId);

  // Si se encuentra el usuario, lo envía como respuesta en formato JSON
  // Si no se encuentra, envía un mensaje de error con un código de estado 404 (Not Found)
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Ruta para agregar un nuevo usuario (método POST)
app.post('/users', (req, res) => {
  // Extrae los datos del cuerpo de la solicitud (nuevo usuario en formato JSON)
  const newUser = req.body;
  // Agrega el nuevo usuario al array de usuarios
  users.push(newUser);
  // Envía el nuevo usuario como respuesta con un código de estado 201 (Created)
  res.status(201).json(newUser);
});

// Ruta para actualizar un usuario por ID (método PUT)
app.put('/users/:id', (req, res) => {
  // Extrae el ID del usuario de la URL
  const userId = parseInt(req.params.id);
  // Extrae los datos actualizados del cuerpo de la solicitud
  const updatedUser = req.body;

  // Actualiza el array de usuarios, reemplazando el usuario antiguo con los datos actualizados
  users = users.map(u => (u.id === userId ? { ...u, ...updatedUser } : u));

  // Envía un mensaje de éxito como respuesta
  res.json({ message: 'Usuario actualizado correctamente' });
});

// Ruta para eliminar un usuario por ID (método DELETE)
app.delete('/users/:id', (req, res) => {
  // Extrae el ID del usuario de la URL
  const userId = parseInt(req.params.id);
  // Filtra el array para excluir el usuario con el ID especificado
  users = users.filter(u => u.id !== userId);

  // Envía un mensaje de éxito como respuesta
  res.json({ message: 'Usuario eliminado correctamente' });
});

// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});