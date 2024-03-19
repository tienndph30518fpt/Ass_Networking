const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploader = multer({
  storage: storage,
  fileFilter: fileFilter,
  dest: "uploads/",
}).fields([
  { name: "content_img", maxCount: 1 },
  { name: "images", maxCount: 1 },
]);

// Route để tạo mới truyện
router.post("/", uploader, comicController.createComic);

// Route để lấy danh sách truyện
router.get("/", comicController.getComics);
router.get("/delete/:id", comicController.getDelete);
// Route để hiển thị form sửa thông tin truyện
router.get("/edit/:id", comicController.getFormEdit);

// Route để cập nhật thông tin truyện sau khi sửa
router.post("/edit/:id", uploader, comicController.updateComic);

router.get("/add", comicController.getFormAdd);

router.get("/chitiet/:id", comicController.getDetailComic);

module.exports = router;
