require("../modelos/pelicula");

const mongoose = require("mongoose");
const peliculas = mongoose.model("Peliculas");

async function getPeliculas(req,res){
    try{
        const peliculasLeidas = await peliculas.find({});
        return res.status(200).send(peliculasLeidas && peliculasLeidas.length ? peliculasLeidas : []);
    }catch(error){
        return res.status(400).send({
            status:"failure"
        });
    }
}

async function addPeliculas(req,res){
    try{
        console.log(req.body);
        const pelicula = req.body;
        await new peliculas(pelicula).save();
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
async function eliminarPelicula(req, res) {
  try {
    const nombre = req.params.nombre;
    const peliculaEliminada = await Pelicula.findOneAndDelete({ nombre: nombre });
    if (!peliculaEliminada) {
      return res.status(404).json({ status: 'error' });
    }
    return res.json({ status: 'ok' });
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    return res.status(500).json({ status: 'error con servidor' });
  }
  
};

module.exports = { getPeliculas,addPeliculas,eliminarPelicula };