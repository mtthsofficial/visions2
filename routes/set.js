var express = require('express');
var setControler = require("../Controlers/setController")
var router = express.Router();

router.post('/jollyclick', setControler.jollyClick);




module.exports = router;