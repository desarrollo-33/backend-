// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Importa el módulo axios para realizar solicitudes HTTP
const axios = require('axios');

// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;

// Ruta para obtener información de usuarios
app.get('/usuarios', async (req, res) => {
  try {
    // Llama a la API de JSONPlaceholder para obtener usuarios
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');

    // Envía la respuesta con los datos de usuarios obtenidos de la API
    res.json(respuesta.data);
  } catch (error) {
    // Manejo de errores: Imprime el error en la consola y responde con un mensaje de error
    console.error('Error al obtener información de usuarios:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener información de usuarios' });
  }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
