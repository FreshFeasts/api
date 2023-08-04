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

  // Join
  socket.on('join', (data) => {
    console.log('[INFO]: %s has joined the chat', data.sender);
  });
  // Chat Message
  socket.on('chat message', function (msg) {
    console.log('Sender', msg.sender);
    console.log('Recepient', msg.recipient);
    console.log('message: ' + msg.msg);
    io.emit('chat message', msg);
  });

  // Quit
  socket.on('quit', () => {
    console.log('User quit the chat:', socket.id);
    socket.disconnect();
  });
});

server.listen(3005, function () {
  console.log('listening on *:3005');
});
