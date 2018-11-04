import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import PostModel from './models/Post';

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://Fedorovskyi:ZXCvbnmzxc123@ds251223.mlab.com:51223/blog', { useNewUrlParser: true }).then(
  () => console.log('Connected DB'),
  err => console.log('Error connected DB'),
);

const app = express();

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

app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});