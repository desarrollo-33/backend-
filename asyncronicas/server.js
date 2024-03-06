const fs = require('fs').promises;

async function leerArchivo(nombreArchivo) {
  try {
    const contenido = await fs.readFile(nombreArchivo, 'utf-8');
    return contenido;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`El archivo ${nombreArchivo} no existe.`);
    } else {
      console.error(`Error al leer el archivo ${nombreArchivo}: ${error.message}`);
    }
    return null;
  }
}

async function escribirArchivo(nombreArchivo, contenido) {
  try {
    await fs.writeFile(nombreArchivo, contenido, 'utf-8');
    console.log(`Archivo ${nombreArchivo} creado/actualizado exitosamente.`);
  } catch (error) {
    console.error(`Error al escribir en el archivo ${nombreArchivo}: ${error.message}`);
  }
}

async function concatenarArchivos(archivos) {
  try {
    const contenidos = await Promise.all(archivos.map(leerArchivo));

    // Filtrar los contenidos no nulos
    const contenidosValidos = contenidos.filter(contenido => contenido !== null);

    // Concatenar los contenidos
    const resultado = contenidosValidos.join('\n');

    await escribirArchivo('resultado.txt', resultado);
  } catch (error) {
    console.error(`Error en la concatenación de archivos: ${error.message}`);
  }
}

// Prueba con nombres de archivo inexistentes
concatenarArchivos(['archivo1.txt', 'archivo2.txt', 'archivo3.txt']);

// Prueba con archivos existentes
concatenarArchivos(['existente1.txt', 'existente2.txt']);
