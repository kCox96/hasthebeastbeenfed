
const mongoose = require('mongoose');
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
    console.log("breakpoint");
    var user = new User();
    // pull params from request
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password; 
    // save to the DB and return an error/success message to console
    
    user.save(function (err, user) {
      // log error if present
      if (err) {
        res.status(400);
        res.send(err);
        console.log("error log");
        return console.error(err);
        
      }
      // all good, return 200 and log success 
      res.status(200)
      res.send("Complete");
  
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