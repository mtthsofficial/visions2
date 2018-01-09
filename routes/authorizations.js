var express = require('express');
var authorizationController = require("../Controllers/authorizationsController")
var router = express.Router();

/* GET home page. */
router.post('/', authorizationController.index);


module.exports = router;