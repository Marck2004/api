const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json());
app.get("/todos",(req,res)=>{
    console.log(req.body);
    return res.send("Enviado");
})
app.get("/",(req,res)=>{
    console.log(req.body);
    return res.send("Ruta barra");
})
app.post("/todos",(req,res)=>{
    console.log(req.body);
})

const port = 7777;

app.listen(port, ()=>{
    console.log("Servidor corriendo en http://localhost");
})