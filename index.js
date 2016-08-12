console.log('socket server running');

var express = require('express');
var app = express();
var PORT = process.env.PORT;
var server = app.listen(PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

var currentDrawData = [];

app.get('/', function(req, res) {
  console.log('hello');
  console.log('hello');
  res.render('index.html');
});


var endConnection = function(socket) {
  console.log('Client has disconnected');
};

var newConnection = function(socket) {
  console.log(socket.id + ' is connected');
  socket.on('mouse', mouseMsg);

  function mouseMsg(data) {
    socket.broadcast.emit('mouse', data);
    console.log('broadcasting ' + JSON.stringify(data));
  };
};

io.sockets.on('connection', newConnection);

io.sockets.on('disconnect', endConnection);




