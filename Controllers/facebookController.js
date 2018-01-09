var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
var FB = require('fb')
var aesjs = require('aes-js');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');


exports.index = function (req, res){
    FB.setAccessToken(req.body.token)

User.findOne({name : req.cookies.userID}).exec(function(err, user){
    if (err) console.log(err)
    
    
    
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];



// The counter is optional, and if omitted will begin at 1


// To print or store the binary data, you may convert it to hex

    
    
    FB.api('/me?fields=photos,location,relationship_status,education{school},work{employer,position},religion', function(response) {
    console.log(response)
    
    var aesCtrLocation = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var encryptedLocation = aesCtrLocation.encrypt(aesjs.utils.utf8.toBytes(response.location.name));
var encryptedLocationHex = aesjs.utils.hex.fromBytes(encryptedLocation);
var aesCtrRelationship = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var encryptedRelationship = aesCtrRelationship.encrypt(aesjs.utils.utf8.toBytes(response.relationship_status));
var encryptedRelationshipHex = aesjs.utils.hex.fromBytes(encryptedRelationship);
 
 
var aesCtrReligion = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var encryptedReligion = aesCtrReligion.encrypt(aesjs.utils.utf8.toBytes(response.religion));
var encryptedReligionHex = aesjs.utils.hex.fromBytes(encryptedReligion);   
    
    user.Data.FacebookLocation = encryptedLocationHex
    user.Data.FacebookRelationship = encryptedRelationshipHex
    user.Data.FacebookReligion = encryptedReligionHex
    user.save()
console.log(response.work)
for(let u=0; u<response.work.length;u++){
    var aesCtrEmployer = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedEmployer = aesCtrEmployer.encrypt(aesjs.utils.utf8.toBytes(response.work[u].employer.name))
    
    
    console.log(aesjs.utils.utf8.toBytes(response.work[u].employer.name))
    console.log(response.work[u].employer.name)
    var encryptedEmployerHex = aesjs.utils.hex.fromBytes(encryptedEmployer);
    console.log(encryptedEmployerHex)
    var aesCtrPosition = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedPosition = aesCtrPosition.encrypt(aesjs.utils.utf8.toBytes(response.work[u].position.name))
    var encryptedPositionHex = aesjs.utils.hex.fromBytes(encryptedPosition);
    user.Data.FacebookWork.push({employer : encryptedEmployerHex, position : encryptedPositionHex}) 
        if(u==response.work.length-1){
            user.save()
        }
}
    
    for(let i=0; i<response.education.length; i++){
        var aesCtrSchool = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedSchool = aesCtrSchool.encrypt(aesjs.utils.utf8.toBytes(response.education[i].school.name))
        var encryptedSchoolHex = aesjs.utils.hex.fromBytes(encryptedSchool);
        var aesCtrLevel = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedLevel = aesCtrLevel.encrypt(aesjs.utils.utf8.toBytes(response.education[i].type))
        var encryptedLevelHex = aesjs.utils.hex.fromBytes(encryptedLevel);
        
        user.Data.FacebookEducation.push({school : encryptedSchoolHex, level : encryptedLevelHex})
        if(i==response.education.length-1){
            user.save()
        }
    }
    //res.send() 
    
    
})
    
    
    
})

    
    
    
}