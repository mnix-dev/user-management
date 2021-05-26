require('dotenv').config()
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,


    },
    pin: {
        type: Number,



    },
    
})


const User = mongoose.model('User', schema)

module.exports = User