var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require('http');
const fs = require('fs');
const func = require("./stringfile.js");
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/productofnumbers',function(req,res){
    let FirstNumber = req.query.FirstNumber;
    let SecondNumber = req.query.SecondNumber;

    const product = FirstNumber * SecondNumber;

    if(!product || isNaN(FirstNumber) || isNaN(SecondNumber)){
        res.sendStatus(404);
        res.end("Not found");
    }
    else{
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Product of 2 numbers is:" + product);
    }
});

app.get('/writefiletodisk',function(req,res){

    var newdata = req.query.newdata;

    fs.writeFile('outputfile.txt',newdata, (err) => {
        if(err){
          res.end(err);
         }
         else{
             res.statusCode = 200;
             res.end("File saved successfully. Check in outputfile.txt");
         }
       });
})

app.get('/string',function(req,res){
    var str = req.query.str;

     const result = func.readString(str);
     res.send(result);
})

server.listen(3001,function(){
    console.log("Server listening on port 3001");
});

module.exports = server;
