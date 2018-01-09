var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")

router.get('/', function(req,res){
userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)

     res.render('echanger', {wallet : user.Wallet, payed1 : user.Payed.service1, payed2 : user.Payed.service2, payed3 : user.Payed.service3,})
        
    })
})

module.exports = router;