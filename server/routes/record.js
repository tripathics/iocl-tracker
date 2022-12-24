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
  let query = { _id: req.params.id};
  db_connect
  .collection('vehicles')
  .fintOne(query, (err, result) => {
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
