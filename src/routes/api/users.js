const express = require('express')
const router = new express.Router()
const auth = require('./../../middleware/auth')
const controller = require('../../controls/users')

router.post('/', controller.create)

router.get('/', controller.readAll)
router.post('/login', controller.login)
router.get('/:id', controller.read)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)
router.delete('/', controller.destroy)


module.exports = router;