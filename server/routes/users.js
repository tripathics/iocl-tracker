const express = require('express');
const userRoutes = express.Router();
const dbo = require('../db/conn');

// users
userRoutes.route('/users/add').post(function (req, res) {
  const newUser = req.body;
  let db_connect = dbo.getDb();

  db_connect.collection('users')
    .insertOne(newUser)
    .then(result => {
      console.log(`New user signed up: ${result.insertedId}`);
      res.json(result);
    })
    .catch(err => {
      throw err
    })
})

// sign in

module.exports = userRoutes