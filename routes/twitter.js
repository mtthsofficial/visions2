var express = require('express');
var router = express.Router();
var twitter = require("../Controllers/twitterController")



router.get('/' , twitter.index) 
module.exports = router;