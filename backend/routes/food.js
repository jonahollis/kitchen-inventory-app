const express = require("express");
 
// foodRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /food.
const foodRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the foods.
foodRoutes.route("/food").get(function (req, res) {
 let db_connect = dbo.getDb("kitchen-inventory-app");
 db_connect
    .collection("foods")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      res.json(data);
    });

});
 
// This section will help you get a single food by id
foodRoutes.route("/food/:id").get(async (req, res) => {
  try {
    const db_connect = await dbo.getDb("kitchen-inventory-app");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("foods").findOne(myquery);
    console.log(result)
    res.json(result);
  } catch (err) {
    throw err;
  }
});
 
// This section will help you create a new food.
foodRoutes.route("/food/add").post(function (req, response) {
 let db_connect = dbo.getDb("kitchen-inventory-app");
 let myobj = {
    text: req.body.text,
    quantity: req.body.quantity,
    unit: req.body.unit,
    expiration: req.body.expiration,
    location: req.body.location,
    replenish: req.body.replenish,
 };
 db_connect.collection("foods").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a food by id.
foodRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb("kitchen-inventory-app");
 let myquery = { _id: new ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     text: req.body.text,
     quantity: req.body.quantity,
     unit: req.body.unit,
     expiration: req.body.expiration,
     location: req.body.location,
     replenish: req.body.replenish,
     
   },
 };
 db_connect
   .collection("foods")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

// This section will help you delete a food
foodRoutes.route("/:id").delete(async (req, res) => {
  try {
    const db_connect = await dbo.getDb("kitchen-inventory-app");
    const myquery = { _id: new ObjectId(req.params.id) };
    const result = await db_connect.collection("foods").deleteOne(myquery);
    if (result.deletedCount === 1) {
      console.log("1 document deleted");
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});
 
module.exports = foodRoutes;