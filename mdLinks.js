const fs = require('fs');
const argv = process.argv.slice(2);
const pathModule = require('path');
const marked = require("marked");






// Comprobando si es un directorio o un archivo directo y convirtiendo ruta relativa a absoluta.
const searchMD = (path) => {
  let finalPath = ''
  const fileStats = fs.lstatSync(path).isDirectory();
  if (fileStats) {
    const readingDir = fs.readdirSync(path);
    readingDir.forEach((file) => {
      if (pathModule.extname(file) === '.md') {
        const fullPath1 = pathModule.join(path, file);
        finalPath = pathModule.resolve(fullPath1);
      } else {
        const fullPath2 = pathModule.join(path, file);
        searchMD(fullPath2)
      }
    })
  } else if (pathModule.extname(path) === '.md') {
    finalPath = pathModule.resolve(path);
  }
  return finalPath;
};

// Leyendo el archivo .md
const readMD = (finalPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(finalPath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('No se ha podido el leer el archivo .md'));
      } else {
        resolve(data);
      }
    })
  });
};

// Funcion para extraer links
const getLinks = (pathFile) => {
  const links = [];
  const myRen = new marked.Renderer();
  
    myRen.link = (href, title, text) => {
      links.push({
        href,
        text,
        file ,
      });
    };
    marked(pathFile, { renderer: myRen });
  
  return links;
};

// Extrayendo links
const mdLinks = () => {
  readMD(searchMD(argv[0]))
    .then(res => {
      const respuesta = res
      console.table (getLinks(respuesta))
    })
    .catch(err => {
      console.error(err)
    })

}

mdLinks()







// Exportando funciones

module.exports = {
  searchMD,
  readMD
};
