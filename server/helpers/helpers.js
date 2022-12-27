const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET = process.env.JWT_SECRET;
const dbo = require('../db/conn');
const { Db } = require('mongodb');


/** 
 * @param collection {string} collection name
 * @param cb {function} Callback
 * @returns {import('mongodb').Collection}
*/
const getDbCollection = (collection, cb) => {
    cb(dbo.getDb().collection(collection));
}



/** 
 * @param token {string} 
 * @param cb {function} 
 **/
const findUserByToken = (token, cb) => {
    jwt.verify(token, SECRET, (err, decode) => {
        getDbCollection('users', users => {
            users.findOne({_id: decode, token: token}).then(user => {
                return cb(null, user);
            })
            .catch(err => cb(err))
        })
    })
}


module.exports = {getDbCollection, findUserByToken}