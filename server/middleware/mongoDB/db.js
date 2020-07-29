const mongoose = require("mongoose");
const { logger } = require("../log/winston"); // Import of winston for error logging
const config = require("config");

// Database Config
const dbURI = require("../config/keys").mongoURI;

const mongo_options = {
  dbName: config.get("dbName"),
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
};

// MongoDB Connection Function | Using Mongoose
module.exports = function () {
  mongoose
    .connect(dbURI, mongo_options)
    .then(() =>
      logger.info(`MongoDB Connected to ${mongo_options.dbName} database...`)
    );
};