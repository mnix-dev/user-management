const express = require('express');
const router = express.Router();
const entry = require('../controllers/entry')

const { isLoggedIn } = require('../middleware');

router.use('/:id', isLoggedIn, entry.delete)

module.exports = router;