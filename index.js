const express = require('express');
const app = express();
const path = require('path');

express.static(__dirname + '/public')

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(3000,function(){
});

