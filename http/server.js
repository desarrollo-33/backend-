// Importa el módulo HTTP de Node.js
const http = require('http');

// Configura el servidor HTTP
const server = http.createServer((req, res) => {
  // Configura la cabecera de la respuesta HTTP con un código 200 (OK) y el tipo de contenido como texto plano
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Envía el mensaje "¡Hola, mundo!" como contenido de la respuesta HTTP
  res.end('¡Hola, mundo!\n');
});

// Define el puerto (PORT) y la dirección (HOST) en la que el servidor escuchará las solicitudes
const PORT = 3000;
const HOST = 'localhost';

// Inicia el servidor y escucha en el puerto y la dirección especificados
server.listen(PORT, HOST, () => {
  // Imprime un mensaje en la consola indicando que el servidor está escuchando
  console.log(`Servidor Node.js escuchando en http://${HOST}:${PORT}/`);
});
