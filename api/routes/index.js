
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256'],
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// homepage
router.get('/home', auth, ctrlProfile.profileRead);

// authentication
router.post('/signup', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;