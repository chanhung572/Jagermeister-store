const mongoose = require('mongoose');

module.exports = () => {
  try {
    mongoose.connect(process.env.DB);
    console.log('Connected to the database successfully');
  } catch (error) {
    console.log(error);
    console.error('Error connecting to the database:', error);
  }
}