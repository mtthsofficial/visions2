var Authorization = require("../Models/AuthorizationModel")
var User = require("../Models/UserModel")
var Service = require("../Models/ServiceModel")
var Data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")
var testDB = require('../Models/testDBModel');
var DataPurpose = require('../Models/DataPurposeModel')
var jollyclick = require('../Models/jollyclickModel')
var async = require('async')
var aesjs = require('aes-js');


exports.setAuthor = function(req, res){
let userID = JSON.parse(req.body.userID)
let serviceName = req.body.serviceName 
let authorization = JSON.parse(req.body.authorization)
let dataName = authorization.data
let userVar;
let serviceVar
let dataVar

let purposeName = authorization.purpose

sendData(req, res, purposeName)

console.log('settingAuthor')




async.series([getUser, getService, getData], function(err, results){
    if(err) console.log(err)

    
    Purpose.findOne({name : purposeName}).exec(function(err, purpose){
        if(err) console.log(err)
    
    DataPurpose.create({data : dataVar._id, purpose : purpose._id}, function(err, datapurp){
        if(err) console.log(err)

    Authorization.findOne({user : userVar._id, service : serviceVar._id}).exec(function(err, authorization){
        if(err) console.log(err)
        

        if(authorization==null){
            Authorization.create({user : userVar._id, service : serviceVar._id}, function(err, authorization2){
                if(err) console.log(err)
                
                authorization2.authorizations.push(datapurp._id)            
                userVar.authorizations.push(authorization2._id)
                userVar.save()
                authorization2.save()
                return authorization2
                
            })
            
        }else{

            authorization.authorizations.push(datapurp._id)

            for(let i=0; i<userVar.authorizations.length;i++){
                
            if(userVar.authorizations[i].toString()==authorization._id.toString()){
                
                
                
}
            else{
            userVar.authorizations.push(authorization._id) 
            userVar.save()
            authorization.save()
            return authorization
            }
                
            }

        }
            
        
    })
    
    
    
    
    })
    

    
})    })



function getUser(callback1)  {
    User.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        
        userVar = user
        callback1(err, user)
        
    })
    
    
}

function getService(callback2) {
    
        Service.findOne({name : serviceName}).exec(function(err, service){
        if(err) console.log(err)
        serviceVar = service
        callback2(err, service._id)
        
    })
}

function getData(callback3){
    
    Data.findOne({name : dataName}).exec(function(err, data){
        if(err) console.log(err)
        dataVar = data

        callback3(data._id)
        
    })
    
    
}



}

function sendData(req,res, purposeName){
    let userID = JSON.parse(req.body.userID)
let serviceName = req.body.serviceName 
let authorization = JSON.parse(req.body.authorization)
let dataName = authorization.data
console.log(dataName)
console.log('SENDING DATA')
var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    //1. get and decrpyt data
 
if(dataName=='Location'){
    
        User.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        let data = user.Data.Location
        console.log(data)
        
        var encryptedDataBytes = aesjs.utils.hex.toBytes(data);
   var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.

var decryptedDataBytes = aesCtr.decrypt(encryptedDataBytes);

// Convert our bytes back into text
var decryptedDataText = aesjs.utils.utf8.fromBytes(decryptedDataBytes);
console.log(decryptedDataText)

let serviceUserName = user.userNames.Test 

if(purposeName=="Publicité"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Publicite.Location = decryptedDataText
    userService.save()
    console.log(decryptedDataText)
    console.log('DATA SENT')
    
})}

if(purposeName=="Marketing"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Marketing.Location = decryptedDataText
    userService.save()
    console.log(decryptedDataText)
    console.log('DATA SENT')
    
})}

if(purposeName=="Personnalisation"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Personnalisation.Location = decryptedDataText
    userService.save()
    console.log(decryptedDataText)
    console.log('DATA SENT')
    
})}

if(purposeName=="Recherche"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Recherche.Location = decryptedDataText
    userService.save()
    console.log(decryptedDataText)
    console.log('DATA SENT')
    
})}
            
            
            
        })}
if(dataName=='Education'){
    
        User.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        let education = user.Data.Education
        
        let educationFinal = []
        
        for(let i =0; i<education.length; i++){
            
            var encryptedSchoolBytes = aesjs.utils.hex.toBytes(education[i].school)
            var encryptedLevelBytes = aesjs.utils.hex.toBytes(education[i].level)
            
            var aesCtrSchool = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var aesCtrLevel = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var decryptedSchoolBytes = aesCtrSchool.decrypt(encryptedSchoolBytes);
            var decryptedLevelBytes = aesCtrLevel.decrypt(encryptedLevelBytes);
            
            var decryptedSchoolText = aesjs.utils.utf8.fromBytes(decryptedSchoolBytes);
            var decryptedLevelText = aesjs.utils.utf8.fromBytes(decryptedLevelBytes);
            
            let serviceUserName = user.userNames.Test 
            
            educationFinal.push({school : decryptedSchoolText, level : decryptedLevelText})
            
            if(i==education.length-1){

if(purposeName=="Publicité"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Publicite.Education = educationFinal
    userService.save()
    console.log(educationFinal)
    console.log('DATA SENT')
    
})}
                
if(purposeName=="Marketing"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Marketing.Education = educationFinal
    userService.save()
    console.log(educationFinal)
    console.log('DATA SENT')
    
})}


if(purposeName=="Personnalisation"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Personnalisation.Education = educationFinal
    userService.save()
    console.log(educationFinal)
    console.log('DATA SENT')
    
})}


if(purposeName=="Recherche"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Recherche.Education = educationFinal
    userService.save()
    console.log(educationFinal)
    console.log('DATA SENT')
    
})}
            }
            
            
        }
        
        
        
        })
    
    
    
}

if(dataName=='Work'){
    
    
    User.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        let work = user.Data.Work
        
        let workFinal = []
        
        for(let i =0; i<work.length; i++){
  
            var encryptedEmployerBytes = aesjs.utils.hex.toBytes(work[i].employer)
            var encryptedPositionBytes = aesjs.utils.hex.toBytes(work[i].position)
            var aesCtrEmployer = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var aesCtrPosition = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

            var decryptedEmployerBytes = aesCtrEmployer.decrypt(encryptedEmployerBytes);
            var decryptedPositionBytes = aesCtrPosition.decrypt(encryptedPositionBytes);
            
            var decryptedEmployerText = aesjs.utils.utf8.fromBytes(decryptedEmployerBytes);
            var decryptedPositionText = aesjs.utils.utf8.fromBytes(decryptedPositionBytes);
            
            let serviceUserName = user.userNames.Test 
            
            workFinal.push({employer : decryptedEmployerText, position : decryptedPositionText})
            
            if(i==work.length-1){
                
if(purposeName=="Recherche"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Recherche.Work = workFinal
    console.log(workFinal)
    userService.save()
    console.log('DATA SENT')
    
})}
                
if(purposeName=="Personnalisation"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Personnalisation.Work = workFinal
    console.log(workFinal)
    userService.save()
    console.log('DATA SENT')
    
})}

if(purposeName=="Marketing"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Marketing.Work = workFinal
    console.log(workFinal)
    userService.save()
    console.log('DATA SENT')
    
})}

if(purposeName=="Publicité"){

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Publicite.Work = workFinal
    console.log(workFinal)
    userService.save()
    console.log('DATA SENT')
    
})}
                
            }
            
            
        }
        
        
        
        })
    
    
}

if(dataName=='Relationship'){
    User.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        let data = user.Data.Relationship
        console.log(data)
        
        var encryptedDataBytes = aesjs.utils.hex.toBytes(data);

// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
   var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedDataBytes = aesCtr.decrypt(encryptedDataBytes);

// Convert our bytes back into text
var decryptedDataText = aesjs.utils.utf8.fromBytes(decryptedDataBytes);
console.log(decryptedDataText) 

let serviceUserName = user.userNames.Test 

testDB.findOne({name: serviceUserName}).exec(function(err, userService){
    if(err) console.log(err)
    
    userService.Relationship = decryptedDataText
    userService.save()
    console.log(decryptedDataText)
    console.log('DATA SENT')
    
})
            
            
            
        })
}
    

    
}