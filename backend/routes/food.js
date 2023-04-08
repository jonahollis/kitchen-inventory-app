const express = require("express");
 
// foodRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /food.
const foodRoutes = express.Router();

// pointing express to access files in public folder
foodRoutes.use(express.static('public'))

// **express middleware parser functions that let you parse outgoing request data depending on the encoding of data you're sending to the server
foodRoutes.use(express.urlencoded({ extended: true }))

// parses incoming JSON requests and puts the parsed data in request body 
foodRoutes.use(express.json())
 
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
foodRoutes.route("/food/add").post(async function (req, res) {
  let db_connect = dbo.getDb("kitchen-inventory-app");
  let myobj = {
    text: req.body.text,
    quantity: req.body.quantity,
    unit: req.body.unit,
    expiration: req.body.expiration,
    location: req.body.location,
    groceryQuantity: req.body.groceryQuantity,
    replenish: req.body.replenish,
  };
  try {
    const result = await db_connect
      .collection("foods")
      .insertOne(myobj)
      console.log("1 document added")
    const updatedFood = await db_connect
      .collection("foods")
      .findOne(myobj);
    res.json(updatedFood);
  }catch (error) {
      console.log(error);
      res.status(500).send("Server error");
  }
  }
)
 
// This section will help you update a food by id.
foodRoutes.route("/update/:id").post(async function (req, res) {
  let db_connect = dbo.getDb("kitchen-inventory-app");
  let myquery = { _id: new ObjectId(req.params.id) };
  let newValues = {
    $set: {
      text: req.body.text,
      quantity: req.body.quantity,
      unit: req.body.unit,
      expiration: req.body.expiration,
      location: req.body.location,
      groceryQuantity: req.body.groceryQuantity,
      replenish: req.body.replenish,
    },
  };
  try {
    const result = await db_connect
      .collection("foods")
      .updateOne(myquery, newValues);
    console.log("1 document updated");
    const updatedFood = await db_connect
      .collection("foods")
      .findOne(myquery);
    res.json(updatedFood);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
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