const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");

// GET request to get the cat documents associated with a userId
module.exports.getCats = async function (req, res) {
  // get userId from request
  var userId = req.params.userId;
  var ObjectId = mongoose.Types.ObjectId;

  // find the cats in the db
  Cat.find({ "users.userId": new ObjectId(userId) })
    .lean()
    .exec(function (err, cats) {
      // log error if present
      if (err) return console.error(err);
      // all good, return 200 and the data
      res.status(200);
      res.send(cats);
    });
};

// GET request to return the cat document with all feeding times sorted by time desc
module.exports.getLatestFeedingTime = async function (req, res) {
  var id = req.params._id;
  var ObjectId = mongoose.Types.ObjectId;

  Cat.aggregate(
    [
      { $unwind: "$feedingTimes" },
      { $match: { _id: new ObjectId(id) } },
      { $sort: { "feedingTimes.time": -1 } },
      { $limit: 1 },
    ],
    function (err, latestFeedingTime) {
      // log error if present
      if (err) return console.error(err);
      res.status(500);
      // all good, return 200 and the data
      res.status(200);
      res.send(latestFeedingTime);
    }
  );
};

// GET request to return the cat document filtered by the latest feeding time
module.exports.getAllFeedingTimes = async function (req, res) {
  var id = req.params._id;
  var ObjectId = mongoose.Types.ObjectId;

  Cat.aggregate(
    [
      { $match: { _id: new ObjectId(id) } },
      { $sort: { "feedingTimes.time": -1 } },
    ],
    function (err, allFeedingTimes) {
      // log error if present
      if (err) return console.error(err);
      res.status(500);
      // all good, return 200 and the data
      res.status(200);
      res.send(allFeedingTimes);
    }
  );
};

// POST request to create a cat document associated with a userId
module.exports.createCat = async function (req, res) {
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
module.exports.updateCatUsers = async function (req, res) {
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
module.exports.updateCatFeedingTimes = async function (req, res) {
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
module.exports.deleteCat = async function (req, res) {
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
