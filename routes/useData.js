var express = require('express');
var router = express.Router();
var authorization = require('../Controllers/setAuthorController')

router.get('/', function(req, res, next) {
  res.render('useData') 
});
module.exports = router;