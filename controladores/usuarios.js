require("../modelos/usuarios");

const mongoose = require("mongoose");
const usuarios = mongoose.model("Usuarios");

async function getUsuarios(req,res){
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;

    try {
        const usuarioAutenticado = await usuarios.findOne({ nombre: nombre, contrasenia: contrasenia });

        if (!usuarioAutenticado) {
            return res.status(401).json({ status: "Credenciales incorrectas" });
        }

        if (contrasenia == usuarioAutenticado.contrasenia && nombre == usuarioAutenticado.nombre) {
            return res.status(200).json({ status: "ok" });
        } else {
            return res.status(401).json({ status: "Credenciales incorrectas" });
        }
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

module.exports = { getUsuarios,addUsuario,removeUsuario };