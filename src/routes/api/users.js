const express = require('express')
const router = new express.Router()
const passport = require('passport')
const controller = require('../../controls/users')

router.post('/', controller.create)

router.get('/all', controller.readAll)
router.delete('/all', controller.destroy)
router.post('/register', controller.register)

router.route('/login')
    .post(passport.authenticate('local', { failureFlash: false, failureRedirect: '/login'}), controller.login)

// router.post('/login/', passport.authenticate('local', {failureRedicect: '/'} ), controller.login)
router.post('/logout/', controller.logout)
router.get('/u/:id/', controller.read)
router.patch('/u/:id', controller.update)
router.delete('/u/:id', controller.delete)

module.exports = router;