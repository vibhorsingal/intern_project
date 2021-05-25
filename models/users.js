const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    organization: {
        type: String,
        required: true,
        trim: true
    },
    date_of_birth: {
        type: Date,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        default:0000
    }

},{
    timestamps:true
})

const Users = new mongoose.model('Users', userSchema)
module.exports=Users