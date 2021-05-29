const express = require('express')
const router = express.Router({ mergeParams: true })
const { isLoggedIn } = require('../middleware')
const controller = require('../controllers/note')
const catchAsync = require('../utils/catchAsync')

router.use(isLoggedIn)
router.use('/:noteId/delete/:id', catchAsync(controller.delete))
router.use('/:noteId/edit/:id', catchAsync(controller.edit))
router.use('/:noteId/archive/:id', catchAsync(controller.archive))
router.use('/:noteId/flag/:id', catchAsync(controller.flag))
router.use('/:noteId/complete/:id', catchAsync(controller.finish))
router.use('/:noteId/delete/', catchAsync(controller.deleteOne))
router.use('/:noteId/edit/', catchAsync(controller.editOne))
router.post('/:entryId', catchAsync(controller.create))

module.exports = router;