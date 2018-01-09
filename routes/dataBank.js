var express = require('express');
var router = express.Router();
var dataBankController = require("../Controllers/dataBankController")


/* GET home page. */
router.get('/', dataBankController.index);


module.exports = router;
