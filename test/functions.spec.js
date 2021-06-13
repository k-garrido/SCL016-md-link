const { searchMD, readMD, getLinks, validateArray } = require('../functions.js');

const exampleFullPath = 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md';
const fileContent = 'www.google.cl\nwww.facebook.com\nwww.youtube.com';
const exampleArray = [
    {
      href: 'http://www.google.cl',
      text: 'www.google.cl',
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md'
    },
    {
      href: 'http://www.facebook.com',
      text: 'www.facebook.com',
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md'
    },
    {
      href: 'http://www.youtube.com',
      text: 'www.youtube.com',
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md'
    }
  ];
const arrayWithValidate = [
    {
      href: 'http://www.google.cl',
      text: 'www.google.cl',       
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md',
      status: 200,
      statusText: 'OK'
    },
    {
      href: 'http://www.facebook.com',
      text: 'www.facebook.com',
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md',
      status: 200,
      statusText: 'OK'
    },
    {
      href: 'http://www.youtube.com',
      text: 'www.youtube.com',
      file: 'C:\\Users\\Katherinne\\Desktop\\MDLink\\SCL016-md-link\\exampleFolder\\links.md',
      status: 200,
      statusText: 'OK'
    }
  ];

describe('searchMD', () => {
    it('should be a function', () => {
      expect(typeof searchMD).toBe('function');
    });
  
    it('should return the fullfill path of a Markdown file', () => {
      expect(searchMD('./exampleFolder')).toBe(exampleFullPath);
    });
  });

  describe('readMD', () => {
    it('should be a function', () => {
      expect(typeof readMD).toBe('function');
    });
  
    // it('should return an string with the MD content', () => {
    //     readMD(exampleFullPath)
    //     .then (res => {
    //         expect(res).toStrictEqual(fileContent);
    //     })
    // });
  });

  describe('getLinks', () => {
    it('should be a function', () => {
      expect(typeof getLinks).toBe('function');
    });
  
    // it('should resolve an array', () => {
    //     expect.assertions(1);
    //     getLinks(fileContent,exampleFullPath)
    //     .then (res => {
    //         expect(typeof res).toBe('array');
    //     })
    // });

    it('should resolve an array with the md links', () => {
        getLinks(fileContent,exampleFullPath)
        .then (res => {
            expect(res).toStrictEqual(exampleArray);
        })
    }); 
  });

  describe('validateArray', () => {
    it('should be a function', () => {
      expect(typeof validateArray).toBe('function');
    });
  
    it('should return an string with the MD content', () => {
        validateArray(exampleArray)
        .then (res => {
            expect(res).toStrictEqual(arrayWithValidate);
        })
    });
  });
