const mongoose = require("mongoose");
const { Pool } = require("pg");
require("dotenv").config();

// MongoDB connection
async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Connection without deprecated options
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// PostgreSQL connection pool
const pgPool = new Pool({
  host: process.env.PGSQL_HOST,
  user: process.env.PGSQL_USER,
  password: process.env.PGSQL_PASSWORD,
  database: process.env.PGSQL_DATABASE,
  port: process.env.PGSQL_PORT || 5432, // Default PostgreSQL port
});

// pgPool
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((err) => console.error("PostgreSQL connection error:", err));

module.exports = { connectMongo, pgPool };
