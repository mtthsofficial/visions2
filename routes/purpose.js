var express = require('express');
var router = express.Router();
var purposeController = require("../Controllers/purposeController")


/* GET home page. */
router.post('/', purposeController.index);


module.exports = router;
