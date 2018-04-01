const express = require('express');
const app = express();
const path = require('path');
const server  = app.listen(3000);
const { spawn } = require('child_process');
var io = require('socket.io').listen(server);
var fs = require('fs');

express.static(__dirname + '/public')

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});


io.on('connection', function(socket){
  socket.on('run', function(data) {
    fs.writeFile("main.cpp", data.code, function(err) {
      if(err) {
        return console.log(err);
      } else {
        var promise = new Promise(function(resolve, reject) {
          const compile = spawn("g++", ["main.cpp"]);
          
          compile.stderr.on('data', (data) => {
            reject(data.toString());
          });
          compile.on('exit', (code) => {
            resolve();
          });
        });
        
        promise.then((val)=> {
          const run = spawn("./a.out");        
          run.stdout.on('data', (data) => {
            socket.emit("run_success", data.toString());
          });

          run.stderr.on('data', (data) => {
            socket.emit("run_fail", data.toString());
          });

          run.on('exit', (code) => {
          });
        }, (err) => {
          socket.emit("run_fail", err);
        });
      }
    }); 
  });
  
  socket.on('disconnect', function(){
  });
});
