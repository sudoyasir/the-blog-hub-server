const port = 5000;

const express = require('express');
const mongoose = require('mongoose')
const Admin = require('./models/AdminModel')
const BlogPost = require('./models/BlogModel');
const adminRoutes = require("./newAdmin")
const bcrypt = require("bcryptjs")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(adminRoutes);
app.use(express.json());


app.get('/admin', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.post('/admin', async (req, res) => {
    try {
        const { email, password, image, name } = req.body;
        const admin = new Admin({ email, password, image, name });
        await admin.save();
        res.status(201).send({ message: 'Admin created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating admin' });
    }
});


app.post('/admin/authenticate', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).send({ message: 'Email not found. Please try again.' });
        }
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Incorrect password. Please try again.' });
        }
        res.send({
            status: true,
            message: "User found!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server Error. Please try again later.' });
    }
});

app.post('/new-blog', async (req, res) => {
    const { title, category, content, headerImage, createdAt } = req.body;

    const newBlogPost = new BlogPost({
        title,
        category,
        content,
        headerImage,
        createdAt
    });

    try {
        await newBlogPost.save();
        res.status(201).send('Blog post saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/blogs', async (req, res) => {
    try {
        // Fetch all the blog posts from the database
        const blogPosts = await BlogPost.find();

        res.status(200).json(blogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/blogs/:id', async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(blogPost);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/delete/blogs/:id', async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blogPost) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json({ msg: 'Blog post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});








mongoose.connect('mongodb+srv://yasir2002:EliteBook2002@cluster0.vgcb7fd.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log("MongoDB Atlas is connected to server!");
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })
}).catch((error) => {
    console.log("db NOT connected");
    console.log(error.message);
})
