const express = require('express')
const router = new express.Router()
const controller = require('../../controls/punch')

router.post('/in/',controller.in)
router.post('/out/',controller.out)

module.exports = router;