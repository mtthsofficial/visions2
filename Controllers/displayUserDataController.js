var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
var testDB = require('../Models/testDBModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');

exports.index = function (req, res){
    
    // CHANGE FROM TEST TO DO WITH ALL USERS
    let serviceName = req.body.serviceName
    
    let purposeName = req.body.purposeName
    
    testDB.findOne({username : 'testuser'}).exec(function(err, user){
        if(err) console.log(err)
        
        if(purposeName=="Publicité"){
            res.render('displayUserData', {userID: user.username, data : user.Publicité})
        }
        if(purposeName=="Marketing"){
            res.render('displayUserData', {userID: user.username, data : user.Marketing})
        }
        if(purposeName=="Recherche"){
            res.render('displayUserData', {userID: user.username, data : user.Recherche})
        }        
        if(purposeName=="Personnalisation"){
            res.render('displayUserData', {userID: user.username, data : user.Personnalisation, purposeName: purposeName})
        }        
        
    })
    
    
    
    
/*
let users = []
let usersData = []
var cleanedArray = []


async.series([getUsers, getUsersData, cleanArray], function(err, results){
    if(err) console.log(err)
    console.log(results) 
    res.render('displayUserData', {availableData : ['Politique', 'Navigation', 'Sexualité']})
    
})


function getUsers(callback){
    services.findOne({name : req.body.serviceName}).populate('users').exec(function(err, service){
        if(err) console.log(err)
        console.log(service)
        
        for (let i = 0; i<service.users.length; i++){
            users.push(service.users[i])
            
            if(i==service.users.length-1){
                callback(users)
            }
            
        }
        
        
    })
    
    
    
}

function getUsersData(callback2){
    for(let j=0; j<users.length; j++){
    userModel.findOne({name : users[j].name}).populate('availableData').exec(function(err, user){
        if(err) console.log(err)
        console.log(user)
        
        for (let k = 0; k<user.availableData.length;k++){
            dataModel.findById(user.availableData[k], function(err, data){
                console.log(data)
                if(err) console.log(err)
                
        usersData.push(data.name)})
        }
        if(j == users.length-1){
            console.log(usersData)
            callback2}
    })
    
    }
}

function cleanArray(callback3){

    services.findOne({name : req.body.serviceName}).exec(function(err, service){
       if(err) console.log(err)
       removeDuplicates(usersData)
       for (let u =0; u<service.Data.length; u++){
        cleanedArray = usersData.filter(function(data){
            if (data != service.Data[u]){
                return data
            }
            if(u == service.Data.length-1){
                removeDuplicates(cleanedArray)
                console.log(cleanedArray)
                callback3(cleanedArray)
            }
        })
}
           
       }
       
        
    )}
    
function removeDuplicates(num) {
  var x,
      len=num.length,
      out=[],
      obj={};
 
  for (x=0; x<len; x++) {
    obj[num[x]]=0;
  }
  for (x in obj) {
    out.push(x);
  }
  return out;
}
    
    */

    
    
}

