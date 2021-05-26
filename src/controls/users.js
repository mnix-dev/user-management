const Model = require('./../models/users')
const catchAsync = require('../utils/catchAsync')

module.exports.renderRegister = (req, res) => {
    // res.render('users/register');
}

module.exports.renderLogin = (req, res) => {
    // res.render('users/login');
}

exports.create = catchAsync(async (req, res, next) => {
    const instance = await Model.create({
      username: req.body.username,
      pin: req.body.pin,
    });
    await instance.save()
    res.status(200).json({ status: 'Success!', message: `User with name of ${instance.username} was created successfully.`})
    next()
})

exports.readAll = catchAsync(async (req, res, next) => {
    const index = await Model.find({})
    res.status(200).json
    ({ status: 'Success!', message: index})
    next()
})

exports.read = catchAsync(async (req, res, next) => {
    const obj = await Model.findById(req.params.id);
    res.status(200).json
    ({ status: 'success', 
    results: obj })
    next()
})

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



module.exports.login = (req, res) => {

}

module.exports.logout = (req, res) => {

}