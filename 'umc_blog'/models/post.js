const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags: String,
});

module.exports = mongoose.model('post', postSchema);