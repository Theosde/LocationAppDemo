const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://LocationAdmin:LocationApp@locationapp-ylvah.mongodb.net/loctionapp';

const options = {
  connectTimeoutMS: 5000,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(dbUrl, options, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Your database is OK')
  }
});

module.exports = mongoose;
