const express = require("express");
const router = express.Router();
const keys = require("../../config/key.js");
const Post = require("../../models/Post.model.js");
const User = require("../../models/User.model.js");


router.route('/').get((req, res) => {
  Post.find()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const pseudo = req.body.pseudo;
  const content = req.body.content;
  const newPost = new Post({
    pseudo,
    content
  });

  newPost.save()
  .then(() => res.json('Post added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(Post => res.json(Post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user/:pseudo').get((req, res) => {
  Post.find({pseudo: req.params.pseudo})
    .then(Post => res.json(Post))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.pseudo = req.body.pseudo;
      post.content = req.body.content;
      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/comment/:id').post((req, res) => {
  const pseudo = req.body.pseudo
  const comment = req.body.comment
  Post.findById(req.params.id)
    .then(post => {
      post.comment.push ({[pseudo] : comment});
      post.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
