const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishYear: {
        type: Number,
        // required: true
    },
  
    images: String,
    content_img:String

});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;
