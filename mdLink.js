const fs = require('fs')
const argv = process.argv.slice(2)
const pathModule = require('path')


let finalPath = ''

// Comprobando si es un directorio o un archivo directo.
const searchMD = (path) => {
  const fileStats = fs.lstatSync(path).isDirectory();
  if (fileStats) {
    const readingDir = fs.readdirSync(path);
    readingDir.forEach((file) => {
      if (pathModule.extname(file) === '.md') {
        const fullPath1 = pathModule.join(path, file);
        finalPath = fullPath1;
      } else {
        const fullPath2 = pathModule.join(path, file);
        searchMD(fullPath2)
      }
    })
  } else if (pathModule.extname(path) === '.md') {
    finalPath = path;
  } else if (finalPath === '') {
    console.log('La ruta ingresada no direcciona a un archivo .md');
  }
  return finalPath;
};
searchMD(argv[0]);

// Convirtiendo la ruta relativa a ruta absoluta
const absoluteRoute = pathModule.resolve(finalPath)
