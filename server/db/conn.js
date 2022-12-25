const { MongoClient } = require("mongodb");
const Db = process.env.DB_URI;
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
        _db = db.db("iocldb");
        console.log("Successfully connected to iocldb.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};