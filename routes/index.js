const express = require('express')
const router = new express.Router()
const api = require('./api')

router.use('/api', api)

module.exports = router