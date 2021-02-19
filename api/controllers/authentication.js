const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const { signupValidation, loginValidation } = require("./validation");
const User = mongoose.model('User');

/**
 *  Registration controller
 */
  module.exports.createUser = async function (req, res) {
    var user = new User();
    // validate input
    const { error } = signupValidation(req.body);
    // throw validation errors 
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
    await user.save(function (err, user) {
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
   *  Login controller
   */
   module.exports.login =  async function(req, res) {
     // validate input 
     const { error } = loginValidation(req.body);
     if (error) {
       return res.status(400).json({error: error.details[0].message});
     }
     // search database for user using email
     const user = await User.findOne({email: req.body.email});
     // if can't find user return error
     if (!user) return res.status(400).json({ error: "Email is wrong" });


     // check password is valid 
     const validPassword = await bcrpyt.compare(req.body.password, user.password);
     // if password isn't valid, return error
      if (!validPassword)
      return res.status(400).json({ error: "Password is wrong" });

     // all good, return 200 and log success
    //  res.json({
    //   error: null,
    //   data: {
    //     message: "Login successful",
    //   },
    // });

     // create jwt token
     const token =  jwt.sign(
       // payload data
       {
         name: user.username,
         id: user._id,
       },
       process.env.TOKEN_SECRET,
       { expiresIn: '30s'}
     

     );

     // set token session in the HTTP Response body
//       res.status(200).json({
//       idToken: jwtBearerToken, 
//       expiresIn: 300
// });

     res.header("auth-token", token).json({
       error: null,
       // FOR DEBUGGING - REMOVE BEFORE SUBMIT
       data : {
         token,
       }
     });

   };

