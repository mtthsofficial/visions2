var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');


exports.index = function (req, res){
  let idUser = req.body.idUser
  User.findOne({name: idUser}).exec(function(err, user){
      if (err) console.log(err)
    res.render('dataBank', {availableData : user.availableData})
  })

}


