const fs = require('fs')
const argv = process.argv.slice(2)
const pathModule = require('path')

// Comprobando si es un directorio o un archivo directo
const searchMD = (path) => {
  const stat = fs.lstatSync(path).isDirectory()
  if (stat) {
    const openFile = fs.readdirSync(path)
    openFile.forEach ((file)=>{
      const filesDirectory = pathModule.join(path, file); // convierte el array en string
      console.log(filesDirectory);
    })

     return console.log (openFile)
  }
 
}

searchMD(argv[0])

