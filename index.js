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

app.listen(port, ()=>{
    console.log("Servidor corriendo en http://localhost");
})