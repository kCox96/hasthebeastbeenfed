const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
   type: String, 
   required: true,
   min: 6, 
   max: 1024,
  },
});


// userSchema.methods.validPassword = function (password) {
//   var hash = crypto
//     .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
//     .toString("hex");
//   return this.hash === hash;
// };

// userSchema.methods.generateJwt = function () {
//   var expiry = new Date();
//   expiry.setDate(expiry.getDate() + 7);

//   return jwt.sign(
//     {
//       _id: this._id,
//       email: this.email,
//       name: this.name,
//       exp: parseInt(expiry.getTime() / 1000),
//     },
//     "MY_SECRET"
//   ); // DO NOT KEEP YOUR SECRET IN THE CODE!
// };

module.exports = mongoose.model("User", userSchema, "users");
