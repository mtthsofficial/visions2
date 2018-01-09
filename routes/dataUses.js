var express = require('express');
var router = express.Router();
var dataUsesController = require("../Controllers/dataUsesController")


router.post('/', dataUsesController.showUses); 

module.exports = router;