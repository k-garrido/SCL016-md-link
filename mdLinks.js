const fs = require('fs');
const argv = process.argv.slice(2);
const pathModule = require('path');
const marked = require("marked");
const fetch = require('node-fetch');




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

// Extrayendo links del archivo .md
const getLinks = (content, path) => {
  return new Promise((resolve, reject) => {
    const arrayLinks = [];
    const render = new marked.Renderer();
    render.link = (href, title, text) => {
      arrayLinks.push({
        href,
        text,
        file: path,
      });
    };
    marked(content, {
      renderer: render
    });
    resolve(arrayLinks)
  })
};

// Agregando el status y el ok 
const validateArray = (arrLinks) => {
  const promises = arrLinks.map((object) =>
    fetch(object.href)
    .then((res) => {
      if (res.status === 200) {
        return {
          href: object.href,
          text: object.text,
          file: object.file,
          status: res.status,
          statusText: res.statusText,
        };
      } else {
        return {
          href: object.href,
          text: object.text,
          file: object.file,
          status: res.status,
          statusText: "FAIL",
        };
      }

    })
    .catch((err) =>
      ({
        href: object.href,
        text: object.text,
        file: object.file,
        status: 404,
        statusText: "FAIL",
      })
    )
  );
  return Promise.all(promises);
};

// Funcion para retornar la informacion de la opcion --stats
const stats = (validateArray) =>  {
  const statsObject = {}
  statsObject.Total = validateArray.length
  statsObject.Unique = 0
  uniqueLinks = new Set()
  validateArray.forEach(object => {
    uniqueLinks.add (object.href)
  });
 statsObject.Unique = uniqueLinks.size
   return statsObject
}
// Funcion para retornar la informacion para las opciones --statats y --validate
const statsValidate = (validateArray) =>  {
  const statsObject = {}
  statsObject.Total = validateArray.length
  statsObject.Unique = 0
  statsObject.Broken = 0
  uniqueLinks = new Set()
  validateArray.forEach(object => {
    uniqueLinks.add(object.href)
    if (object.statusText === 'FAIL') {
      statsObject.Broken += 1
    }
  });
 statsObject.Unique = uniqueLinks.size
   return statsObject
}

// Extrayendo links

const mdLinks = () => {
  readMD(searchMD(argv[0]))
    .then(res => {
      if (argv[0] !== 'undefined' && argv[1] === undefined) {
        console.log(getLinks(res, searchMD(argv[0])))
      }
      return getLinks(res, searchMD(argv[0]))
    })
    .then((array) => {
      if (argv[1] === '--validate' && argv[2] === undefined) {
        validateArray(array)
        .then (res => console.log(res)) 
      }
      return validateArray(array)
    })
    .then(res => {
      stats(res);
      if (argv[1] === '--stats' && argv[2] === undefined) {
        console.table(stats(res));
      } else if (argv[1] === '--stats' || argv[2] === '--stats' && argv[1] === '--validate' || argv[2] === '--validate'){
        console.table(statsValidate(res));
      }
    })
    .catch(err => {
      console.error(err)
    })
}

mdLinks()







// Exportando funciones
module.exports = {
  mdLinks
};
