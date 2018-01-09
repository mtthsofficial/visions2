var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")
var associationModel = require("../Models/associationModel")




/* GET home page. */
router.get('/', function(req, res){
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
     associationModel.findOne({name : "Amnesty"}).exec(function(err, asso){
         if(err) console.log(err)
         console.log(asso)
         let donations1 = asso.money
         let persons1 = asso.dataDonations
         
    associationModel.findOne({name : "WWF"}).exec(function(err, asso){
         if(err) console.log(err)
         console.log(asso)
         let donations2 = asso.money
         let persons2 = asso.dataDonations
         
         
         console.log(persons2)
          res.render('data4good', {wallet : user.Wallet, donations1 : donations1, persons1 : persons1, donations2 : donations2, persons2 : persons2})
         
     })
        
         
     })   
   
        
    })
});

module.exports = router;