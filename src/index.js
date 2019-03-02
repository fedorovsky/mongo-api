const mongoose = require('mongoose');
const express = require('express');
const bson = require('bson');
const cors = require('cors');
const ip = require('ip');
const bodyParser = require('body-parser');
const colors = require('colors');
const logger = require('morgan');
const routes = require('./routes');

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

app.use('/api', routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    colors.green(`Server started : [http://${ip.address()}:${PORT}]`)
  );
});
