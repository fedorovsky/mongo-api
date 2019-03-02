const Comment = require('../models/Comment');

const create = async (req, res) => {
  const data = req.body;

  const comment = new Comment({
    author: data.author,
    text: data.text,
  });

  comment.save().then(item => {
    return res.status(200).send(item);
  });
};

module.exports = {
  create,
};
