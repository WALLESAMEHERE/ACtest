var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);
server.listen(3000,function(){
	console.log('Listenuje na 3000');
});
app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
});
var randomNumber = Math.floor(Math.random()*10) + 1;
console.log('Wylosowany numer to ' + randomNumber);
io.sockets.on('connection', function (socket) {
  socket.on('yourNumber', function(msg){
  	if(isNaN(msg) || msg == ''){
  		io.emit('yourNumber',' Wprowadz liczbę !!!');
  	}
  	else{
	  	if(randomNumber > msg){
	  		io.emit('yourNumber', msg + ' - Liczba za mała');
	  	}
	  	else if(randomNumber < msg){
	  		io.emit('yourNumber', msg + ' - Liczba za duza');
	  	}
	  	else{
	  		io.emit('yourNumber', msg + ' - To ta liczba');
	  	}
  	}
  });
});
