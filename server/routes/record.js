const express = require('express');
const tracksRoutes = express.Router();
const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;


tracksRoutes.route('/vehicles').get((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  db_connect
    .collection('vehicles')
    .find({})
    .toArray()
    .then(result => {res.json(result)})
    .catch(err => {
      throw err;
    });
});

tracksRoutes.route('/vehicles/:id').get((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  let query = { _id: ObjectId(req.params.id) };

  db_connect
    .collection('vehicles')
    .findOne(query)
    .then(result => {res.json(result)})
    .catch(err => {
      throw err;
    });
})

tracksRoutes.route('/vehicles/add').post((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  let newVehicle = req.body;

  db_connect
    .collection('vehicles')
    .insertOne(newVehicle)
    .then(result => {res.json(result)})
    .catch(err => {
      throw err;
    });
});

tracksRoutes.route('users/add').post((req,res) =>{
  let db_connect=dbo.getDb('iocldb');
  let newUser = req.body;

  db_connect
    .collection('users')
    .insertOne(newUser)
    .then(result => {res.json(result)})
    .catch(err => {
      throw err;
    })
})
// This section will help you update a record by id.
tracksRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: { pos: req.body.pos },
  };

  db_connect
    .collection('vehicles')
    .updateOne(myquery, newvalues)
    .then(result => {
      console.log('1 document updated');
      res.json(result);
    })
    .catch(err => {
      throw err;
    })
});

module.exports = tracksRoutes