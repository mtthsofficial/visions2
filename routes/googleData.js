var express = require('express');
var router = express.Router();
var googleData = require("../Controllers/googleDataController")
var FB = require('fb')

router.get('/', googleData.index); 



module.exports = router;