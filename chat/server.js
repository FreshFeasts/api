const port = 3000;
const io = require('socket.io')(port);
console.log('Server is listening on port: %d', port);
