const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Định nghĩa các route cho bình luận

// Route để tạo mới bình luận
router.post('/', commentController.createComment);

// Route để lấy danh sách bình luận theo id truyện
router.get('/comic/:id', commentController.getCommentsByComicId);

module.exports = router;
