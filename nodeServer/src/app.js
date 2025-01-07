const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { connectMongo } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
require("dotenv").config();

const app = express();

// Middlewares
app.use(helmet()); // Add security headers
app.use(logger); // Log requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to DB
connectMongo();

module.exports = app;
