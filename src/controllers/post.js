const Post = require('../models/Post');
const User = require('../models/User');

const getAll = async (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(200).send(err);
    }
    res.status(200).send(posts);
  });
};

const createPost = async (req, res) => {
  const data = req.body;

  const post = new Post({
    author: '5c725d1cee4fbc42d7fd981c',
    title: data.title,
    text: data.text,
  });

  post.save().then(post => {
    res.status(200).send(post);
  });

  User.findById('5c725d1cee4fbc42d7fd981c').exec((err, user) => {
    /**
     * Add post to user posts
     */
    user.posts.push(post);
    /**
     * Save user with new post
     */
    user.save(() => {
      console.log('[USER SAVE WITH NEW POST]');
      /**
       * Get author's posts
       */
      User.findById('5c725d1cee4fbc42d7fd981c')
        .populate('posts')
        .exec((err, user) => {
          console.log(user.posts);
        });
    });
  });
};

const deletePost = async (req, res) => {
  Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (post) {
      return res.status(200).json({ message: 'Ok' });
    }
    return res.status(500).json({ message: 'Post not found' });
  });
};

module.exports = {
  getAll,
  createPost,
  deletePost,
};
