const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const ip = require('ip');
const bodyParser = require('body-parser');
const PostModel = require('./models/Post');

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    'mongodb://Fedorovskyi:ZXCvbnmzxc123@ds251223.mlab.com:51223/blog',
    { useNewUrlParser: true }
  )
  .then(
    () => console.log('Connected DB'),
    err => console.log('Error connected DB')
  );

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * GET
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
 * POST
 */
app.post('/posts', (req, res) => {
  const data = req.body;

  const post = new PostModel({
    title: data.title,
    text: data.text,
  });

  post.save().then(item => {
    return res.status(200).send(item);
  });
});

/**
 * DELETE
 */
app.delete('/posts/:id', (req, res) => {
  PostModel.findOneAndDelete({ _id: req.params.id }, (err, post) => {
    if (post) {
      return res.status(200).json({ message: 'Ok' });
    }
    return res.status(500).json({ message: 'Post not found' });
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started...`);
  console.log(`http://${ip.address()}:${PORT}`);
});
