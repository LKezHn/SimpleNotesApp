const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost/simplenotesapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(res => console.log('Connected to DB'));

module.exports = connection;

