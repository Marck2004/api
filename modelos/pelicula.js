const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peliculasSchema = new Schema({
    _id: {
        type:Schema.ObjectId,
        auto:true
    },
    nombre:{
        type:String,
        required: true
    },
    autor:{
        type:String
    },
    anio: {
        type:Number,
        required: true
    },
    foto:{
        type:String
    },
    tipo:{
        type:String,
        required: true
    }
})

mongoose.model("Peliculas",peliculasSchema);