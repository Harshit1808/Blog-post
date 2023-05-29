const dotenv = require("dotenv")
const mongoose = require('mongoose');
dotenv.config({path: './.env' });
const DB= process.env.DATABASE;

mongoose.set('strictQuery', true)
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;