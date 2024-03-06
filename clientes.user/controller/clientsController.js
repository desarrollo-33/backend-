let clientes = [
    { id: 1, nombreCliente: 'Ecopetrol', nombreContacto: 'Maria Gomez', asesor: 'Armando Pedrozo' },
    { id: 2, nombreCliente: 'U Nacional', nombreContacto: 'Andres Peña', asesor: 'Armando Pedrozo' },
    { id: 3, nombreCliente: 'Fogafing', nombreContacto: 'Ricardo Amado', asesor: 'Milena Ortiz' },
    { id: 4, nombreCliente: 'Bavaria', nombreContacto: 'Carlos Diaz', asesor: 'David Guerra' },
    { id: 5, nombreCliente: 'Condensa', nombreContacto: 'Pedro Vargas', asesor: 'Karen Rodriguez' },
];

// Esta función maneja la solicitud para obtener todos los clientes.
function getAllClients(req, res) {
    // Retorna la lista completa de clientes en formato JSON.
    res.json(clientes);
}

// Esta función maneja la solicitud para obtener un cliente por su ID.
function getClientById(req, res) {
    // Obtiene el ID del cliente de los parámetros de la solicitud.
    const clientId = parseInt(req.params.id);

    // Busca el cliente en la lista por su ID.
    const client = clientes.find(client => client.id === clientId);

    // Si encuentra el cliente, lo retorna en formato JSON.
    // Si no lo encuentra, responde con un código de estado 404 y un mensaje indicando que el cliente no fue encontrado.
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
}

// Esta función maneja la solicitud para crear un nuevo cliente.
function createClient(req, res) {
    // Extrae los datos del nuevo cliente del cuerpo de la solicitud.
    const { nombreCliente, nombreContacto, asesor } = req.body;

    // Crea un objeto con un nuevo ID.
    const newClient = { id: clientes.length + 1, nombreCliente, nombreContacto, asesor };

    // Agrega este nuevo cliente a la lista de clientes.
    clientes.push(newClient);

    // Responde con el cliente recién creado en formato JSON y un código de estado 201 indicando que la creación fue exitosa.
    res.status(201).json(newClient);
}

// Esta función maneja la solicitud para actualizar un cliente existente por su ID.
function updateClient(req, res) {
    // Obtiene el ID del cliente de los parámetros de la solicitud.
    const clientId = parseInt(req.params.id);

    // Busca el cliente en la lista por su ID.
    const clientIndex = clientes.findIndex(client => client.id === clientId);

    // Si encuentra el cliente, actualiza sus datos con la información proporcionada en el cuerpo de la solicitud.
    // Responde con el cliente actualizado en formato JSON.
    // Si no encuentra el cliente, responde con un código de estado 404 y un mensaje indicando que el cliente no fue encontrado.
    if (clientIndex !== -1) {
        clientes[clientIndex].nombreCliente = req.body.nombreCliente;
        clientes[clientIndex].nombreContacto = req.body.nombreContacto;
        clientes[clientIndex].asesor = req.body.asesor;
        res.json(clientes[clientIndex]);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
}

// Esta función maneja la solicitud para eliminar un cliente por su ID.
function deleteClient(req, res) {
    // Obtiene el ID del cliente de los parámetros de la solicitud.
    const clientId = parseInt(req.params.id);

    // Busca el cliente en la lista por su ID.
    const clientIndex = clientes.findIndex(client => client.id === clientId);

    // Si encuentra el cliente, lo elimina de la lista.
    // Responde con un mensaje indicando que el cliente fue eliminado exitosamente.
    // Si no encuentra el cliente, responde con un código de estado 404 y un mensaje indicando que el cliente no fue encontrado.
    if (clientIndex !== -1) {
        clientes.splice(clientIndex, 1);
        res.json({ mensaje: 'Cliente eliminado exitosamente' });
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};
