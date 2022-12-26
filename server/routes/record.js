const express = require('express');
const tracksRoutes = express.Router();
const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

tracksRoutes.route('/vehicles').get((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  db_connect
    .collection('vehicles')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

tracksRoutes.route('/vehicles/:id').get((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  let query = { _id: ObjectId(req.params.id) };
  db_connect
    .collection('vehicles')
    .findOne(query, (err, result) => {
      if (err) throw err;
      res.json(result);
    })
})

tracksRoutes.route('/vehicles/add').post((req, res) => {
  let db_connect = dbo.getDb('iocldb');
  let newVehicle = req.body;

  db_connect
    .collection('vehicles').insertOne(newVehicle, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you update a record by id.
tracksRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: { pos: req.body.pos },
  };


  db_connect
    .collection("vehicles")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = tracksRoutes