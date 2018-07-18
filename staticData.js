let usersOnline = [];
let data = [{
  name: "Yastrenky",
  type: "Administrator",
  pass: "zxcvbnm99"
},
{
  name: "Ivelin",
  type: "Usuario",
  pass: "qazwsxedc"
}
];


module.exports = {
  usersOnline: () => usersOnline,
  // insertUser: (user)=>usersOnline.push(user),
  data: () => data,
 }