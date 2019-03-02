const User = require('../models/User');

const create = async (req, res) => {
  console.log('[NEW]');
  const data = req.body;

  const user = new User({
    name: data.name,
    email: data.email,
  });

  user.save().then(item => {
    return res.status(200).send(item);
  });
};

module.exports = {
  create,
};
