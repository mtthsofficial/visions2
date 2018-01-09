var express = require('express');
var adminServiceController = require("../Controllers/adminServiceController")
var router = express.Router();

/* GET home page. */
router.post('/', adminServiceController.createService);


module.exports = router;