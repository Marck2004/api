const express = require("express");
const rutasFrutas = require("./rutas/frutas");
const app = express();
const mongoose = require("mongoose");

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json());
app.use(rutasFrutas);
const port = 7777;

const mongoUri = "mongodb://mongodb:6666/2daw";
let db = mongoose.connection;

let connectWithRetry= function() {
    return mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      auth: { authSource: "admin" },
      user: "root",
      pass: "example",
    });
  };  

  connectWithRetry();  // se crea la conexión

  db.on('error', () => {   // si hay un fallo de la conexión se vuelve a intentar pasado un tiempo
      setTimeout(() => {
          console.log('Fallo en la conexión a la BBD. Se reintenta.');
          connectWithRetry();
        }, config.DB_RETRY_TIME);
  });
  
  db.on('connected', () => { // si hay conexión

    app.use(routerHeroes);  //se cargan las rutas
    
    // Si se pide una ruta invalida se devuelve un 404
    app.use(function(req, res, next) {
       res.status(404).send('Página no encontrada');
    });
});
    // En caso de cualquier otro problema se devuelve un 500 - error en el servidor
    app.use(function(err, req, res, next) {
      console.error(err.stack);
      res.status(500).send('Upss, algo no funciona');  
    })

app.listen(port, ()=>{
    console.log("Servidor corriendo en http://localhost");
})