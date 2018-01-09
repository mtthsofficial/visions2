var express = require('express');
var user = require("../Controllers/userPreferencesController")
var registerDataController = require("../Controllers/registerDataController")
var router = express.Router();

/* GET home page. */
router.post('/', registerDataController.index)

module.exports = router;