var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');

exports.index = function (req, res){
    
let preferences1 = []
let preferences2 = []
let preferences3 = []
let idUser = req.body.userID

    
if (req.body.publicite1 == 'on')
{
    preferences1.push('on')
}
else
{
    preferences1.push('off')
}

if (req.body.publicite2 == 'on')
{
    preferences2.push('on')
}
else
{
    preferences2.push('off')
}

if (req.body.publicite3 == 'on')
{
    preferences3.push('on')
}
else
{
    preferences3.push('off')
}

if (req.body.recherche1 == 'on')
{
    preferences1.push('on')
}
else
{
    preferences1.push('off')
}

if (req.body.recherche2 == 'on')
{
    preferences2.push('on')
}
else
{
    preferences2.push('off')
}

if (req.body.recherche3 == 'on')
{
    preferences3.push('on')
}
else
{
    preferences3.push('off')
}

if (req.body.marketing1 == 'on')
{
    preferences1.push('on')
}
else
{
    preferences1.push('off')
}

if (req.body.marketing2 == 'on')
{
    preferences2.push('on')
}
else
{
    preferences2.push('off')
}

if (req.body.marketing3 == 'on')
{
    preferences3.push('on')
}
else
{
    preferences3.push('off')
}

if (req.body.personnalisation1 == 'on')
{
    preferences1.push('on')
}
else
{
    preferences1.push('off')
}

if (req.body.personnalisation2 == 'on')
{
    preferences2.push('on')
}
else
{
    preferences2.push('off')
}

if (req.body.personnalisation3 == 'on')
{
    preferences3.push('on')
}
else
{
    preferences3.push('off')
}

if (req.body.echange1 == 'on')
{
    preferences1.push('on')
}
else
{
    preferences1.push('off')
}

if (req.body.echange2 == 'on')
{
    preferences2.push('on')
}
else
{
    preferences2.push('off')
}

if (req.body.echange3 == 'on')
{
    preferences3.push('on')
}
else
{
    preferences3.push('off') 
}


 let dataNames = ['Email', "Genre", 'Formation']
    let purposeNames = ['Publicité', 'Recherche','Marketing', 'Personnalisation', 'Echange']
  
  
    
    async.series([getData, getPurposes, getService, getUser, createDataPurposes], 
        function(err, results){
        if (err) return console.log(err)
        console.log(results)
       
        
        authorization.create({user : results[3]._id, service : results[2]._id}, function (err, authorization){
             if (err) return console.log(err)
             
             console.log(authorization)
         
             
        async.series([function(callback7){
            for (let j =0; j<dataNames.length; j++){
                 
                results[4][j].data = results[0][j]._id
                
                
                
                results[4][j].save()
                
                if (j == dataNames.length-1){
                    console.log('function 1 :'+results[4])
                    callback7()}
                 
             }},function(callback8){
                 for (let r = 0; r<preferences1.length; r++){
                
                    if (preferences1[r]=='on'){
                       results[4][0].purpose.push(results[1][r]._id)
                       results[4][0].save()
                        
                    }     
                    
                     if (preferences2[r]=='on'){
                       results[4][1].purpose.push(results[1][r]._id)
                       results[4][1].save()
                        
                    } 
                    
                     if (preferences3[r]=='on'){
                       results[4][2].purpose.push(results[1][r]._id)
                       results[4][2].save()
                        
                    } 
                    
                    if(r == preferences1.length-1){
                        console.log('function 2 :'+results[4]._id)
                        callback8()}
                     
                 }
                 
             }], function(err, results2){
                 if (err) return console.log(err)
                 for (let g=0; g<results[4].length; g++){
                      authorization.authorizations.push(results[4][g]._id) 
                    
                      
                      if (authorization.authorizations.length==results[4].length){
                          console.log('authorization :'+authorization)
                          results[3].authorizations.push(authorization._id)
                            authorization.save()
                          console.log('user :'+results[3])
                          results[3].save()
                          res.render('servicesSimulation', {idUser : idUser})
                      }

                 }
                 
                 
                 
             })
            
        })
        
        
    })
    
    function getUser(callback6){
    userModel.findOne({name : idUser}, function (err, user){
        if (err) console.log(err)
     console.log(user)
        callback6(null, user)
    })
    
    
}
    
    function getData(callback1){
          let datas = []
          console.log(datas)
        for(let i =0; i<dataNames.length; i++){
            
        dataModel.findOne({name : dataNames[i]}).exec(function(err, data) {
            if (err) return console.log(err)
            
            if (data == null){
                data = new purposeModel({name : dataNames[i]})
                     data.save()
                     datas.push(data)
                
            }
            datas.push(data)
            
            if(dataNames.length==datas.length){
            
                callback1(null, datas)}
        
        })
            
    }
    
}

    function getPurposes(callback2){
        
            let purposes = []
            console.log(purposes)
        for(let i =0; i<purposeNames.length; i++){
            
        purposeModel.findOne({name : purposeNames[i]}).exec(function(err, purpose) {
            if (err) return console.log(err)
            
            if (purpose == null){
                purpose = new purposeModel({name : purposeNames[i]})
                     purpose.save()
                     purposes.push(purpose)
                
            }
            purposes.push(purpose)
            
            if(purposeNames.length==purposes.length){
    
                callback2(null, purposes)}
        
        })
            
    }
    
}

function getService(callback4){

    services.findOne({name : 'Prefered'}).exec(function(err, service) {
   
          if (err) return console.log(err)
console.log(service)
         callback4(null, service)
          
    })
    
}

function createDataPurposes(callback5){
    let authorizations = []
    console.log(authorizations)
    
    for (let i = 0; i<dataNames.length; i++){
            dataPurposeModel.create({}, function(err, datapurp){
                 if (err) return console.log(err)
                 authorizations.push(datapurp)
                console.log(authorizations)
                if (dataNames.length == authorizations.length){
                   console.log(authorizations)
                    callback5(null, authorizations)
                }
                
            })
            
        }
    
    
}

}