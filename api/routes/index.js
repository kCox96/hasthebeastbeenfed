var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("../controllers/authentication");
var ctrlCat = require("../controllers/cat");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// homepage route
router.get("/home", auth, ctrlProfile.profileRead);

// authentication routes
router.post("/signup", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

// cat routes
router.get("/api/cats/:userId", ctrlCat.getCats);
router.get("/api/cats/feeding/latest/:_id", ctrlCat.getLatestFeedingTime);
router.get("/api/cats/feeding/all/:_id", ctrlCat.getAllFeedingTimes);
router.post("/api/cats/:userId", ctrlCat.createCat);

router.put("/api/cats/users/:_id", ctrlCat.updateCatUsers);
router.put("/api/cats/feeding/:_id", ctrlCat.updateCatFeedingTimes);

router.delete("/api/cats/:_id", ctrlCat.deleteCat);

module.exports = router;
