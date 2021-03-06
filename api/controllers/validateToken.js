const jwt = require("jsonwebtoken");
// middleware to validate token
module.exports.verifyToken = (req, res, next) => {
  // if user is unauthorised throw error
  const token = req.header("auth-token");
  if (!token) {
    res.send("Access denied: no authorisation");
    res.status(401);
    return console.error(err);
  }

  // verify token and secret
  try {
    const verfied = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // continue flow
    next();
    // throw error if token not valid
  } catch (err) {
    res.send("Token is not valid");
    res.status(400);
    return console.error(err);
  }
};
