const mongoose = require('mongoose');
const express = require('express');
const bson = require('bson');
const cors = require('cors');
const ip = require('ip');
const bodyParser = require('body-parser');
const colors = require('colors');
const logger = require('morgan');

const PostModel = require('./models/Post');
const User = require('./models/User');
const CommentModel = require('./models/Comment');

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb://Fedorovskyi:ZXCvbnmzxc123@ds251223.mlab.com:51223/blog', {
    useNewUrlParser: true,
  })
  .then(
    () => console.log('Connected DB'),
    err => console.log('Error connected DB', err)
  );

const app = express();

app.use(cors());
app.use(
  logger(':method :url :status :response-time ms - :res[content-length]')
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * NEW USER [POST]
 */
app.post('/user', (req, res) => {
  const data = req.body;

  const user = new User({
    name: data.name,
    email: data.email,
  });

  user.save().then(item => {
    return res.status(200).send(item);
  });
});

/**
 * GET ALL POSTS [GET]
 */
app.get('/posts', (req, res) => {
  PostModel.find({}, (err, posts) => {
    if (err) {
      res.status(200).send(err);
    }
    res.status(200).send(posts);
  });
});

/**
 * NEW POST [POST]
 */
app.post('/post', (req, res) => {
  const data = req.body;

  const post = new PostModel({
    author: '5c725d1cee4fbc42d7fd981c',
    title: data.title,
    text: data.text,
  });

  User.findById('5c725d1cee4fbc42d7fd981c').exec((err, user) => {
    /**
     * Save new post
     */
    post.save().then(post => {
      res.status(200).send(post);
    });
    /**
     * Add post to user posts
     */
    user.posts.push(post);
    /**
     * Save user
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
});

/**
 * DELETE POST [DELETE]
 */
app.delete('/posts/:id', (req, res) => {
  PostModel.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (post) {
      return res.status(200).json({ message: 'Ok' });
    }
    return res.status(500).json({ message: 'Post not found' });
  });
});

/**
 * NEW COMMENT [POST]
 */
app.post('/comment', (req, res) => {
  const data = req.body;

  const comment = new CommentModel({
    author: data.author,
    text: data.text,
  });

  comment.save().then(item => {
    return res.status(200).send(item);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(colors.green(`Server started : [http://${ip.address()}:${PORT}`));
});
