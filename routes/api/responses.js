const express = require('express')
const router = new express.Router()

router.get('/', (req, res) => console.log('return all responses'))
router.get('/:id', (req, res) => console.log(`show response with id ${req.params.id}`))

module.exports = router;