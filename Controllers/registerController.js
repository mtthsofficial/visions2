var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');


exports.index = function (req, res){
    let userID = req.body.userID;
let pw = req.body.password;

//Register.registerUser(userID, pw);

    var servicesNames = []

User.findOne({name : userID}).exec(function (err, user){
    
    if (err) console.log(err)
    //check if user exists
    if (user == null) {res.render('Register', {message : 'Wrong ID or password!'});}
    //just for test purposes (didnt hash the test user)
    else{
    bcrypt.compare(pw, user.password, function(err, crypt) {
         if (err) console.log(err)
  if(crypt) {

    res.cookie("userID", userID).render('accueil')}
  else {
  res.render('Register', {message : 'Wrong ID or password!'})
  } 
});
    
  
    
   
}})
 




}
    
