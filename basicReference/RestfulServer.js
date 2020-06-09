var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
app.use(bodyParser.json({ type: 'application/json' }));


app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

user = {
  "user4" : {
     "name" : "mohit",
     "password" : "password4",
     "profession" : "teacher",
     "id": 4
  }
}

app.post('/addUser', function (req, res,data) {
  // First read existing users.
  fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
      
    try {
      data = JSON.parse( data );

      newUser=req.body;
      
      newId = "user"+(Object.keys(data).length+1);
      data[newId] = newUser;
      //data["user4"] = user["user4"];
      console.log( data );
      
      strData=JSON.stringify(data);
      fs.writeFile(__dirname + "/public/" + "users.json",strData, 'utf8', function (err) {
        res.end( strData);
      }
      );
    }catch(Err){
      res.end( "{error:"+Err+"}");

    }
  });
})


app.delete('/deleteUser', function (req, res) {
  
  // First read existing users.
  fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
      
      data = JSON.parse( data );
      deleteId=req.query.userid;
      delete data["user" + deleteId];
      
      console.log( data );
      res.end( JSON.stringify(data));
  });
})

var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})