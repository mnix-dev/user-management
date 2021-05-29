const express = require('express');
const router = express.Router();
const entry = require('../controllers/entry')
const notes = require('../controllers/note')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(entry.index,notes.read))
router.post('/delete/:id', isLoggedIn, entry.delete)
router.post('/in', isLoggedIn, catchAsync(entry.clockIn))
router.post('/out/:id', isLoggedIn, catchAsync(entry.clockOut))

router.get('/:id', isLoggedIn,entry.read)

module.exports = router;