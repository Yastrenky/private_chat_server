var io = require('../server.js');
var messageRegistry= [];

module.exports = {
  chatMessage: function (msg) {
    // console.log(msg);
    if(msg.message_type === "reset"){
      messageRegistry= [];
    }
    messageRegistry.push(msg)
   io.emit('chat message', messageRegistry);
  },
  messageRegistry: () => messageRegistry
}
