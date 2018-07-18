const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sessionRouter = require('./users/session');
const requestIp = require('request-ip');

let port ="4005";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
  // var allowedOrigins = ['http://10.1.10.243:3000','http://localhost:3000','http://directbravo.com', 'http://www.directbravo.com'];
  // var origin = req.headers.origin;
  //  if(allowedOrigins.indexOf(origin) > -1){
  //        res.setHeader('Access-Control-Allow-Origin', origin);
  //   }
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',"GET,POST");
  res.header('Access-Control-Allow-Headers','Content-Type');
  next();
})

app.use(requestIp.mw());

app.use('/user',sessionRouter);
io.on('connection', require('./socket-event/connection.js'));


http.listen(port, function(){
  console.log('listening on: ' + port);
});

module.exports = io;
