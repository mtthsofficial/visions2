var express = require('express');
var adminServiceController = require("../Controllers/adminServiceController")
var userModel = require("../Models/UserModel")
var router = express.Router();

/* GET home page. */
router.post('/', function(req,res){
    let serviceName = req.body.serviceName
    
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
        user.AskedServices.push(serviceName)
        user.save()
        
        res.render('controler')
        
    })
    
});


module.exports = router;