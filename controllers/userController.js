
const User = require('../models/userModel');
const bcrypt = require('bcrypt');


// Đăng ký tài khoản người dùng mới
exports.registerUser = async (req, res) => {
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const itemNew = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            fullname: req.body.fullname
        });

        // Lưu tài khoản mới vào cơ sở dữ liệu
        await itemNew.save().then(() => {
            res.status(201).json
            res.redirect('/api/users/login');
        }).catch((err) => {
            console.log(err.message);
        })
        
       
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Đăng nhập
exports.loginUser = async (req, res) => {
    try {
        // Tìm người dùng bằng username
        const user = await User.findOne({ username: req.body.username });
        console.log("ten", user);
        if (!user) {
            return res.render('products/dangNhap', { message: 'User not found' }); // Render lại trang đăng nhập với thông báo lỗi
        }
        
        // Kiểm tra mật khẩu
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        console.log("check mk", isValidPassword);
        if (!isValidPassword) {
            return res.render('products/dangNhap', { message: 'Invalid password' }); // Render lại trang đăng nhập với thông báo lỗi
        }

       res.redirect("/api/comics")
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('products/user', { users: users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


