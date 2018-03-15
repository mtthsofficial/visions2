var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('jollyclickRama');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.get('/entreprise', function(req, res, next) {
  res.render('jollyclickEntrepriseRama');
});


module.exports = router;