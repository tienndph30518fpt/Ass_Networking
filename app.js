const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const comicRoutes = require('./routes/comicRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const upload = multer();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Kết nối MongoDB
//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/Ass_Netwoking', )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public/'));

// Routes
app.use('/api/comics', comicRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users',upload.none(), userRoutes);
// app.use(upload.none());
// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.set("view engine", "hbs");
