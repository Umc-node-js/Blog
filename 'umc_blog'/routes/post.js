const express = require('express');
const router = express.Router();
const post = require('../models/post');

// CREATE - Display the create post form
router.get('/new', (req, res) => {
    res.render('posts/new');
});
  
// CREATE - Handle the create post form submission
router.post('/', (req, res) => {
    const { title, content, tags } = req.body;

    const newPost = new post({
      title: title,
      content: content,
      tags: tags,
      created_at: new Date(),
      updated_at: new Date(),
    });
  
    newPost.save().then(() => {
      res.redirect('/posts');
    }).catch((err) => {
      console.error('Error saving post:', err);
    });
});

// READ - Display all posts
router.get('/', (req, res) => {
    post.find().then((posts) => {
      res.render('posts/lists', { posts: posts });
    }).catch((err) => {
      console.error('Error fetching posts:', err);
    });
  });

router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content, tags } = req.body;

  post.findByIdAndUpdate(postId, {
    title: title,
    content: content,
    tags: tags,
    updated_at: new Date()
  }).then(() => {
    res.redirect('/posts');
  }).catch((err) => {
    console.error('Error updating post:', err);
  });
});

router.delete('/:id', (req, res) => {
  post.findByIdAndRemove(req.params.id).then(() => {
    res.redirect('/posts');
  }).catch((err) => {
    console.error('Error deleting post:', err);
  });
});
  
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'posting' });
// });

module.exports = router;