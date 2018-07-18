const session = require('express').Router();
const usersAllow = require('../staticData').data();
let usersOnline = require('../staticData').usersOnline();
var passwordHash = require('password-hash');

 
// function getClientIp(req) {
//   var ipAddress;
//   // The request may be forwarded from local web server.
//   var forwardedIpsStr = req.header('x-forwarded-for');
//   if (forwardedIpsStr) {
//     // 'x-forwarded-for' header may return multiple IP addresses in
//     // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
//     // the first one
//     var forwardedIps = forwardedIpsStr.split(',');
//     ipAddress = forwardedIps[0];
//   }
//   if (!ipAddress) {
//     // If request was not forwarded
//     ipAddress = req.connection.remoteAddress;
//   }
//   return ipAddress;
// };


session.post('/',(req,res)=>{
  console.log("======================", req.clientIp === "::1"?"local port": req.clientIp.replace(/^.*:/, ''))
  let authoriced = false;
  let userType = "";
  let userName =  "";

  usersAllow.map((user) => {
    // console.log( passwordHash.verify(user.pass.toString(), req.body.pass))

    if (user.name === req.body.name && passwordHash.verify(user.pass, req.body.pass)) {
      userType = user.type;
      userName = user.name
      authoriced = true;
      if(usersOnline.indexOf(user.name) < 0){
        usersOnline.push(user.name)
      }
      // else{
      //   authoriced = false;
      // }
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
else{
  return res.send({
    success: false
  });
}


});

module.exports = session
