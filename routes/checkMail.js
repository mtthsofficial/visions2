var express = require('express');
var router = express.Router();
var checkAuthorizationController = require("../Controllers/checkAuthorizationController")
var userModel = require("../Models/UserModel")



/* GET home page. */
router.post('/', function(req,res){
    userModel.findOne({email : req.body.email}).exec(function(err, user){
        if(err) console.log(err)
        
        if(user == null){res.send(false)}
        else res.send(true)
        
    })
    
});

module.exports = router;