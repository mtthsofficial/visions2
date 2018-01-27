var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")

router.get('/', function(req,res){
userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
let noData = false 
if(user.Data.FacebookWork.length==0 && user.Data.FacebookEducation.length==0 && user.Data.FacebookPosts.length==0 && user.Data.TwiiterPosts.length==0 && user.Data.GoogleDriveData.length==0 && user.Data.Personnel.Address==null && user.Data.Personnel.Gender==null && user.Data.Personnel.Birthday==null && user.Data.Professionnel.EducationLevel==null && user.Data.Professionnel.CurrentWork==null && user.Data.Professionnel.SchoolsAttended.length==0 && user.Data.Intime.Family==null && user.Data.Intime.Sexuality==null  && user.Data.Intime.Smoking==null && user.Data.Intime.MovieFav==null && user.Data.Intime.BookFav==null && user.Data.Intime.Religion==null) {noData = true}


     res.render('echanger', {wallet : user.Wallet, payed1 : user.Payed.service1, payed2 : user.Payed.service2, payed3 : user.Payed.service3, noData : noData})


    })
})

module.exports = router;