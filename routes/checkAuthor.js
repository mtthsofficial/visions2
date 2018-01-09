var express = require('express');
var router = express.Router();
var checkAuthorizationController = require("../Controllers/checkAuthorizationController")


/* GET home page. */
router.post('/', checkAuthorizationController.checkAuthorization);

module.exports = router;