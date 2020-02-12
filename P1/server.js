//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
var http = require('http');
var url=require('url');
//--modulo fs para lectura de ficheros
var fs= require('fs');
var filename="." + q.pathname;

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  var q = url.parse(req.url, true);

  //-- Obtener fichero a devolver
  if (q.pathname == "/"){
    filename += "index.html"
}
  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
    console.log("Recurso solicitado(URL): " + filename);
    console.log();

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    var mime = "text/html"

    //-- Es una imagen
    if (['png', 'jpg'].includes(tipo)) {
      console.log("IMAGEN!!!!!")
      mime = "image/" + tipo
    }

    //-- Es un css
    if (tipo == "css")
      mime = "text/css"

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
