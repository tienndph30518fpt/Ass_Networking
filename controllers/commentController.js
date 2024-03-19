const Comment = require('../models/commentModel');

// Tạo mới bình luận
exports.createComment = async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Lấy danh sách bình luận theo id truyện
exports.getCommentsByComicId = async (req, res) => {
    try {
        const comments = await Comment.find({ comicId: req.params.id });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
