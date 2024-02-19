const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FrutasSchema = new Schema({
    _id: {
        type:Schema.ObjectId,
        auto:true
    },
    nombre:{
        type:String,
        required: true
    },
    precio:{
        type:Number,
        required:true
    },
    tipo:{
        type:String
    },
    foto:{
        type:String
    }
})

mongoose.model("Frutas",FrutasSchema);