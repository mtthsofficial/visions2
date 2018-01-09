var express = require('express');
var router = express.Router();
var userModel = require("../Models/UserModel")



/* GET home page. */
router.post('/', function(req, res){
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        console.log(user)
        console.log(parseInt(req.body.sum))
        console.log(req.body.service)
        user.Wallet = user.Wallet + parseInt(req.body.sum)/100
        
        if(req.body.service=="service1"){
            user.Payed.service1 = true
        }
        if(req.body.service=="service2"){
            user.Payed.service2 = true
        }
        if(req.body.service=="service3"){
            user.Payed.service3 = true
        }
        console.log(user.Wallet)
        console.log('payed')
        user.save() 

        
    })
});

module.exports = router;