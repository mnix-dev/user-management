const express = require('express')
const router = new express.Router()
const users = require('./users')
const punch = require('./punch')

router.use('/users', users)
router.use('/punch', punch)

module.exports = router;