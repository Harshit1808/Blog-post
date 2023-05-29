const dotenv = require("dotenv")
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../model/userSchema');
const authenticate = require('../middleware/authentication');
dotenv.config({path: './.env' });
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  
// User logout
router.post('/logout', authenticate, (req, res) => {
    try {
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Create a new blog post
router.post('/posts', authenticate, async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const { userId } = req;
    console.log(userId,"post id")
    const blogPost = new BlogPost({
      title,
      body,
      tags,
      date : new Date().toISOString() ,
      author: userId,
    });
    await blogPost.save();

    res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve all blog posts
router.get('/posts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 }).populate('author', 'email');
    res.json(blogPosts);
  } catch (error) {
    console.error('Error retrieving blog posts', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve a single blog post by ID
router.get('/posts/:id', authenticate, async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Find the blog post by ID in the database
      const post = await BlogPost.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.json({ post });
    } catch (error) {
      console.error('Error retrieving blog post', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Update a blog post
router.put('/posts/:postId', authenticate, async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const { postId } = req.params;
    const { userId } = req;

    const blogPost = await BlogPost.findOneAndUpdate(
      { _id: postId, author: userId },
      { title, body, tags, date: new Date().toISOString() },
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a blog post
router.delete('/posts/:postId', authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;

    const blogPost = await BlogPost.findOneAndDelete({
      _id: postId,
      author: userId,
    });
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;