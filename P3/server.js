var http = require('http');
var url = require('url');
var fs = require('fs');

const PORT = 8080

console.log("Arrancando servidor en puerto " + PORT + "...\n")

// Configurar y lanzar el servidor
http.createServer((req, res) => {

  if(req.url.indexOf("favicon.ico") > 0){return;} //para que no nos influya la petición del favicon
  // Parsear la URL
  var q = url.parse(req.url, true)
  //console.log("Recurso solicitado (URL): " + req.url)
  //console.log("URL parseada: ")
  //console.log("   Host: " + q.host)
  //console.log("   Path Name:" + q.pathname)

  // Leer las cookies
  var cookie = req.headers.cookie;
  //console.log("Cookie: " + cookie)

  // Obtener la ruta del fichero
  var filepath = q.pathname
  console.log("FILEPATH ------>" ,filepath);

  // Petición de compra
  if (filepath.includes("carrit")) {

    var content = ""
    var emptycarrit = true;

    if (!cookie) {
      mensaje = "<p>Accede a LOGIN para registrarte.</p>";
      content = crearHtml(mensaje, 5);
      res.statusCode = 404;
    } else {
      if (cookie.includes("carrit")){
        emptycarrit = false;
      }
      console.log(cookie);
      switch (filepath) {

        case "/carrit_barritaenergetica":

            cookie = crearCookie(cookie, emptycarrit, 'Barrita energetica');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Barrita energeticaI</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_barritaenergetica");
            break;

        case "/carrit_barritaoreo":

            cookie = crearCookie(cookie, emptycarrit, 'Barrita oreo');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Barrita oreo</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_barritaoreo");
            break;

        case "/carrit_barritaproteica":

            cookie = crearCookie(cookie, emptycarrit, 'Barrita proteica');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Barrita proteica</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_barritaproteica");
            break;
        case "/carrit_cafeina":

            cookie = crearCookie(cookie, emptycarrit, 'Cafeina');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Cafeina</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_cafeina");
            break;
        case "/carrit_caseina":

            cookie = crearCookie(cookie, emptycarrit, 'Caseina');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Caseina</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_caseina");
            break;
        case "/carrit_proteina":

            cookie = crearCookie(cookie, emptycarrit, 'Proteina');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Proteina</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_proteina");
            break;
            
            
        case "/carrit_glutamina":

            cookie = crearCookie(cookie, emptycarrit, 'Glutamina');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Glutamina</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_glutamina");
            break;
        case "/carrit_creatina":

            cookie = crearCookie(cookie, emptycarrit, 'Creatina');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Creatina</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_creatina");
            break;
        case "/carrit_bcaa":

            cookie = crearCookie(cookie, emptycarrit, 'Bcaa');
            res.setHeader('Set-Cookie', cookie)
            res.statusCode = 200;
            mensaje = "<li><h6>Bcaa</h6></li>";
            content = crearHtml(mensaje, 4);
            console.log("GET 200 OK resource: " + "carrit_bcaa");
            break;

        case "/carrit.html":
          if (emptycarrit) {
            content = "Aun no se han agregado productos.";
            res.statusCode = 404;
          } else {
              carrito = "<li><h6>"
                carrito += cookie.split("carrit=")[1]
                //console.log("CARRITO-->", carrito);
                while (carrito.includes("&") || carrito.includes("_") || carrito.includes("%")){
                  carrito = carrito.replace("&","</h6></li><li><h6><br>");
                  carrito = carrito.replace("_"," ");
                  carrito = carrito.replace("%","€");
                }
                content = crearHtml(carrito, 1);
                res.statusCode = 200;
                console.log("GET 200 OK resource: " + "./carrit.html");
          }
        break;

        case "/carrit_form":
          if (req.method === 'POST') {

            req.on('data', chunk => {
              data = "<li><h6>"
              data += chunk.toString();
              console.log("DATOS ----->", data);

              while (data.includes("&") || data.includes("_") || data.includes("=") || data.includes("+") ||
                     data.includes("%40")) {
                data = data.replace("&", "</h6></li><li><h6><br>");
                data = data.replace("_", " ");
                data = data.replace("=", ": ");
                data = data.replace("+", " ");
                data = data.replace("%40", "@");
              }
              content = crearHtml(data, 2);
              res.statusCode = 200;
            });

            req.on('end', ()=> {
              console.log("GET 200 OK resource: " + filepath);
              res.setHeader('Content-Type', 'text/html')
              res.write(content);
              res.end();
            })
            return
          }
          break;

        // Procesar formulario
        case "/carrit_search_form":
          if (req.method === 'POST') {

            req.on('data', chunk => {

              data = chunk.toString();
              data = data.split("=")[1];
              console.log("DATOS BUSCAR ---->", data);
              data += buscarProductos(data);
              console.log("DATAAAA ENCONTRADO------>", data);
              content = crearHtml(data, 3);
              console.log("Datos recibidos: " + data);
              res.statusCode = 200;
            });

            req.on('end', ()=> {
              console.log("POST 200 OK resource: " + filepath);
              res.setHeader('Content-Type', 'text/html');
              res.write(content);
              res.end();
            })
            return
          }
          break;
        default:
          content = "404 Not Found";
          res.statusCode = 404;
      }
    }
    res.setHeader('Content-Type', 'text/html')
    res.write(content);
    res.end();

  } else if (filepath == "/myquery") {
    res.statusCode = 200;
      content = `
      {
        "productos": ["CREATINA", "CASEINA", "PROTEINA", "CAFEINA", "GLUTAMINA", "BCAA", "BARRITA OREO", "BARRITA PROTEICA", "BARRITA ENERGETICA"]
      }
      `
      res.setHeader('Content-Type', 'application/json')
      res.write(content);
      res.end();

  } else if (filepath == "/client.js") {
    filetype = filepath.split(".")[1]
    filepath = "./" + filepath
    fs.readFile(filepath, function(err, data) {
      res.writeHead(200, {'Content-Type': "application/javascript"});
      res.write(data);
      res.end();
    });

  } else {
    switch (filepath) {
      case "/":
        filepath = "/index.html"
        break;
      // Login
      case "/login.html":
        cookie = 'user=Usuario'
        res.setHeader('Set-Cookie', cookie)
        break;
    }

    filetype = filepath.split(".")[1]
    filepath = "./" + filepath
    fs.readFile(filepath, function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      } else {
        console.log("GET 200 OK resource: " + filepath);
        res.writeHead(200, {'Content-Type': "text/html"});
        res.write(data);
        res.end();
      }
    });
  }

}).listen(PORT);

function crearCookie(cookie, emptycarrit, cadena) {

  if (!emptycarrit) {
    cookie = cookie.split("Usuario;")[1]
    cookie += "&"
  } else {
    cookie = "carrit="
  }
  cookie += cadena
  return cookie;
}


function crearHtml(datos, opcion){
  var html = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <style type="text/css">
        .header{
          background: #FF0000;
          color: white;
          text-align: center;
          font-size: 60px;
          font-family: arial;
          padding: 10px;
        }
        body {
          background-image: url('musculo.jpg');
          background-repeat: repeat;
          background-size: contain;
        }
        .menu{
          background: red;
          font-family: courier;
          overflow: hidden;
          padding: 10px;
        }

        .menu a{
          color: black;
          padding: 10px;
        }

        .menu a:hover{
          background: #F7FE2E
        }

        .cuerpo{
          background: white;
          padding: 20px;
          color: black;
          font-family: arial;
        }

        .j{
          font-family: arial;
          text-align: center;
          color: white;
          padding: 30px;
          font-size: 40px;
          background: #FF0000;
        }

        j6{
          text-align: left;
          margin-left: 0px;
          font-family: arial;
          font-size: 10px;
        }

        .pie{
          background: #FF0000;
          color: white;
          text-align: center;
          font-size: 10px;
          font-family: arial;
          padding: 20px;
        }
        #login{
          color:white;
        }
        h6{
          text-align: left;
          margin-left: 0px;
          font-family: arial;
          font-size: 10px;
          color:white;
        }
        h1{
          color:black;
        }
        h4{
          text-align: left;
          margin-left: 10px;
          font-family: arial;
          font-size: 10px;
          color:white;
        }
        .button {
          background-color: green; /* Green */
          border: none;
          color: white;
          padding: 4px 14px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          margin: 4px 2px;
          cursor: pointer;
        }
      </style>
      </head>
      <body>`
      if (opcion == 1){ //CARRITO
            html +=`
                    <div class="header">
                      <p>P R O T I S</p>
                    </div>
                      <div class= "menu">
                      <a href= "ropa.html">ROPA</a>
                      <a href= "suplementacion.html">SUPLEMENTACION</a>
                      <a href= "tecnologia.html">TECNOLOGIA</a>
                      <a href= "alimentacion.html">ALIMENTACION</a>
                      <a href="login.html"> REGISTRARSE</a>
                      <a href="carrit.html">CARRITO</a>
                      <form action="/carrit_search_form" method="post">
                            <input type="text" size="40" name="Busqueda"/>
                            <button type="submit" class="button">Buscar</button>
                          </form>
                      <br> </br>
                    </div>
                          <div class="menu">
                          <h1>Carrito de la compra</h1>
                          <ul>

                      `
             html += datos;
             html +=
                      `
                          </ul>
                          <br>
                          <br>
                          <p>Rellena tus datos para realizar la compra:</p>
                          <form action="/carrit_form" method="post">
                            <table>
                              <tr>
                              <p><td>Nombre:</td><td><input type="text" size="40" name="Nombre"/> <br /></td></p>
                              </tr>
                              <tr>
                              <p><td>Apellidos:</td><td><input type="text" size="40" name="Apellidos"/> <br /></td></p>
                              </tr>
                            </table>
                            <button type="submit" class="button">Enviar</button>
                          </form>
                          </div>
                          <div class="pie">
                            JORGE RODMO S.L.
                          </div>
                        </body>
                      </html>
                      `
          }
          else if (opcion == 2) {
            html += `
            <div class="header">
              <p>P R O T I S</p>
            </div>
              <div class= "menu">
              <a href= "ropa.html">ROPA</a>
              <a href= "suplementacion.html">SUPLEMENTACION</a>
              <a href= "tecnologia.html">TECNOLOGIA</a>
              <a href= "alimentacion.html">ALIMENTACION</a>
              <a href="login.html"> REGISTRARSE</a>
              <a href="carrit.html">CARRITO</a>
              <form action="/carrit_search_form" method="post">
                    <input type="text" size="40" name="Busqueda"/>
                    <button type="submit" class="button">Buscar</button>
                  </form>
              <br> </br>
            </div>
                  <div class="menu">
                <h1>Detalles de la compra</h1>
                <p>La compra se ha realizado con éxito</p>
                <div>
                <ul>`
                    html += datos;
                    html += `
                      </ul>
                      </div>
                      <a href="/">Volver</a>
                      </div>
                      <div class="pie">
                        JORGE RODMO S.L.
                      </div>
                    </body>
                  </html>`

          }
          else if (opcion == 3) {
            html += `
            <div class="header">
              <p>P R O T I S</p>
            </div>
              <div class= "menu">
              <a href= "ropa.html">ROPA</a>
              <a href= "suplementacion.html">SUPLEMENTACION</a>
              <a href= "tecnologia.html">TECNOLOGIA</a>
              <a href= "alimentacion.html">ALIMENTACION</a>
              <a href="login.html"> REGISTRARSE</a>
              <a href="carrit.html">CARRITO</a>
              <form action="/carrit_search_form" method="post">
                    <input type="text" size="40" name="Busqueda"/>
                    <button type="submit" class="button">Buscar</button>
                  </form>
              <br> </br>
            </div>
                  <div class="menu">
                  <p>Producto a buscar: `
            html += datos;
            html += `
                  </p>
                  <a href="/">Volver a la página principal</a>
                  </div>
                  <div class="pie">
                    JORGE RODMO S.L.
                  </div>
                </body>
              </html>
              `

          }
          else if (opcion == 4) {
            html += `
            <div class="header">
              <p>P R O T I S</p>
            </div>
              <div class= "menu">
              <a href= "ropa.html">ROPA</a>
              <a href= "suplementacion.html">SUPLEMENTACION</a>
              <a href= "tecnologia.html">TECNOLOGIA</a>
              <a href= "alimentacion.html">ALIMENTACION</a>
              <a href="login.html"> REGISTRARSE</a>
              <a href="carrit.html">CARRITO</a>
              <form action="/carrit_search_form" method="post">
                    <input type="text" size="40" name="Busqueda"/>
                    <button type="submit" class="button">Buscar</button>
                  </form>
              <br> </br>
            </div>
                  <div class="menu">
                <p>Producto añadido al carrito:</p>
                <div>
                <ul>`
                  html += datos;
                    html += `
                      </ul>
                      </div>
                      <a href="/">Volver</a>
                      <div class="pie">
                        JORGE RODMO S.L.
                      </div>
                    </body>
                  </html>`
          }
          else if (opcion == 5) {
            html += `
            <div class="header">
              <p>P R O T I S</p>
            </div>
              <div class= "menu">
              <a href= "ropa.html">ROPA</a>
              <a href= "suplementacion.html">SUPLEMENTACION</a>
              <a href= "tecnologia.html">TECNOLOGIA</a>
              <a href= "alimentacion.html">ALIMENTACION</a>
              <a href="login.html"> REGISTRARSE</a>
              <a href="carrit.html">CARRITO</a>
              <form action="/carrit_search_form" method="post">
                    <input type="text" size="40" name="Busqueda"/>
                    <button type="submit" class="button">Buscar</button>
                  </form>
              <br> </br>
            </div>
                  <div class="menu">
                <p>ERROR</p>
                <div>`
                   html += datos;
                    html += `
                      </div>
                      <a href="/">Volver</a>
                      <div class="pie">
                        JORGE RODMO S.L.
                      </div>
                    </body>
                  </html>`
          }
      return html;
}


function buscarProductos(data)
{
  var html = "<br>Productos: <br><ul>";
  productos = `
  {
    "productos": ["ALIMENTACION", "TECNOLOGIA", "ROPA", "SUPLEMENTACION"]
  }
  `
  var encontrado = false;
  var o = JSON.parse(productos);
      for (i=0; i < o.productos.length; i++) {
        if (o.productos[i].toString().includes(data)) {
          html += "<li>" + o.productos[i];
          encontrado = true;
        }
        if (i = o.productos.length){
          html += "</ul>"
        }
      }
      if (!encontrado) {
        html += '</ul>No existen resultados para esa búsqueda.';
      }
  return html;
}
