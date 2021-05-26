const express = require('express')
const router = new express.Router()
const controller = require('../../controls/users')

router.post('/', controller.create)

router.get('/', controller.readAll)
router.get('/:id', controller.read)
// router.post('/:args', controller.create)
// router.patch('/:id', controller.update)
// router.delete('/:id', controller.delete)

module.exports = router;