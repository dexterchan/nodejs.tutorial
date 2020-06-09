var fs = require("fs");
var zlib = require('zlib');

// Decompress the file input.txt.gz to input.txt
inputfile=__dirname + "/input.txt.gz"
outputfile=__dirname + "/input2.txt"
fs.createReadStream(inputfile)
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream(outputfile));
  
console.log("File Decompressed.");

console.log( __dirname );