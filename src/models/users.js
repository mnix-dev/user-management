require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const schema = new mongoose.Schema({
    username: {
        type: String,


    },
    pin: {
        type: String,
        required: true,
        minlength: 4,
        trim: true


    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
}, { timestamps: true
})


schema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

schema.statics.findByCredentials = async (username, pin) => {
    const user = await User.findOne({ username })
    if (!user)
        throw new Error('Please provide user id and pin')
    const isMatch = await bcrypt.compare(pin, user.pin)
    if (!isMatch)
        throw new Error('Incorrect user id or pin number')
    return user

}

schema.pre('save', async function(next) {
    const user = this
    if (user.isModified('pin'))
        user.pin = await bcrypt.hash(user.pin, 8)

    next()
})

schema.pre('remove', async next => {
    const user = this
    console.log(user)
})

const User = mongoose.model('User', schema)

module.exports = User