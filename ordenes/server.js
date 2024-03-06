const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PUERTO  = 8080;

app.use(bodyParser.json());

const ordenesRoutes = require('./src/routes/ordenes.routes');
app.use('/ordenes', ordenesRoutes);


app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});