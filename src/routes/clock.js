const express = require('express');
const router = express.Router();
const controller = require('../controllers/clock')
const notes = require('../controllers/note')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(controller.index,notes.read))
router.post('/delete/:id', isLoggedIn, controller.delete)
router.post('/in', isLoggedIn, catchAsync(controller.clockIn))
router.post('/out/:id', isLoggedIn, catchAsync(controller.clockOut))

router.get('/:id', isLoggedIn,controller.read)

module.exports = router;