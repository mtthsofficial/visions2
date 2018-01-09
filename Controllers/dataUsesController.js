var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');

exports.showUses = function (req, res){
  let idUser = req.body.idUser
  User.findOne({name: idUser}).exec(function(err, user){
            if (err) console.log(err)
// add logic to find causes attached to data 
  
    res.render('dataUses', {causes : user.availableData})
  }) 

}