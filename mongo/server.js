// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Importa el módulo axios para realizar solicitudes HTTP
const axios = require('axios');
// Importa el módulo fs para trabajar con el sistema de archivos
const fs = require('fs');
// Importa el módulo path para manejar rutas de archivos y directorios
const path = require('path');

// Crea una instancia de la aplicación Express
const app = express();
// Define el puerto en el que la aplicación estará escuchando
const puerto = 3000;

// Ruta donde se guardará la imagen descargada en el servidor
const rutaImagenDescargada = path.join(__dirname, 'imagen_descargada.jpg');

// URL de la imagen que se va a descargar
const urlImagen = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2FF7YIfD6eBic%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=1ee607d86fb6364a5ec9e747b060c1aa3eac62cf68e01e9d7e90811dbb25a8e8&ipo=images';

// Ruta del endpoint para descargar la imagen
app.get('/descargar-imagen', async (req, res) => {
  try {
    // Realiza una solicitud a la URL de la imagen usando axios
    const respuesta = await axios({
      method: 'get',
      url: urlImagen,
      responseType: 'stream', // Configura el tipo de respuesta como una secuencia de datos (stream)
    });

    // Guarda la imagen en el servidor escribiendo la secuencia de datos en un archivo
    respuesta.data.pipe(fs.createWriteStream(rutaImagenDescargada));

    // Envía la imagen como respuesta al cliente
    respuesta.data.pipe(res);
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante el proceso
    console.error('Error al cargar la imagen:', error.message);
    res.status(500).send('Error al descargar la imagen'); // Envía una respuesta de error al cliente
  }
});

// Inicia el servidor y lo hace escuchar en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});
