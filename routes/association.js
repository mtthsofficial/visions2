var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")
var associationModel = require("../Models/associationModel")


/* GET home page. */
router.post('/', function(req, res){
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
     user.Associations.push(req.body.association)
     user.save()
        
    })
    
    associationModel.findOne({name : req.body.association}).exec(function(err, asso){
        if(err) console.log(err)
        
        asso.dataDonations += 1
        asso.save()
        
    })
    
    
});

module.exports = router;