var express = require('express');
var dataProffile = require("../Controllers/dataProfileController")

var router = express.Router();

/* GET home page. */
router.get('/', dataProffile.index);


module.exports = router;