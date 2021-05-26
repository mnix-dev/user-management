require('dotenv').config()
const catchAsync = require('./../utils/catchAsync')
const jwt = require('jsonwebtoken')
const User = require('./../models/users')

const auth = catchAsync(async (req, res, next) => {
    if (!user) 
            next(new Error('user not found'))

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        req.token = token
        req.user = user
        next()
})

module.exports = auth