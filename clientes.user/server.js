const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Rutas de clientes
const clientsRoutes = require('./routes/clients.routes');
app.use('/clients', clientsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
