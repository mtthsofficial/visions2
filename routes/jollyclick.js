var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")



/* GET home page. */
router.get('/', function(req, res){
    res.render('jollyclick')
}

)

module.exports = router;