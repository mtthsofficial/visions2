var express = require('express');
var router = express.Router();
var userData = require('../Controllers/displayUserDataController')

router.post('/', userData.index)
module.exports = router;