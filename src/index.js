import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import PostModel from './models/Post';

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://Fedorovskyi:ZXCvbnmzxc123@ds251223.mlab.com:51223/blog', { useNewUrlParser: true }).then(
  () => console.log('Connected DB'),
  err => console.log('Error connected DB'),
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * GET
 */
app.get('/posts', (req, res) => {
  PostModel.find().then((err, posts) => {
    if(err) {
      res.send(err);
    }
    res.json(posts);
  })
})

/**
 * POST
 */
app.post('/posts', (req, res) => {
  const data = req.body;

  const post = new PostModel({
    title: data.title,
    text: data.text,
  })

  post.save().then((item) => {
    return res.json({ status: 'OK' })
  })
})

/**
 * DELETE
 */
app.delete('/posts/:id', (req, res) => {
  PostModel.deleteOne({
    _id: req.params.id
  }, (err) => {
    if (err) {
      res.json({ status: 'error' });
    }
    res.json({ status: 'deleted' });
  })
});

app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port 8080");
});