const mongoose = require("mongoose");
const usuarios = require("../modelos/usuarios");
const service = require("./servicios/index");

function signUp(req,res){
    const usuario = new usuarios({
        email: req.body.email,
        nombre: req.body.name,
        contrasenia: req.body.contrasenia,
        telefono: req.body.telefono,
        estado:req.body.estado
    })
    usuario.save((err)=>{
        if(err) res.status(500).send({message: "Error al crear el usuario "+err});
        return res.status(200).send({token:service.createToken(usuario)});
    })
}

function signIn(req, res){

}
module.exports = { signIn, signUp }