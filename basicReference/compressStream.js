var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt.gz'));
  
console.log("File Compressed.");