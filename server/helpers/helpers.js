const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET;
const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

/** 
 * @typedef {function(import('mongodb').Collection): void} Cb0
 */
/** 
 * @param {string} collection collection name
 * @param {Cb0} cb
 */
const getDbCollection = (collection, cb) => {
  cb(dbo.getDb().collection(collection));
}

/** 
 * @typedef {function(TypeError, import('mongodb').Document): void} Cb1
 * @callback cb
 */
/** 
 * @param {string} token
 * @param {Cb1} cb
 **/
const findUserByToken = (token, cb) => {
  if (!token) return cb(null, null);
  jwt.verify(token, SECRET, (err, decode) => {
    if (!decode) return cb(null, null);
    getDbCollection('users', users => {
      users.findOne({ _id: ObjectId(decode.token), token: token }).then(user => {
        return cb(null, user);
      })
        .catch(err => cb(err))
    })
  })
}

/**
 * insert new user if email does not exist
 * @param {import('mongodb').Collection} collection MongoDB Collection  
 * @param {Object} newUser User object
 * @param {Response} res Response to client
 **/
const registerNewUser = (collection, newUser, res) => collection.findOne({ email: newUser.email })
  .then(result => {
    if (result) return res.status(400).json({ auth: false, message: 'Email exists' })

    bcrypt.hash(newUser.password, 10).then(hashedPassword => {
      const hashedUser = {
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        token: null
      }
      console.log(hashedUser)

      collection.insertOne(hashedUser).then(result => {
        console.log(`New user signed up: ${result.insertedId}`);

        // if user is a driver
        if (newUser.vehicleId) {
          res.status(200).json({
            success: true,
            user: {
              userId: result.insertedId,
              vehicleId: newUser.vehicleId,
              userName: newUser.email,
              password: newUser.password
            }
          });
        } else {
          res.status(200).json({
            success: true,
            user: result.insertedId,
          });
        }
      })
        .catch(err => {
          throw err
        })
    })
  })



module.exports = { getDbCollection, findUserByToken, registerNewUser }