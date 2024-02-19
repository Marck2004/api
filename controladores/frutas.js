require("../modelos/fruta");

const mongoose = require("mongoose");
const frutas = mongoose.model("Frutas");

async function getFrutas(req,res){
    try{
        const frutasLeidas = await frutas.find({});
        return res.status(200).send(frutasLeidas && frutasLeidas.length ? frutasLeidas : []);
    }catch(error){
        return res.status(400).send({
            status:"failure"
        });
    }
}

async function addFruta(req,res){
    try{
        const fruta = req.body;
        await new frutas(fruta).save();
        return res.status(200).send({
            status:"ok"
        });
    }catch(error){
        return res.status(400).send({
            status:"failure"
        });
    }
}

module.exports = { getFrutas };