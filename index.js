//settings server
const path = require('path');
const express = require('express');

//server
const app = express();

//settings port
app.set('port', process.env.PORT || 3001);

//config rutas - static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port')), "192.168.1.14";
});

//websockets

//require socket
const SocketIO = require('socket.io');
//recibe la cnofiguracion del chat
const io = SocketIO(server);


io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  socket.on('chat:message', (data) => {
    io.sockets.emit('chat:message', data);
  });

  //escuchar el evento cuando un user esta escribiendo
  socket.on('chat:typing', (data) => {
    socket.broadcast.emit('chat:typing', data);
  });
});
