var express = require('express');
var router = express.Router();
var service = require('../Models/ServiceModel')
var authorController = require('../Controllers/authorController')

router.post('/', authorController.index)

module.exports = router;