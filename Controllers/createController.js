var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');


exports.index = function (req, res){
    let idUser = req.body.idUser;
let pw = req.body.password;
let email = req.body.email;

bcrypt.hash(pw, 10, function(err, hash) {
    if (err) console.log(err)
    User.create({name : idUser, password : hash, email : email}, function (err, user){
        if (err) {res.render('create', {message : 'Email invalide !'});}
        user.Wallet = 0.0
        user.save()
        res.cookie("userID", idUser).render('accueil')
    })
    
});

 




}