const express = require('express');
const tracksRoutes = express.Router();
const { getDbCollection, registerNewUser, distanceBetCoords } = require('../helpers/helpers')

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
  const currCoords = req.body.pos;
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = { $set: { pos: req.body.pos } };

  getDbCollection('vehicles', (vehicle) => {
    // compare with previous position
    vehicle.findOne(myquery).then(result => {
      const prevCoords = result.pos.coords;

      if (!prevCoords || distanceBetCoords(currCoords, prevCoords)) {
        /** TODO: add to paths array */
        getDbCollection('paths', paths => {
          paths.updateOne({vehicleId: result._id.toHexString()}, {$push : {
            coords: currCoords
          }}, {upsert: true})
          .then((dbRes) => {
            console.log(dbRes);
          })
          .catch(err => {throw err});
        })
      }
    });

    vehicle.updateOne(myquery, newvalues)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        throw err;
      })
  })
});

tracksRoutes.route('/paths/:id').get(function (req, res) {
  getDbCollection('paths', paths => {
    paths.findOne({vehicleId: req.params.id})
    .then(result => {
      if (!result) res.status(404).json(result);
      else res.status(200).json(result);
    })
    .catch(err => { throw err })
  })
})

module.exports = tracksRoutes