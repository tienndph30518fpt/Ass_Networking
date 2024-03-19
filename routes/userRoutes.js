const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Định nghĩa các route cho người dùng

// Route để đăng ký tài khoản người dùng mới
router.post('/register', userController.registerUser);

// Route để đăng nhập
router.post('/login', userController.loginUser);
router.get("/", userController.getAllUsers);
router.get('/login', (req, res) => {
    res.render('products/dangNhap'); // Thay đổi 'login' thành tên của template đăng nhập của bạn
});
router.get('/register', (req, res) => {
    res.render('products/dangKy'); // Thay đổi 'login' thành tên của template đăng nhập của bạn
});


module.exports = router;
