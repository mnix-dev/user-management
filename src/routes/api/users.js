const express = require('express')
const { route } = require('../../app')
const router = new express.Router()
const controller = require('../../controls/users')

router.get('/', controller.readAll)
router.get('/:id', controller.read)
router.post('/:id', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router;