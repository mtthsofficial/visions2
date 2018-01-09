var express = require('express');
var router = express.Router();
var google = require("../Controllers/googleController")
var FB = require('fb')

router.get('/', google.index); 



module.exports = router;