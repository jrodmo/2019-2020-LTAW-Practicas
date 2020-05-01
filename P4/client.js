function main() {
  console.log("Ejecutado client.js")

  var user_nick = prompt('Please, enter your name: ');

  var socket = io();

  var send = document.getElementById('send')
  var user = document.getElementById('user')
  var display = document.getElementById('display')
  var msg = document.getElementById("msg")
  var login = document.getElementById("login")
  var acept = document.getElementById('acept')

  msg.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click()
    }
  });

  login.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("login").click()
    }
  });

  send.onclick = () => {
    socket.emit('new_message', msg.value);
    msg.value = "";
    console.log("Mensaje emitido: " + msg.value)
  }

  socket.emit('new_nick', user_nick);
    send.onclick = () => {
      socket.emit('new_message', user_nick + ": " + msg.value);
      msg.value = "";
    }

  socket.on('new_message', msg => {
    display.innerHTML = display.innerHTML + msg;
    console.log("Mensaje recibido: " + msg)
  });

  acept.onclick = () => {
    socket.emit('new_user', login.value);
    document.getElementById('login').value = ""
    console.log("Usuario nuevo: " + login.value)
  }


}
