const catchAsync = require('../utils/catchAsync')
const Model = require('./../models/users')
const auth = require('./../middleware/auth')

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

exports.update = catchAsync(async (req, res, next) => {
    const obj = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    })
    if (!obj) 
        return next(new Error('404 error'))

    res.status(200).json({ status: 'success', data: obj })
})

exports.delete = catchAsync(async (req, res, next) => {
    const obj = await Model.findByIdAndDelete(req.params.id)
    if (!obj)
        return next(new Error('Error 404 no document found'))
    res.status(200).json
    ({ status: `successfully removed one user with username of ${obj.username}` })
    next()
})

exports.destroy = catchAsync(async (req, res, next) => {
    const obj = await Model.deleteMany({})
    if (!obj)
        return next(new Error('No documents found!'))
    res.status(200).json({ status: 'successfully deleted all users.'})
})



module.exports.login = catchAsync(async (req, res) => {
    const { username, pin } = req.body
    const user = await Model.findByCredentials(username, pin)
    const token = user.generateAuthToken()
    res.send({ user, token })
    
})

module.exports.logout = catchAsync( async (req, res, next) => {
    console.log(req.user)

    next()
})