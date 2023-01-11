const express = require('express');
const tracksRoutes = express.Router();
const { getDbCollection, registerNewUser } = require('../helpers/helpers')

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
      .then(result => { 
        res.json(result.pos) 
      })
      .catch(err => {
        throw err;
      });
  })
})

tracksRoutes.route('/vehicles/add').post((req, res) => {
  getDbCollection('vehicles', (vehicles) => {
    const { driverName, email, phoneNumber, vehicleName, vehicleNo } = req.body;
    let newVehicle = {
      vehicleName: vehicleName,
      vehicleNo: vehicleNo
    }

    const plainPassword = (driverName.split(' ').join('').slice(0, 4) + vehicleNo.split(' ').join('').slice(0, 4)).toLowerCase()

    vehicles.insertOne(newVehicle)
      .then(result => {
        // register driver
        let driver = {
          name: driverName,
          phoneNumber: phoneNumber,
          email: email,
          password: plainPassword,
          vehicleId: result.insertedId.toHexString(),
        }
        console.log(result);
        getDbCollection('drivers', drivers => {
          registerNewUser(drivers, driver, res).catch(err => { throw err; });
        })
      })
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