const express = require('express');
const userRoutes = express.Router();
const { getDbCollection, findUserByToken, registerNewUser } = require('../helpers/helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('bson');
const SECRET = process.env.JWT_SECRET;

// Register a new user
userRoutes.route('/users/register').post((req, res) => {
  getDbCollection('users', users => {
    const { name, email, password, password2 } = req.body;
    if (password != password2) {
      return res.status(400).json({ message: "passwords doesn't match" });
    }

    const user = {
      name: name,
      email: email,
      password: password
    }

    registerNewUser(users, user, res).catch(err => {throw err;});
  })
})

// sign in
userRoutes.route('/users/login').post((req, res) => {
  let token = req.cookies.auth;

  findUserByToken('users', token, (err, user) => {
    if (err) return res(err);
    if (user) return res.status(400).json({ error: true, message: 'You are already logged in' });

    else {
      getDbCollection('users', users => {
        users.findOne({ 'email': req.body.email }).then(user => {
          if (!user) return res.json({ isAuth: false, message: 'Email does not exist' });

          bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (!isMatch) return res.json({ isAuth: false, message: "Password mismatched" });

            // generate token
            let jwtToken = jwt.sign({ token: user._id.toHexString() }, SECRET, { expiresIn: 60 * 60 });

            let query = { _id: ObjectID(user._id) };
            let newvalues = {
              $set: { token: jwtToken },
            };

            users.updateOne(query, newvalues).then(result => {
              console.log(result);
              res.cookie('auth', jwtToken, { maxAge: 3600 * 1000 }).json({
                isAuth: true, id: user._id, email: user.email
              });
            })
              .catch(err => res.status(400).send(err));
          })
        })
      })
    }
  })
})



// sign in
userRoutes.route('/drivers/login').post((req, res) => {
  let token = req.cookies.auth;

  findUserByToken('drivers', token, (err, driver) => {
    if (err) return res(err);
    if (driver) return res.status(400).json({ error: true, message: 'You are already logged in' });

    else {
      getDbCollection('drivers', drivers => {
        drivers.findOne({ 'email': req.body.email }).then(driver => {
          if (!driver) return res.json({ isAuth: false, message: 'Email does not exist' });

          bcrypt.compare(req.body.password, driver.password).then(isMatch => {
            if (!isMatch) return res.json({ isAuth: false, message: "Password mismatched" });

            // generate token
            let jwtToken = jwt.sign({ token: driver._id.toHexString() }, SECRET, { expiresIn: 60 * 60 });

            let query = { _id: ObjectID(driver._id) };
            let newvalues = {
              $set: { token: jwtToken },
            };

            drivers.updateOne(query, newvalues).then(result => {
              console.log(result);
              res.cookie('auth', jwtToken, { maxAge: 3600 * 1000 }).json({
                isAuth: true, id: driver._id, email: driver.email
              });
            })
              .catch(err => res.status(400).send(err));
          })
        })
      })
    }
  })
})

// Drivers sign out
userRoutes.route('/drivers/logout').get((req, res) => {
  let token = req.cookies.auth;
  findUserByToken('drivers' ,token, (err,driver) => {
    if (err) throw err;
    if (!driver) return res.status(400).json({ error: true });

    // if user found, clear token from db
    getDbCollection('drivers', drivers => {
      const newValues = { $unset: { token: 1 } }
      const query = { _id: ObjectID(driver._id) }
      drivers.updateOne(query, newValues).then(result => {
        console.log(result);
        res.sendStatus(200);
      }).catch(err => {
        res.status(400).send(err);
      })
    })
  })
})

// sign out
userRoutes.route('/users/logout').get((req, res) => {
  let token = req.cookies.auth;
  findUserByToken('users', token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(400).json({ error: true });

    // if user found, clear token from db
    getDbCollection('users', users => {
      const newValues = { $unset: { token: 1 } }
      const query = { _id: ObjectID(user._id) }
      users.updateOne(query, newValues).then(result => {
        console.log(result);
        res.sendStatus(200);
      }).catch(err => {
        res.status(400).send(err);
      })
    })
  })
})

// check authorized
userRoutes.route('/users/auth').post((req, res) => {
  let token = req.cookies.auth;

  findUserByToken('users', token, (err, user) => {
    if (err) return res(err);
    if (!user) return res.status(401).json({ isAuth: false, message: 'Unauthorized' });

    return res.status(200).json({ isAuth: true, message: 'success' });
  })
})

userRoutes.route('/drivers/auth').post((req, res) => {
  let token = req.cookies.auth;

  findUserByToken('drivers', token, (err, driver) => {
    if (err) return res(err);
    if (!driver) return res.status(401).json({ isAuth: false, message: 'Unauthorized' });

    return res.status(200).json({ isAuth: true, message: 'success' });
  })
})

module.exports = userRoutes