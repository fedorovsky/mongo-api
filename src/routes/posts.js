const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.route('/').get(postController.getAll);
router.route('/').post(postController.createPost);
router.route('/:id').delete(postController.deletePost);

module.exports = router;
