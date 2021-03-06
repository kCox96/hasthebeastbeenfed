var express = require("express");
var router = express.Router();

var ctrlAuth = require("../controllers/authentication");
var ctrlCat = require("../controllers/cat");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// authentication routes
router.post("/api/signup", ctrlAuth.createUser);
router.post("/api/login", ctrlAuth.login);

// user routes
router.get("/api/users/:_id", ctrlAuth.getUser);

router.post("/api/users/:_id", ctrlAuth.replaceUser);

router.delete("/api/users/:_id", ctrlAuth.deleteUser);

// cat routes
router.get("/api/cats/:userId", ctrlCat.getCats);
router.get("/api/cat/:_id", ctrlCat.getCat);
router.get("/api/cats/feeding/latest/:_id", ctrlCat.getLatestFeedingTime);
router.get("/api/cats/feeding/all/:_id", ctrlCat.getAllFeedingTimes);

router.post("/api/cats/:userId", ctrlCat.createCat);
router.post("/api/cats/replace/:_id", ctrlCat.replaceCat);

router.put("/api/cats/users/:_id", ctrlCat.updateCatUsers);
router.put("/api/cats/feeding/:_id", ctrlCat.updateCatFeedingTimes);

router.delete("/api/cats/:_id", ctrlCat.deleteCat);

module.exports = router;
