const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('Socket: ', socket);
  console.log(`A user connected to server, with socketId of ${socket.id}`);

  // Register
  socket.on('register', (userId) => {
    // Associate the user ID with the socket
    socket.userId = userId;

    // You can now use socket.userId to recognize this user
    // across different events during this connection
  });

  // Chat Message
  socket.on('chat message', function (msg) {
    console.log('Sender', msg.sender);
    console.log('Recepient', msg.recipient);
    console.log('message: ' + msg.msg);
    io.emit('chat message', msg);
  });

  // Quit
  socket.on('quit', (data) => {
    console.log('\n%s', data);
    socket.broadcast.emit('quit', data);
    socket.disconnect(true);
  });
});

server.listen(3005, function () {
  console.log('listening on *:3005');
});
