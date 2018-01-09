var express = require('express');
var router = express.Router();
var twitterData = require("../Controllers/twitterDataController")



router.get('/' , twitterData.index) 
module.exports = router;