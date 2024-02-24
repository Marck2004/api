const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    _id: {
        type:Schema.ObjectId,
        auto:true
    },
    nombre:{
        type:String,
        required: true
    },
    contrasenia:{
        type:String,
        required: true
    },
    email:{
        type:String
    },
    telefono:{
        type:Number
    },
    estado:{
        type:String
    }
})

mongoose.model("Usuarios",usuariosSchema);