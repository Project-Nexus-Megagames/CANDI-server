module.exports = function () {
  // Error handling and Logging
  const error = require("../log/winston"); // winston for error handling
  require("express-async-errors"); // [npm] express-async-errors, used to do try/catch error handling

  error.logger.info("Loading Logger Module...");
  // Add in Error handling for uncought exceptions
  process.on("uncaughtException", (err) => {
    error.logger.error(`${err.message}`, { meta: err });
    process.exit(1);
  });

  // Add in Error handling for unhandled Promise rejections
  process.on("unhandledRejection", (err) => {
    error.logger.error(`${err.message}`, { meta: err });
    process.exit(1);
  });
};