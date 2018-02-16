var express = require('express');
var setControler = require("../Controllers/setController")
var router = express.Router();

router.post('/', setControler.jollyClick);




module.exports = router;