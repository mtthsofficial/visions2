var express = require('express');
var create = require("../Controllers/createController")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('create');
});

router.post('/', function(req, res, next) {
  create.index(req, res)
});

module.exports = router;