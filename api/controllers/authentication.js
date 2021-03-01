const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { signupValidation, loginValidation } = require("./validation");
const User = mongoose.model("User");
const Cat = mongoose.model("Cat"); // needed to remove the userId from any associated cat on deletion

/**
 *  Registration controller
 */
module.exports.createUser = async function (req, res) {
  var user = new User();
  // validate input
  const { error } = signupValidation(req.body);
  // throw validation errors
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // pull params from request
  user.username = req.body.username;
  user.email = req.body.email;
  // hash the password
  const salt = await bcrpyt.genSalt(10);
  const password = await bcrpyt.hash(req.body.password, salt);
  user.password = password;

  // save to the DB and return an error/success message to console
  await user.save(function (err, user) {
    // log error if present
    if (err) {
      res.status(400);
      res.send(err);
      return console.error(err);
    }
    // all good, return 200 and log success
    res.status(200);
    // FOR DEBUGGING
    res.send("complete");
  });
};
/**
 *  Login controller
 */
module.exports.login = async function (req, res) {
  // validate input
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // search database for user using email
  const user = await User.findOne({ email: req.body.email });
  // if can't find user return error
  if (!user) {
    return res.status(400).json({ error: "Email is wrong" });
  }

  // check password is valid
  const validPassword = await bcrpyt.compare(req.body.password, user.password);
  // if password isn't valid, return error
  if (!validPassword) {
    return res.status(400).json({ error: "Password is wrong" });
  }
  // all good, return 200 and log success
  //  res.json({
  //   error: null,
  //   data: {
  //     message: "Login successful",
  //   },
  // });

  // create jwt token
  const token = jwt.sign(
    // payload data
    {
      name: user.username,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  // set token session in the HTTP Response body
  //       res.status(200).json({
  //       idToken: jwtBearerToken,
  //       expiresIn: 300
  // });

  res.header("auth-token", token).json({
    error: null,
    // FOR DEBUGGING - REMOVE BEFORE SUBMIT
    data: {
      token,
    },
  });
};

/**
 * GET /api/users/:_id
 * @summary returns a single user document by _id
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.getUser = async function (req, res) {
  // get _id from request
  var id = req.params._id;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // execute the query
  User.findById(id, function (err, user) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(user);
    }
  });
};

/**
 * POST /api/users/:_id
 * @summary replaces a single user document with the Object provided
 * @param {_id} req
 * @body {document} - JSON Object which replaces the document in the database which
 * has the _id specified in the API call
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.replaceUser = async function (req, res) {
  // get user ObjectId from request
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

  // build the query to find the targeted user document
  var query = {
    _id: new ObjectId(id),
  };

  // build the query options to return the modified document on completion
  var options = { new: true };

  // hash the password passed into the API call
  const salt = await bcrpyt.genSalt(10);
  const password = await bcrpyt.hash(req.body.password, salt);
  replacement.password = password;

  // Execute the query
  User.findOneAndReplace(query, replacement, options, function (err, user) {
    // return 500 and error if something went wrong
    if (err) {
      res.status(500).send(err);
    } else {
      // all good, return 200 and the data
      res.status(200).send(user);
    }
  });
};

/**
 * DELETE /api/users/:_id
 * @summary deletes a single user document from the database
 * along with any associatons to cat documents the user has
 * @param {_id} req
 * @response 200 - OK
 * @response 500 - Error
 */
module.exports.deleteUser = async function (req, res) {
  // get user ObjectId from request
  var id = req.params._id;
  // create an instance of a mongoose ObjectId to be used in the query
  var ObjectId = mongoose.Types.ObjectId;

  // if the _id provided in the request isn't valid return an error
  if (!isValidObjectId(id)) {
    // no good, send a 500 and stop function execution
    res.status(500).send("Parameter is not a valid ObjectId");
    return;
  } // _id is valid - let's carry on

  // build the update query filter to loop through all cat documents by specifying an empty document
  var updateFilter = {};

  // build the update query to delete the userId association from any cat documents
  var updateQuery = { $pull: { users: { userId: new ObjectId(id) } } };

  // build the update query options to update multiple matched documents
  // and not upsert (i.e. create a new document if one doesn't exist)
  var updateOptions = { multi: true, upsert: false };

  // build the delete query to find the targeted user document
  var deleteQuery = { _id: new ObjectId(id) };

  // execute the update query - on success we'll then move on to delete the user
  Cat.updateMany(
    updateFilter,
    updateQuery,
    updateOptions,
    function (err, cats) {
      // return 500 and error if something went wrong with the update
      if (err) {
        res.status(500).send(err);
      } else {
        // all good, carry on to delete the user
        User.findByIdAndDelete(deleteQuery, function (err, user) {
          // return 500 and error if something went wrong with the deletion
          if (err) {
            res.status(500).send(err);
          } else {
            // all good, return 200 and the data
            res.status(200).send(user);
          }
        });
      }
    }
  );
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
