var express = require('express');
var router = express.Router();
var facebookController = require("../Controllers/facebookController")
var FB = require('fb')

router.get('/', function(req, res){
    res.render('facebook') 
}); 

router.post('/', facebookController.index)



module.exports = router;