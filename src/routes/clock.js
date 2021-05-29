const express = require('express');
const router = express.Router();
const entry = require('../controllers/entry')
const notes = require('../controllers/note')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(entry.index,notes.read))

router.use('/in', isLoggedIn, catchAsync(entry.clockIn))
router.use('/out/:id', isLoggedIn, catchAsync(entry.clockOut))
router.route('/note/:id')
    .get(isLoggedIn, catchAsync(entry.index))
router.use('/:id',isLoggedIn,entry.read)

module.exports = router;