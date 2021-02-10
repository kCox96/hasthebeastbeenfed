const mongoose = require("mongoose");
const { nextTick } = require("process");
const Cat = mongoose.model("Cat");

// GET request to get the cat documents associated with a userId
module.exports.getCats = function (req, res) {
  // get userId from request
  var userId = req.params.userId;

  // find the cats in the db
  Cat.find({ "users.userId": userId }).exec(function (err, cats) {
    // log error if present
    if (err) return console.error(err);
    // all good, return 200 and the data
    res.status(200);
    res.send(cats);
  });
};

// POST request to create a cat document associated with a userId
module.exports.createCat = function (req, res) {
  var cat = new Cat();

  // pull params from the request
  cat.name = req.body.name;
  cat.feedingTimes = [];
  cat.users.userId = req.params.userId;

  // save to the DB and return an error/success message to the console
  Cat.save(function (err, cat) {
    // log error if present
    if (err) return console.error(err);
    // all good, return 200 and log success
    res.status(200);
    console.log(cat.name + " saved to cats collection.");
  });
};

// PUT request to update a cat document with another userId
module.exports.updateCatUsers = function (req, res) {
  var ObjectId = mongoose.Types.ObjectId;
  var query = { _id: new ObjectId(req.params._id) };
  var update = { $push: { users: { userId: req.body.userId } } };

  Cat.findOneAndUpdate(query, update, { upsert: true }, function (err, cat) {
    // log error if present
    if (err) return console.error(err);
    // all good, return 200 and log success
    res.status(200);
    console.log(cat.name + " updated.");
  });
};

// PUT request to update a cat document with feedingTimes
module.exports.updateCatFeedingTimes = function (req, res) {
  var ObjectId = mongoose.Types.ObjectId;
  var query = { _id: new ObjectId(req.params._id) };
  var update = {
    $push: {
      feedingTimes: { time: req.body.time, foodType: req.body.foodType },
    },
  };

  Cat.findOneAndUpdate(query, update, { upsert: true }, function (err, cat) {
    // log error if present
    if (err) return console.error(err);
    // all good, return 200 and log success
    res.status(200);
    console.log(cat.name + " updated.");
  });
};

// DELETE request to delete a cat document
module.exports.deleteCat = function (req, res) {
  var ObjectId = mongoose.Types.ObjectId;
  var query = { _id: new ObjectId(req.params._id) };

  Cat.findOneAndDelete(query, function (err, cat) {
    // log error if present
    if (err) return console.error(err);
    // all good, return 200 and log success
    res.status(200);
    console.log(cat.name + " deleted.");
  });
};
