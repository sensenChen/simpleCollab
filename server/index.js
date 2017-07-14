// var app = require('express')();

console.log("Listening At Port 3002");
var io = require('socket.io')();
var clients = []

io.on('connection', function(socket){
  
  
  socket.on("change",function(data){
    console.log(JSON.parse(data));
    for(var i=0;i<clients.length;i++){
      clients[i].emit("change",data);
    }
  });
  
  socket.on("key",function(data){
//    clients.push(data.key);
    clients.push(socket);
  })
});

io.listen(3002);



//
// server.listen(3002,function(){
//   console.log("Starting Server");
// });
