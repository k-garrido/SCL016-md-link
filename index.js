const {
  searchMD,
  readMD,
  getLinks,
  validateArray,
} = require('./functions.js');


const mdLinks = (path, options) => {
  readMD(searchMD(path))
    .then(res => {
      if (options.validate == false) {
        getLinks(res, searchMD(path))
          .then(res => {
            console.log(res);
          })
      }
      return getLinks(res, searchMD(path))
    })
    .then((array) => {
      if (options.validate == true) {
        validateArray(array)
          .then(res => console.log(res))
      }
      return validateArray(array)
    })
    .catch(err => {
      console.error(err)
    })
}

module.exports = {
  mdLinks
}
