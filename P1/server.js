//-- Este archivo abre el archivo de solicitud y devuelve el contenido al cliente.
//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
var http = require('http');
var url=require('url');
//--modulo fs para lectura de ficheros
var fs= require('fs');

console.log("Arrancando servidor...")

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida");
  var q = url.parse(req.url, true);
  var filename= "" ;

  //-- Obtener fichero a devolver
  if (q.pathname == "/")
    filename += "index.html"
    else{
			filename= "." + q.pathname
		}

	tipo= filename.split(".")[1]
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
    if (tipo == "css"){
      mime = "text/css"
    }

    if (tipo == "json"){
      mime = "text/json"
    }


    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("corriendo puerto")
console.log("Puerto: " + PUERTO)
