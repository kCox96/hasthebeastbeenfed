const mongoose = require("mongoose");
const Cat = mongoose.model("Cat");

/**
 * GET /api/cats/:userId
 * @summary returns all cat documents associated with the provided userId
 * @param {userId} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.getCats = async function (req, res) {
  // get userId from request
  var userId = req.params.userId;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the userId provided in the request isn't valid return an error
  if (!isValidObjectId(userId)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // userId is valid - let's carry on

  // build the query
  var query = Cat.find();
  // tell the db to return a lean JSON object rather than a
  // full mongoose doc to improve performance
  query.setOptions({ lean: true });
  query
    .where("users.userId") // Specify the Object to filter on
    .equals(new ObjectId(userId)) // Filter the query with the userId passed into the API call
    .exec(function (err, cats) {
      // execute the query
      // return 500 and error if something went wrong
      if (err) {
        res.status(500).send(err);
      } else {
        // all good, return 200 and the data
        res.status(200).send(cats);
      }
    });
};

/**
 * GET /api/cat/:_id
 * @summary returns a single cat document for the _id passed into the API call
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.getCat = async function (req, res) {
  // get _id from request
  var id = req.params._id;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // build the query
  Cat.findById(id, function (err, cat) {
    // execute the query
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(cat);
    }
  });
};

/**
 * GET /api/cats/feeding/latest/:_id
 * @summary returns a single cat document with the latest feeding time associated with
 * the ObjectId passed into the API call
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.getLatestFeedingTime = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // build the query
  var query = [
    // unwind the feedingTimes array so we can search through and get the latest time
    { $unwind: "$feedingTimes" },
    // match the _id in the database against the one passed into the API call
    { $match: { _id: new ObjectId(id) } },
    // sort the times in desc order
    { $sort: { "feedingTimes.time": -1 } },
    // only return the latest time
    { $limit: 1 },
  ];

  // execute the query
  Cat.aggregate(query, function (err, latestFeedingTime) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(latestFeedingTime);
    }
  });
};

/**
 * GET /api/cats/feeding/all/:_id
 * @summary returns a single cat document with all feeding times associated with
 * the ObjectId passed into the API call (times are sorted in desc order)
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.getAllFeedingTimes = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // build the query
  var query = [
    // unwind the feedingTimes array so we can search through and get all the times
    { $unwind: "$feedingTimes" },
    // match the _id in the database against the one passed into the API call
    { $match: { _id: new ObjectId(id) } },
    // sort the times in desc order
    { $sort: { "feedingTimes.time": -1 } },
    // group the reply
    {
      $group: { _id: "$_id", feedingTimes: { $push: "$feedingTimes" } },
    },
  ];

  // execute the query
  Cat.aggregate(query, function (err, allFeedingTimes) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(allFeedingTimes);
    }
  });
};

/**
 * POST /api/cats/:userId
 * @summary inserts a single cat document into the database
 * @param {userId} req
 * @body {name} - the cat's name
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.createCat = async function (req, res) {
  // get params from request
  var userId = req.params.userId;
  var name = req.body.name;
  // create empty array for feedingTimes
  var feedingTimes = [];
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the userId provided in the request isn't valid return an error
  if (!isValidObjectId(userId)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // userId is valid - let's carry on

  var query = [
    {
      name: name,
      feedingTimes: feedingTimes,
      users: { userId: new ObjectId(userId) },
    },
  ];

  // save the instance of the cat data model to the database
  Cat.create(query, function (err, cat) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(cat);
    }
  });
};

/**
 * POST /api/cats/replace/:_id
 * @summary replaces a single cat document with the Object provided
 * @param {_id} req
 * @body {name} - the cat's name
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.replaceCat = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // get replacement document object from request
  var replacement = req.body;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // build the query to find the targeted cat document
  var query = {
    _id: new ObjectId(id),
  };

  var options = { new: true };

  Cat.findOneAndReplace(query, replacement, options, function (err, cat) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(cat);
    }
  });
};

/**
 * PUT /api/cats/users/:_id
 * @summary updates a single cat document with a specified userId
 * @param {_id} req
 * @body {userId} - the userId to update the cat document with
 * @response 200 - OK
 * @response 400 - userId is already associated with the cat document
 * @response 500 - Error
 */
module.exports.updateCatUsers = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // get userId from request body
  var userId = req.body.userId;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // build the query to find the targeted cat document
  var updateQuery = {
    _id: new ObjectId(id),
  };
  // build the update part of the query to update the cat document with the userId
  var updateContent = {
    $addToSet: { users: { userId: new ObjectId(userId) } },
  };
  // build the query options to not upsert (i.e. create a new document if one doesn't exist)
  // and return the modified document on completion
  var updateOptions = { upsert: false, new: true };

  // if the _id or userId provided in the request isn't valid return an error
  if (!isValidObjectId(id) || !isValidObjectId(userId)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id and userId are valid - let's carry on

  // now validate the userId is not already associated with the cat
  var query = Cat.find({ "users.userId": { $in: userId } });
  // tell the db to return a lean JSON object rather than a
  // full mongoose doc to improve performance
  query.setOptions({ lean: true });
  query
    .where("_id") // Specify the Object to filter on
    .equals(new ObjectId(id)) // Filter the query with the _id passed into the API call
    .exec(function (err, cats) {
      // execute the query
      // return 500 and error if something went wrong
      if (err) {
        res.status(500).send(err);
      }
      // if the reply already includes the userId provided then return an error
      if (JSON.stringify(cats).includes(userId)) {
        res
          .status(400)
          .send("Error: userId provided is already associated with the cat");
      }
      // the userId isn't already associated with the cat - carry on and perform the update
      else {
        Cat.findByIdAndUpdate(
          updateQuery,
          updateContent,
          updateOptions,
          function (err, cat) {
            // return 500 and error if something went wrong
            if (err) {
              res.status(500).send(err);
            } else {
              // all good, return 200 and the data
              res.status(200).send(cat);
            }
          }
        );
      }
    });
};

/**
 * PUT /api/cats/feeding/:_id
 * @summary updates a single cat document with feedingTimes
 * @param {_id} req
 * @body {time} - the time to push to the feedingTimes array
 * @body {foodType} - the foodType to push to the feedingTimes array
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.updateCatFeedingTimes = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;
  // build the query to find the targeted cat document
  var query = { _id: new ObjectId(req.params._id) };
  // build the update part of the query to update the cat document with the feedingTimes
  var update = {
    $push: {
      feedingTimes: { time: req.body.time, foodType: req.body.foodType },
    },
  };
  // build the query options to not upsert (i.e. create a new document if one doesn't exist)
  // and return the modified document on completion
  var options = { upsert: false, new: true };

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // execute the query
  Cat.findByIdAndUpdate(query, update, options, function (err, cat) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(cat);
    }
  });
};

/**
 * DELETE /api/cats/:_id
 * @summary deletes a single cat document from the database
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.deleteCat = async function (req, res) {
  // get cat ObjectId from request
  var id = req.params._id;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;
  // build the query to find the targeted cat document
  var query = { _id: new ObjectId(req.params._id) };

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // execute the query
  Cat.findByIdAndDelete(query, function (err, cat) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(cat);
    }
  });
};

// helper method to ensure _id or userId params
// passed to the API are valid MongoDB ObjectId types
// ObjectIds consist of 24 hex chars (0-9, a-f or A-F)
function isValidObjectId(id) {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  } else {
    return false;
  }
}
