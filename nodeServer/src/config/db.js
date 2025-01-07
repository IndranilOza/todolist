const mongoose = require("mongoose");
const mysql = require("mysql2/promise");
require("dotenv").config();

// MongoDB connection
async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// MySQL connection pool
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

mysqlPool
  .getConnection()
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("MySQL connection error:", err));

module.exports = { connectMongo, mysqlPool };
