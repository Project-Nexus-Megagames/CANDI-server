const config = require('config');

const dbName = config.get('dbName');
const connectString =
  // "mongodb+srv://admin:2OA8yBjRkRRll27r@cluster0.bqp3z.mongodb.net/" +
  'mongodb+srv://Admin:u8A7WZzz80uLT5we@cluster0-dvbtk.azure.mongodb.net/' +
  dbName +
  '?retryWrites=true&w=majority';


module.exports = {
	mongoURI: connectString

};