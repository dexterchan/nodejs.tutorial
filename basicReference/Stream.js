var fs = require("fs");

// Create a readable stream
var readerStream = fs.createReadStream('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt');

// Create a writable stream
var writerStream = fs.createWriteStream('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/output.txt');

// Pipe the read and write operations
// read input.txt and write data to output.txt
readerStream.pipe(writerStream);

console.log("Program Ended");