// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;
// Importa el módulo axios para realizar solicitudes HTTP
const axios = require('axios');

// Función asíncrona para obtener información de la API
async function obtenerInformacion() {
  try {
    // Obtener información del personaje con id 1 desde la API de Rick and Morty
    const response1 = await axios.get('https://rickandmortyapi.com/api/character/1');
    const character = response1.data;
    console.log('Información del Personaje con id 1:', character);

    // Obtener la lista de personajes desde la API de Rick and Morty
    const response2 = await axios.get('https://rickandmortyapi.com/api/character/');
    // Obtener los primeros tres personajes de la lista
    const characters = response2.data.results.slice(0, 3);
    console.log('Lista de Personajes:', characters);
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante las solicitudes HTTP
    console.error('Error al obtener información:', error.message);
  }

  // Iniciar el servidor después de completar las solicitudes
  app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
  });
}

// Llamar a la función para obtener información y luego iniciar el servidor
obtenerInformacion();
