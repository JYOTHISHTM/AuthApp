const mongoose = require('mongoose');
const MESSAGES = require('../constants/messages');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(MESSAGES.MONGO_URI_MISSING);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` ${MESSAGES.DB_CONNECTED}: ${conn.connection.host}`);
  } catch (error) {
    console.error(` ${MESSAGES.DB_ERROR}: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
