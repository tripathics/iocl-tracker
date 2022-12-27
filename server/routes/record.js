const express = require('express');
const tracksRoutes = express.Router();
const { getDbCollection } = require('../helpers/helpers')

const ObjectId = require('mongodb').ObjectId;

tracksRoutes.route('/vehicles').get((req, res) => {
  getDbCollection('vehicles', (vehicles) => {
    vehicles.find({})
      .toArray()
      .then(result => { res.json(result) })
      .catch(err => {
        throw err;
      });
  })
});

tracksRoutes.route('/vehicles/:id').get((req, res) => {
  getDbCollection('vehicles', (vehicles) => {
    let query = { _id: ObjectId(req.params.id) };

    vehicles.findOne(query)
      .then(result => { res.json(result) })
      .catch(err => {
        throw err;
      });
  })
})

tracksRoutes.route('/vehicles/add').post((req, res) => {
  getDbCollection('vehicles', (vehicle) => {
    let newVehicle = req.body;
  
    vehicle.insertOne(newVehicle)
      .then(result => { res.json(result) })
      .catch(err => {
        throw err;
      });

  })
});

// This section will help you update a record by id.
tracksRoutes.route("/update/:id").post(function (req, res) {
  getDbCollection('vehicles', (vehicle) => {   
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: { pos: req.body.pos },
    };
  
    vehicle.updateOne(myquery, newvalues)
      .then(result => {
        console.log('1 document updated');
        res.json(result);
      })
      .catch(err => {
        throw err;
      })
  })
});

module.exports = tracksRoutes