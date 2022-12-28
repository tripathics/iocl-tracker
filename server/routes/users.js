const express = require('express');
const userRoutes = express.Router();
const { getDbCollection, findUserByToken } = require('../helpers/helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Register a new user
userRoutes.route('/users/register').post((req, res) => {
  getDbCollection('users', users => {
    const { name, email, password, password2 } = req.body;
    if (password != password2) {
      return res.status(400).json({ message: "passwords doesn't match" });
    }

    users.findOne({ email: email }).then(result => {
      if (result) return res.status(400).json({ auth: false, message: 'Email exists' })

      bcrypt.hash(password, 10).then(hashedPassword => {
        const newUser = {
          name: name,
          email: email,
          password: hashedPassword,
          token: null
        }
        console.log(newUser)

        users.insertOne(newUser).then(result => {
          console.log(`New user signed up: ${result.insertedId}`);
          res.status(200).json({
            success: true,
            user: result.insertedId
          });
        })
          .catch(err => {
            throw err
          })
      })
    })
      .catch(err => {
        throw err;
      })
  })
})

// sign in
userRoutes.route('/users/login').post((req, res) => {
  let token = req.cookies.auth;
  findUserByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) return res.status(400).json({ error: true, message: 'You are already logged in' });

    else {
      getDbCollection('users', users => {
        users.findOne({ 'email': req.body.email }).then(user => {
          if (!user) return res.json({ isAuth: false, message: 'Email does not exist' });

          bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (!isMatch) return res.json({ isAuth: false, message: "Password mismatched" });

            // generate token
            var token = jwt.sign(user._id.toHexString(), SECRET);
            users.updateOne({_id: user._id}, {
              $set: { token: token }
            }).then(result => {
              res.cookie('auth', user.token).json({
                isAuth: true, 
                id: user._id,
                email: user.email
              });
            })
            .catch(err => res.status(400).send(err))
          })
        })
      })
    }
  })
})

module.exports = userRoutes