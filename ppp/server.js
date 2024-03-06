// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Importa el módulo body-parser para analizar datos del cuerpo de la solicitud HTTP
const bodyParser = require('body-parser');

// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;

// Utiliza el middleware bodyParser para analizar datos del cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

// Array para almacenar las tareas
const tareas = [];

// Ruta GET para obtener todas las tareas o una tarea específica por su ID
app.get('/tareas/:id?', (req, res) => {
    // Obtiene el valor del parámetro :id de la URL y lo convierte a un número entero
    const tareaId = parseInt(req.params.id);

    // Comprueba si se proporciona un ID en la URL
    if (isNaN(tareaId)) {
        // Si no se proporciona un ID, devuelve todas las tareas
        res.json(tareas);
    } else {
        // Busca la tarea por su ID en el array de tareas
        const tarea = tareas.find(t => t.id === tareaId);

        if (tarea) {
            // Si la tarea se encuentra, la devuelve como respuesta
            res.json(tarea);
        } else {
            // Si la tarea no se encuentra, responde con un código de estado 404 y un mensaje JSON
            res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
    }
});

// Ruta POST para agregar una nueva tarea
app.post('/tareas', (req, res) => {
    // Obtiene la nueva tarea del cuerpo de la solicitud
    const nuevaTarea = req.body;
    // Asigna un ID único a la nueva tarea (puedes utilizar un paquete como `uuid` para generar IDs únicos)
    nuevaTarea.id = tareas.length + 1;
    // Agrega la nueva tarea al array de tareas
    tareas.push(nuevaTarea);
    // Responde con un código de estado 201 y un mensaje JSON que incluye la tarea agregada
    res.status(201).json({ mensaje: 'Tarea agregada exitosamente', tarea: nuevaTarea });
});

// Ruta PUT para actualizar el estado de una tarea por su ID o nombre
app.put('/tareas/:identificador', (req, res) => {
    // Obtiene el valor del parámetro :identificador de la URL
    const identificador = req.params.identificador;
    // Obtiene el nuevo estado de la tarea del cuerpo de la solicitud
    const nuevoEstado = req.body.estado;

    // Busca la tarea por su ID o por su nombre en el array de tareas
    const tarea = tareas.find(t => t.id === parseInt(identificador) || t.nombre === identificador);

    if (tarea) {
        // Si la tarea se encuentra, actualiza su estado y responde con un mensaje JSON
        tarea.estado = nuevoEstado;
        res.json({ mensaje: 'Estado de tarea actualizado exitosamente', tarea });
    } else {
        // Si la tarea no se encuentra, responde con un código de estado 404 y un mensaje JSON
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
});

// Ruta DELETE para eliminar una tarea por su ID
app.delete('/tareas/:id', (req, res) => {
    // Obtiene el valor del parámetro :id de la URL y lo convierte a un número entero
    const tareaId = parseInt(req.params.id);

    // Busca la tarea por su ID en el array de tareas
    const index = tareas.findIndex(t => t.id === tareaId);

    if (index !== -1) {
        // Si la tarea se encuentra, la elimina del array y responde con un mensaje JSON
        const tareaEliminada = tareas.splice(index, 1)[0];
        res.json({ mensaje: 'Tarea eliminada exitosamente', tarea: tareaEliminada });
    } else {
        // Si la tarea no se encuentra, responde con un código de estado 404 y un mensaje JSON
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${puerto}`);
});
