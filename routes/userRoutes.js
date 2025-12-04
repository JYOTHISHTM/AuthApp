

const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const { protect, preventLogin } = require('../middleware/authMiddleware')

router.get('/login', preventLogin, (req, res) => {
    res.render('user/login')
})

router.get('/sign-up', preventLogin, (req, res) => {
    res.render('user/signUp')
})

router.get('/home', protect, (req, res) => {
    res.render('user/home')
})



router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

module.exports = router