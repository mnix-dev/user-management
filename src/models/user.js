const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', schema);