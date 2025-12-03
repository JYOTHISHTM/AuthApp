
const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')
const { adminProtect } = require('../middleware/adminMiddleware')

// login page
router.get('/login', (req, res) => res.render('admin/login'));

// login POST
router.post('/adminLogin', AdminController.adminLogin);

// dashboard
router.get('/dashboard', adminProtect, AdminController.getUsers);

// block/unblock
router.post('/block/:id', adminProtect, AdminController.blockUser);
router.post('/unblock/:id', adminProtect, AdminController.unBlockUser);

// logout
router.post('/logout', adminProtect, AdminController.logout);


module.exports = router