const session = require('express').Router();
const usersAllow = require('../staticData').data();
let usersOnline = require('../staticData').usersOnline();
var passwordHash = require('password-hash');

session.post('/', (req, res) => {
  console.log("======================", req.clientIp === "::1" ? "local port" : req.clientIp.replace(/^.*:/, ''))
  let authoriced = false;
  let userType = "";
  let userName = "";

  usersAllow.map((user) => {
    if (user.name === req.body.name && passwordHash.verify(user.pass, req.body.pass)) {
      userType = user.type;
      userName = user.name
      authoriced = true;
      if (usersOnline.indexOf(user.name) < 0) {
        usersOnline.push(user.name)
      }
    }
  })

  if (authoriced) {
    console.log('access granted');
    return res.send({
      success: true,
      type: userType,
      name: userName,
    });
  }
  else {
    return res.send({
      success: false
    });
  }


});

module.exports = session
