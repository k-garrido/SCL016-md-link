#!/usr/bin/env node

const argv = process.argv.slice(2);
const {
  searchMD,
  readMD,
  getLinks,
  validateArray,
  stats,
  statsValidate,
} = require('./functions.js');

const mdLinksCLI = () => {
  readMD(searchMD(argv[0]))
    .then(res => {
      if (argv[0] !== 'undefined' && argv[1] === undefined) {
        console.log(getLinks(res, searchMD(argv[0])));
      }
      return getLinks(res, searchMD(argv[0]));
    })
    .then((array) => {
      if (argv[1] === '--validate' && argv[2] === undefined) {
        validateArray(array)
          .then(res => console.log(res));
      }
      return validateArray(array);
    })
    .then(res => {
      stats(res);
      if (argv[1] === '--stats' && argv[2] === undefined) {
        console.table(stats(res));
      } else if (argv[1] === '--stats' || argv[2] === '--stats' && argv[1] === '--validate' || argv[2] === '--validate') {
        console.table(statsValidate(res));
      }
    })
    .catch(err => {
      console.error(err);
    });
};

mdLinksCLI();
