const User = require('./../models/users')
const catchAsync = require('../utils/catchAsync')

exports.create = catchAsync(async (req, res, next) => {
    const user = await User.create({
      username: req.body.username,
      pin: req.body.pin,
    });
    await user.save()
    res.status(200).json({ status: 'Success!', message: `User with name of ${user.username} was created successfully.`})
    next()
})

exports.readAll = (req, res, next) => {
    res.status(200).json
    ({ status: `Retrieve all data from users database`, 
    results: ['users from a database'.split(' ')] })
    next()
}

exports.read = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Fetch user with the id of /${req.params.id}` })
    next()
}

exports.update = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Edit the user with the id of ${req.params.id}` })
    next()
}

exports.delete = (req, res, next) => {
    res.status(200).json
    ({ status: 'success', 
    results: `Delete a new user with the id of ${req.params.id}` })
    next()
}

