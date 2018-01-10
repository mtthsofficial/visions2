var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")

router.get('/', function(req,res){
userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
let noData = false 
if(user.Data.FacebookWork.length==0 && user.Data.FacebookEducation.length==0 && user.Data.FacebookPosts.length==0 && user.Data.TwiiterPosts.length==0 && user.Data.GoogleDriveData.length==0) {noData = true}


     res.render('echanger', {wallet : user.Wallet, payed1 : user.Payed.service1, payed2 : user.Payed.service2, payed3 : user.Payed.service3, noData : noData})
       
        
    })
})

module.exports = router;