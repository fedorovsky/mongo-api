const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
