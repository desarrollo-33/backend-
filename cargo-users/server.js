const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./src/routes/usuarios.routes');
const app = express();
const PORT = 8080;

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(bodyParser.json());
app.use('/usuarios', usuariosRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

