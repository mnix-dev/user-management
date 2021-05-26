const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => console.log('return all users'))
router.get('/:id', (req, res) => console.log(`show user with id ${req.params.id}`))

module.exports = router;