
var express  = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);

app.use("/public", express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


server.listen(3010, function(){
  console.log("Starting Client");
});
