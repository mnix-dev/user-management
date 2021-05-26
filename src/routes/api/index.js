const express = require('express')
const router = new express.Router()
const users = require('./users')
const responses = require('./responses')

router.use('/users', users)
router.use('/responses', responses)

module.exports = router;