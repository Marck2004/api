require("../modelos/usuarios");

const mongoose = require("mongoose");
const usuarios = mongoose.model("Usuarios");
const jwt = require("jwt-simple");
const createToken = require("../servicios");

async function getUsuarios(req,res){
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;

    try {
        const usuarioAutenticado = await usuarios.findOne({ nombre: nombre, contrasenia: contrasenia });

        if (contrasenia == usuarioAutenticado.contrasenia && nombre == usuarioAutenticado.nombre) {
            const token = createToken(usuarioAutenticado);

            return res.status(200).json({ usuario:usuarioAutenticado,token:token,status: "ok" });
        }
    } catch (error) {
        return res.status(400).send({ status: "failure" });
    }
}
async function devolverUsuarios(req,res){
    try{
        const usuariosLeidos = await usuarios.find({});
        return res.status(200).send(usuariosLeidos && usuariosLeidos.length ? usuariosLeidos : []);
    }catch(error){
        return res.status(400).send({
            status:"failure"
        });
    }
}
async function modifUsuario(req,res){
    const id = req.body._id;

    try {
        const usuarioAutenticado = await usuarios.updateOne({_id:id},req.body);

            return res.status(200).json({ usuario:usuarioAutenticado,status: "ok" });

    } catch (error) {
        return res.status(400).send({ status: "failure" });
    }
}
async function addUsuario(req,res){
    try{
        console.log(req.body);
        const usuario = req.body;
        await new usuarios(usuario).save();
        return res.status(200).send({
            status:"ok"
        });
    }catch(error){
        console.log(req.body);
        return res.status(400).send({
            status:"failure"
        });
    }
}
async function removeUsuario(req, res) {
  try {
    const nombre = req.params.nombre;
    const usuarioEliminado = await Pelicula.findOneAndDelete({ nombre: nombre });
    if (!usuarioEliminado) {
      return res.status(404).json({ status: 'error' });
    }
    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    return res.status(500).json({ status: 'error con servidor' });
  }
  
};

module.exports = { getUsuarios,addUsuario,removeUsuario,devolverUsuarios,modifUsuario };