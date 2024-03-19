const Comic = require('../models/comicModel');
const fs = require("fs");
const { forEach } = require('lodash');
const path = require("path");
const Comment = require('../models/commentModel')




// Tạo mới truyện
exports.createComic = async (req, res) => {

    try {

        let url_image = "";
        let url_pdf = "";
        if (req.files["images"]) {
            const imageFile = req.files["images"][0];
            fs.renameSync(
                imageFile.path,
                "./public/uploads/" + imageFile.originalname
            );
            url_image = "/uploads/" + imageFile.originalname;
        }
    
        if (req.files["content_img"]) {
            const pdfFile = req.files["content_img"][0];
            fs.renameSync(pdfFile.path, "./public/uploads/" + pdfFile.originalname);
            url_pdf = "/uploads/" + pdfFile.originalname;
            // Xử lý PDF nếu cần
        }


        const itemNew = new Comic({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            publishYear: req.body.publishYear,
            images: url_image,
            content_img: url_pdf,
        });

        itemNew.save().then(() => {
            res.redirect("/api/comics/");
            // res.json(itemNew);
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



// Lấy danh sách truyện
exports.getComics = async (req, res) => {
    try {
        Comic.find()
            .then((items) => {
                forEach(items, item => {
                 //   console.log(item.content_img)
                })
                
                res.render("products/comic", { items });
            })
            .catch((err) => {
                console.log("Lấy dữ liệu thất bại", err);
                res.status(500).send("Lấy dữ liệu thất bại");
            });
    } catch (err) {
        console.log("Lỗi khi xử lý yêu cầu", err);
        res.status(500).send("Lỗi khi xử lý yêu cầu");
    }
};


// exports.getFormAdd = (rep, res) => {
//     Comic.find().then(() => {
       
//         res.render("products/addComic");
//     }).catch((err) => {
//         console.log("Lấy Dự Liệu Thất Bại", err);
//     })
// }



exports.getFormAdd = (req, res) => {
    console.log("voa day")
    res.render("products/addComic");
}

exports.getFormEdit = async (req, res) => {
    try {
        const comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }
        res.render('products/sua_comic', { comic: comic });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.updateComic = async (req, res) => {


    try {
        const  comicId = await Comic.findById(req.params.id);
        let url_image = "";
        let url_pdf = "";
        if (req.files["images"]) {
            const imageFile = req.files["images"][0];
            fs.renameSync(
                imageFile.path,
                "./public/uploads/" + imageFile.originalname
            );
            url_image = "/uploads/" + imageFile.originalname;
        }
    
        if (req.files["content_img"]) {
            const pdfFile = req.files["content_img"][0];
            fs.renameSync(pdfFile.path, "./public/uploads/" + pdfFile.originalname);
            url_pdf = "/uploads/" + pdfFile.originalname;
            // Xử lý PDF nếu cần
        }


        // const updatedComic = {
        //     title: req.body.title,
        //     description: req.body.description,
        //     author: req.body.author,
        //     publishYear: req.body.publishYear,
        //     // Sử dụng ảnh cũ hoặc ảnh mới tùy thuộc vào việc có ảnh mới được tải lên hay không
        //     images: url_image || comicId.images,
        //     // Sử dụng file PDF cũ hoặc file PDF mới tùy thuộc vào việc có file PDF mới được tải lên hay không
        //     content_img: url_pdf || comicId.content_img,
        // };


        var updatedComic = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            publishYear: req.body.publishYear,
            images: comicId.images,
            content_img: comicId.content_img,
        }

        if (req.files['images'] && req.files['content_img']) {
            var updatedComic = {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                publishYear: req.body.publishYear,
                images: url_image,
                content_img: url_pdf,
            };
            
        } else {
            var updatedComic = {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                publishYear: req.body.publishYear,
                images: comicId.images,
                content_img: comicId.content_img,
            }
            
        }
            
     

        const comic = await Comic.findByIdAndUpdate(req.params.id, updatedComic, { new: true });
        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }
        res.redirect('/api/comics');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
    






// Xem chi tiết truyện  
exports.getDetailComic = async (req, res) => {
    try {
        const comments = await Comment.find({comicId: req.params.id})
        const comic = await Comic.findById(req.params.id);
        if (comic == null) {
            return res.status(404).json({ message: 'Comic not found' });
        }
        // res.json(comic);
        res.render('products/chitiet', {comic: comic, comments: comments})
        // res.json("comments: "+comments +" comic: "+comic)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getDelete = (req, res) => {
    var id = req.params.id;
    console.log("Yêu cầu DELETE đến /delete/" + id);
    Comic.findByIdAndDelete(id).then(() => {
        console.log("chay vao day1");
        res.redirect('/api/comics');
    }).catch((err) => {
        console.log("Lỗi Xoá", err);
    });
    }