var express = require('express');
var router = express.Router();
var recupererController =  require("../Controllers/recupererController")

/* GET home page. */
router.get('/', recupererController.index);

module.exports = router;