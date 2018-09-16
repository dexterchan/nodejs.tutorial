const argv = require('minimist')(process.argv.slice(2));

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

console.log(argv.ip)
console.log(argv.port)
/* Hello, World! program in node.js */
console.log("Hello, World!")

//Finish playing with argument
//start a http server
var http = require("http");

//Non blocking example
var fs = require("fs");





http.createServer(function (request, response) {
    // Send the HTTP header 
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    

    fs.readFile('/Users/dexter/Documents/IPFS_Dist_DB_DEMO/tutorial/input.txt', function (err, data) {
        if (err) return console.error(err);
        response.end(data.toString());
     });
     // Send the response body as "Hello World"
    response.write('Hello World\n');
 }).listen(8082);

 // Console will print the message
console.log('Server running at http://127.0.0.1:8082/');