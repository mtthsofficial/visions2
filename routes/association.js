var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")
var associationModel = require("../Models/associationModel")
var unless = require('unless')


/* GET home page. */
router.post('/', function(req, res){
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
     user.Associations.push(req.body.association)
     user.save()
        
  unless(user.Data.FacebookWork.length==0 && user.Data.FacebookEducation.length==0 && user.Data.FacebookPosts.length==0 && user.Data.TwiiterPosts.length==0 && user.Data.GoogleDriveData.length==0 && user.Data.avalaible ==false, function (){ 
    
    associationModel.findOne({name : req.body.association}).exec(function(err, asso){
        if(err) console.log(err)
        
        asso.dataDonations += 1
        asso.save()
        
    })
    })
    })
});

module.exports = router;