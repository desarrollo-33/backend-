// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;

// Inicializa un contador de visitas
let contadorVisitas = 0;

// Middleware para contar las visitas
app.use((req, res, next) => {
    // Incrementa el contador de visitas en cada solicitud
    contadorVisitas += 1;
    // Imprime un mensaje en la consola indicando el número de visitas
    console.log(`Visitas número ${contadorVisitas}`);
    // Llama a la función `next()` para pasar al siguiente middleware o ruta
    next();
});

// Ruta principal que muestra un mensaje con el número de visitas
app.get('/', (req, res) => {
    // Responde con un mensaje que incluye el número de visitas
    res.send(`¡Bienvenido! Este sitio ha sido visitado ${contadorVisitas} veces.`);
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
