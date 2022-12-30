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
        getDbCollection('users', users => {
            users.findOne({_id: ObjectId(decode.token), token: token}).then(user => {
                return cb(null, user);
            })
            .catch(err => cb(err))
        })
    })
}


module.exports = {getDbCollection, findUserByToken}