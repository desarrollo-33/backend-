let ordenes = [];

function obtenerTodasLasOrdenes(req, res) {
    res.json(ordenes);
}

function obtenerOrdenPorId(req, res) {
    const idOrden = parseInt(req.params.id);
    const orden = ordenes.find(orden => orden.id === idOrden);

    if (orden) {
        res.json(orden);
    } else {
        res.status(404).json({ mensaje: 'Orden de servicio no encontrada' });
    }
}


function crearOrden(req, res) {
    const { cliente, ubicacion, descripcion } = req.body;
    const nuevaOrden = {
        id: ordenes.length + 1,
        cliente,
        ubicacion,
        descripcion, // Nuevo campo
        tecnico: null,
        estado: 'Abierta'
    };
    ordenes.push(nuevaOrden);
    res.status(201).json(nuevaOrden);
}
function asignarTecnico(req, res) {
    const idOrden = parseInt(req.params.id);
    const orden = ordenes.find(orden => orden.id === idOrden);

    if (orden) {
        const { tecnico } = req.body;
        orden.tecnico = tecnico;
        res.json(orden);
    } else {
        res.status(404).json({ mensaje: 'Orden de servicio no encontrada' });
    }
}

function cerrarOrden(req, res) {
    const idOrden = parseInt(req.params.id);
    const orden = ordenes.find(orden => orden.id === idOrden);

    if (orden) {
        orden.estado = 'Cerrada';
        res.json(orden);
    } else {
        res.status(404).json({ mensaje: 'Orden de servicio no encontrada' });
    }
}

function actualizarEstadoOrden(req, res) {
    const idOrden = parseInt(req.params.id);
    const nuevoEstado = req.body.estado;

    const orden = ordenes.find(orden => orden.id === idOrden);

    if (orden) {
        orden.estado = nuevoEstado;

        // Incluye la descripción en la respuesta
        orden.descripcion = req.body.descripcion;

        res.json(orden);
    } else {
        res.status(404).json({ mensaje: 'Orden de servicio no encontrada' });
    }
}


module.exports = {
    obtenerTodasLasOrdenes,
    obtenerOrdenPorId,
    crearOrden,
    asignarTecnico,
    cerrarOrden,
    actualizarEstadoOrden
};