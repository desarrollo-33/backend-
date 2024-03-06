// Importa el módulo Express para crear la aplicación web
const express = require('express');
// Importa el módulo jsonwebtoken para trabajar con tokens JWT
const jwt = require('jsonwebtoken');

// Crea una instancia de la aplicación Express
const app = express();
// Define el número de puerto en el que la aplicación estará escuchando
const puerto = 3000;
// Clave secreta utilizada para firmar los tokens JWT
const claveSecreta = 'mi_clave_secreta';

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta de login para obtener el token
app.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  // Validación simple del usuario y la contraseña (¡realiza la autenticación de manera segura en un entorno de producción!)
  if (usuario === 'usuario1' && contraseña === 'contraseña123') {
    // Crear un token JWT
    const token = jwt.sign({ usuario }, claveSecreta, { expiresIn: '1h' });

    // Responde con un mensaje de éxito y el token generado
    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } else {
    // Responde con un mensaje de error si las credenciales son incorrectas
    res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }
});

// Middleware para verificar el token en rutas protegidas
const verificarToken = (req, res, next) => {
  // Obtiene el token del encabezado 'Authorization'
  const token = req.header('Authorization');

  if (!token) {
    // Responde con un código de estado 401 si no se proporciona un token
    return res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, claveSecreta);
    // Almacena la información del usuario decodificada en el objeto de solicitud
    req.usuario = decoded.usuario;
    // Continúa con la ejecución de la siguiente middleware o ruta
    next();
  } catch (error) {
    // Responde con un código de estado 401 si el token no es válido
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// Ruta protegida que requiere el middleware verificarToken
app.get('/contenido-protegido', verificarToken, (req, res) => {
  // Responde con un mensaje de éxito y la información del usuario obtenida del token
  res.json({ mensaje: 'Contenido protegido', usuario: req.usuario });
});

// Inicia el servidor y comienza a escuchar en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
