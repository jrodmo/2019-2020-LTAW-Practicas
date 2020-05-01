var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT = 8080
var users = 0;
var nicks = [];

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log("Recurso solicitado: /")
});

//-- Servir el CSS:
app.get('/style.css', function(req,res) {
  res.sendFile(__dirname + '/estilo.css');
})

//-- Servir el cliente javascript:
app.get('/client.js', function(req,res) {
  res.sendFile(__dirname + '/client.js');
  console.log("Recurso solicitado: /client.js")
})

//-- Lanzar el servidor:
http.listen(PORT, function(){
  console.log('server on port: ' + PORT + "...\n")
});

//-- Nueva conexión recibida: nuevo cliente!
io.on('connection', function(socket){
  console.log('Nuevo usuario conectado');
  users++;
  user_nick = "User_" + users;

  socket.on('new_nick', user_nick => {
    nicks += user_nick + ',' + '\n';

    //-- Mensaje de bienvenida:
    socket.emit('new_message', 'Bienvenido al chat ' + user_nick + '<br>');

    //-- Emitir un mensaje a todos los clientes:
    io.emit('new_message', 'Nuevo usuario conectado: ' + user_nick + '<br>');


  console.log("ID del usuario: " + user_nick)
  console.log("Número de usuarios en el chat: " + users);
  });

  socket.on('disconnect', function(){
    console.log('USUARIO CONECTADO');
    io.emit('new_message', user_nick + 'ha salido del chat');
    users -= 1;
    console.log("Número de usuarios en el chat: " + users);
  });

  socket.on('new_message', msg => {

    //-- Emitir un mensaje a todos los clientes:
      io.emit('new_message', msg + '<br>');
      console.log("Mensaje recibido: " + msg)

      msg = msg.split(" ")[1]

      switch(msg) {
        case "/help":
          msg = '/help' + '/list' + '/hello' + '/date'+ '<br>';
          socket.emit('new_message', msg)
          console.log("Respuesta a /help")
        break;
        case "/list":
          msg = 'Usuarios conectados ' + users + nicks + '<br>';
          socket.emit('new_message', msg)
          console.log("Respuesta a /list")
        break;
        case "/hello":
          msg = 'Buenas '+ nicks + '<br>';
          socket.emit('new_message', msg)
          console.log("Respuesta a /hello")
        break;
        case "/date":
          var date = new Date()
          msg = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
          socket.emit('new_message', 'Estamos a ' + msg + '<br>');
          console.log("Respuesta a /date")
        break;

        default:
          break;
      }
  });
  socket.on('new_user', client_login => {
     var server_msg = "";
     var client_msg = "El usuario "+ user_nick + " ha cambiado su nick a: ";
     user_nick = client_login;
     client_msg += user_nick;
     io.emit('new_message', client_msg +'<br>');
     console.log("El usuario ha cambiado su nombre a: " + user_nick)
 })
});
