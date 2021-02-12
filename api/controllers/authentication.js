const bcrpyt = require("bcrypt")
const mongoose = require('mongoose');
const { signupValidation } = require("./validation");
const User = mongoose.model('User');

/**
 *  Registration controller
 */

// module.exports.register = function(req, res) {
//     var user = new User();
  
//     user.name = req.body.name;
//     user.email = req.body.email;
  
//     user.setPassword(req.body.password);
  
//     // Add error catching here 
//     user.save(function(err) {
//       var token;
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     });
  // };

  module.exports.createUser = async function (req, res) {
    var user = new User();
    const { error } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({error: error.details[0].message});
    }
    // pull params from request
    user.username = req.body.username;
    user.email = req.body.email;
    // hash the password
    const salt = await bcrpyt.genSalt(10);
    const password = await bcrpyt.hash(req.body.password, salt);
    user.password = password; 

    // save to the DB and return an error/success message to console
    const userData = await user.save(function (err, user) {
      // log error if present
      if (err) {
        res.status(400);
        res.send(err);
        return console.error(err);
        
      }
      // all good, return 200 and log success 
      res.status(200)
      // FOR DEBUGGING
      res.send("complete");
  
    });
  };

  /**
   * Get user controller
   */

  /**
   *  Login controller
   */

  module.exports.login = function(req, res) {

    // Add error catching / input validation here 
    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };