const mongoose = require('mongoose')
const { Schema } = mongoose

const bandsSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    origin:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:String,
        required:true,
        trim:true
    }

})

const Bands=new mongoose.model('Bands',bandsSchema)
module.exports=Bands