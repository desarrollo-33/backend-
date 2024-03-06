const fs = require('fs').promises;

// Función para leer el contenido de una imagen de forma asíncrona
async function leerImagen(nombreImagen) {
  try {
    // Lee el contenido de la imagen como un buffer binario
    const contenido = await fs.readFile(nombreImagen);

    // Puedes manipular o mostrar el contenido según tus necesidades
    console.log(`Contenido de la imagen ${nombreImagen}:`);
    console.log(contenido);
  } catch (error) {
    console.error(`Error al leer la imagen ${nombreImagen}: ${error.message}`);
  }
}

// Función para escribir en una imagen de forma asíncrona
async function escribirImagen(nombreImagen, contenido) {
  try {
    // Escribe el contenido en la imagen
    await fs.writeFile(nombreImagen, contenido);

    console.log(`Imagen ${nombreImagen} creada/actualizada exitosamente.`);
  } catch (error) {
    console.error(`Error al escribir en la imagen ${nombreImagen}: ${error.message}`);
  }
}

// Prueba: leer el contenido de una imagen existente y escribir en otra
leerImagen('ingeal'); // Reemplaza 'imagen.jpg' con el nombre de una imagen existente en tu sistema.

// Simulando un retardo antes de escribir en la imagen
setTimeout(async () => {
  try {
    // Intenta leer el archivo 'nuevaImagen.jpg'
    const nuevoContenido = await fs.readFile('./ingeal.jpg');

    // Si el archivo existe, escribe en una nueva imagen
    await escribirImagen('nuevaImagenCopia.jpg', nuevoContenido);
  } catch (error) {
    console.error(`Error al leer o escribir en la imagen: ${error.message}`);
  }
}, 2000);

