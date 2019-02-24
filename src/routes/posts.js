const express = require("express");
const router = express.Router();
const Post = require('../models/Post');

router
  .route("/")
  .get((req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
          res.status(200).send(err);
        }
        res.status(200).send(posts);
      });
  });

  module.exports = router;