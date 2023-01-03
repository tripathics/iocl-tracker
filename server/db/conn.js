const { MongoClient } = require("mongodb");
const Db = process.env.DB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** @type {import('mongodb').Db} */
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db(dbName);
        console.log(`Successfully connected to ${dbName}.`);
        _db.collection('logged_in_users').createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 60 * 3 })
        .then(() => {console.log('Created index for users expiration')})
        .catch(err => {throw err;})

        _db.collection('logged_in_drivers').createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 60 * 3 })
        .then(() => {console.log('Created index for drivers expiration')})
        .catch(err => {throw err;})
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};