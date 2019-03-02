const express = require('express');
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/user', require('./user'));
router.use('/comment', require('./comment'));

module.exports = router;
