
const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')
const { adminProtect } = require('../middleware/adminMiddleware')

router.get('/login', (req, res) => res.render('admin/login'));

router.post('/adminLogin', AdminController.adminLogin);

router.get('/dashboard', adminProtect, AdminController.getUsers);

router.post('/block/:id', adminProtect, AdminController.blockUser);
router.post('/unblock/:id', adminProtect, AdminController.unBlockUser);

router.post('/logout', adminProtect, AdminController.logout);


module.exports = router