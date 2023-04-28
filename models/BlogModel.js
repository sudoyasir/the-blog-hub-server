const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    headerImage: { type: String, required: true },
    createdAt: {type:String, required:true}
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
