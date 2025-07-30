const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connect directly to the ecommerce_db database
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db';
    
    const conn = await mongoose.connect(connectionString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    return conn;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;




/////////////////////////////////////////
