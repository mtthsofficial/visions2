var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")
var associationModel = require("../Models/associationModel")



/* GET home page. */
router.post('/', function(req, res){
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        var donation = user.Wallet
        user.Wallet = 0
        user.save()

    
    associationModel.findOne({name : req.body.association}).exec(function(err, assoc){
        if(err) console.log(err)
        
        assoc.money += donation
        assoc.save()
        
    })
        
    })
});

module.exports = router;