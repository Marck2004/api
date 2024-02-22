const express = require("express");
const rutaPeliculas = require("./rutas/peliculas");
const app = express();
const mongoose = require("mongoose");
const config = require('./config');
var cors = require('cors');  //módulo para permitir CORS

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(cors());
app.use(express.json());

const mongoUri = `mongodb://${config.DB_SERVICE}:${config.DB_PORT}/${config.DB_DATABASE}?authSource=admin`;
let db = mongoose.connection;
console.log(mongoUri);
let connectWithRetry= function() {
  return mongoose.connect(mongoUri, {
    user: config.DB_USERNAME,
    pass: config.DB_PASSWORD,
  });
};

  connectWithRetry();  // se crea la conexión

  db.on('error', () => {   // si hay un fallo de la conexión se vuelve a intentar pasado un tiempo
      setTimeout(() => {
          console.log('Fallo en la conexión a la BBDD. Se reintenta.');
          connectWithRetry();
        }, config.DB_RETRY_TIME);
  });
  
  db.on('connected', () => { // si hay conexión

    app.use(rutaPeliculas);  //se cargan las rutas
    
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

app.listen(config.PORT, ()=>{
    console.log(`Todo OK. Servidor escuchando en ${config.PORT}!`);
})