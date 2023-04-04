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
foodRoutes.route("/food/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("foods")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new food.
foodRoutes.route("/food/add").post(function (req, response) {
 let db_connect = dbo.getDb();
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
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
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
foodRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params._id) };
 db_connect.collection("foods").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = foodRoutes;