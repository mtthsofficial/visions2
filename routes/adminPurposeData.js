var express = require('express');
var router = express.Router();
var adminPurposeDataController = require("../Controllers/adminPurposeDataController")


router.get('/', function(req, res){
    res.render('adminPurposeData')
});

router.post('/', adminPurposeDataController.index);

module.exports = router;