const mongoose = require('mongoose');

// Database Config
const dbURI = `mongodb+srv://admin:2OA8yBjRkRRll27r@cluster0.bqp3z.mongodb.net/prototype?retryWrites=true&w=majority`;
const mongo_options = {
    dbName: 'prototype',
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
};

// MongoDB Connection Function | Using Mongoose
module.exports = function () {
    mongoose.connect(dbURI, mongo_options)
    .then(() => console.log(`MongoDB Connected to ${mongo_options.dbName} database...`));
}