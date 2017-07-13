// var app = require('express')();

console.log("Listening At Port 3002");
var io = require('socket.io')();
io.on('connection', function(socket){
  socket.on("hi",function(data){
    console.log(data);
  });

  socket.emit("event","hello");
});

io.listen(3002);



//
// server.listen(3002,function(){
//   console.log("Starting Server");
// });
