var fs = require("fs");


//Blocking example
var data = fs.readFileSync('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt');

console.log(data.toString());
console.log("Program Ended");

console.log()

//Non blocking example
var fs = require("fs");

fs.readFile('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt', function (err, data) {
   if (err) return console.error(err);
   console.log(data.toString());
});

console.log("Program Ended");