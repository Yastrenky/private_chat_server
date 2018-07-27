var sockets = {}

module.exports = function (socket) {
  sockets[socket.id] = socket;

  console.log('Number of users online', Object.keys(sockets).length);

  socket.on('disconnect', function () {
    delete sockets[socket.id]
    require('../server.js').sockets.emit('broadcast', Object.keys(sockets).length);
    console.log('Number of users online', Object.keys(sockets).length);
  });


 console.log('users online', require('../staticData').usersOnline());

  socket.on('chat message', require('./messages.js').chatMessage);
  socket.emit('chat message', require('./messages.js').messageRegistry());
  
  require('../server.js').sockets.emit('broadcast', Object.keys(sockets).length);


     }



