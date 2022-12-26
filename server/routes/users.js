const express = require('express');
const userRoutes = express.Router();
const dbo = require('../db/conn');
const bcrypt = require('bcrypt')

// users
userRoutes.route('/users/add').post(function (req, res) {
  let db_connect = dbo.getDb('iocldb');

  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword
      }
      console.log(newUser)

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
})

// sign in

module.exports = userRoutes