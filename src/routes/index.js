const express = require('express')
const router = new express.Router()
const api = require('./api')
const users = require('./../controls/users.js')

const renderLogin = (req, res, next) => res.send('success')

router.use('/', renderLogin)
router.use('/api', api)
router.use('/register', users.renderLogin)
router.use('/login', users.renderLogin)

module.exports = router