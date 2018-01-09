var dataPurposeModel = require("../Models/DataPurposeModel")
let services = require("../Models/ServiceModel")
let User = require("../Models/UserModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
var mongoose = require('mongoose');
var testDB = require('../Models/testDBModel');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');

exports.createService = function (req, res){

    let name = req.body.name;
    let purposeNamesArray = req.body.purpose;
    let dataNamesArray = req.body.data;
    
    let purposeNames = []
    let dataNames = []

    
    let dataArray = []
    let purposeArray = []
    
    
   async.series([splitArrays,
       getData,
       createPurposes
       ],
       function (err, results){

            if (err) console.log(err)
  

            services.create({name : name, Data : dataNames, Purposes : purposeNames}, function(err, service){
                
                if (err) console.log(err)
                let c =0;
               User.findOne({name : 'testuser'}).exec(function(err, user){
                    if (err) console.log(err)
                    
                    user.services.push(service._id)
                    user.save() 
                })
            
               async.eachSeries(dataArray, function iteratee(data, callback5){
                        c++ 
                   dataPurposeModel.create({data : data._id}, function(err, datapurp){
                       if (err) console.log(err)
                        service.DataUse.push(datapurp._id)
               
                
                    console.log(c)
                    console.log("DP N"+c+" just data :"+datapurp) 
                   
                             console.log(purposeArray.length)
                 for (let d =0; d<purposeArray.length; d++){
                
                     datapurp.purpose.push(purposeArray[d]._id)
                   console.log("DP N"+c+" data and purpose :"+datapurp) 
                      datapurp.save()
                 
                   
                }
                   
                               if (c == dataArray.length){
                       service.save()
                       res.render("admin", {message : "Nouveau service enregistré!" })
                                   
                               }
                callback5()
            })})})})
       
    
function splitArrays(callback8){


           for(var i=0; i<purposeNamesArray.length;  i++) {
    if(purposeNamesArray[i] !== "") {
       
       purposeNames.push(purposeNamesArray[i])
       console.log(purposeNames)
    }
               
           }
             
    
    
           
       for(var j=0; j< dataNamesArray.length ; j++) {
    if(dataNamesArray[j] !== "") {
    dataNames.push(dataNamesArray[j])
    console.log(dataNames)
   

    }
     if(j==dataNamesArray.length-1){callback8()}
    
          
       }
         
        
}  
       
function getData(callback4){
  
   async.eachSeries(dataNames, function iteratee(dataName, callback3){
       console.log(dataName)
    
       dataModel.findOne({name : dataName}, function(err, data) {
             if (err) console.log(err)
                if (data == null && dataName !== "")
                {
                  data = new dataModel({name : dataName})
                  data.save()
                  dataArray.push(data)
                }
               
                else 
                {
                    dataArray.push(data)

                }
                 if (dataArray.length == dataNames.length){

            callback4()}
                callback3()
        })
       
       
   })}



function createPurposes(callback){

   
   async.eachSeries(purposeNames, function iteratee(purposeName, callback2){

       
                
        purposeModel.findOne({name : purposeName}, function(err, purpose){
            
            if (err) console.log(err)
                if (purpose == null && purposeName !== "")
                {
                     purpose = new purposeModel({name : purposeName})
                     purpose.save()
                     purposeArray.push(purpose)
                }
               
               else if (purposeName !== "")
               {
                   purposeArray.push(purpose)

               }
               if (purposeArray.length == purposeNames.length){

        callback()}
               callback2()
        })
    
    
})}
}

exports.updateService = function (req, res){

    let name = req.body.name;
    let purposeNamesArray = req.body.purpose;
    let dataNamesArray = req.body.data;
    
    let purposeNames = []
    let dataNames = []

    
    let dataArray = []
    let purposeArray = []
    
    
   async.series([splitArrays,
       getData,
       createPurposes
       ],
       function (err, results){

            if (err) console.log(err)
  

            services.findOne({name : name}, function(err, service){
                if (err) console.log(err)
                let c =0;
               
            
               async.eachSeries(dataArray, function iteratee(data, callback5){
                        c++ 
                   dataPurposeModel.create({data : data._id}, function(err, datapurp){
                       if (err) console.log(err)
                        service.DataUse.push(datapurp._id)
               
                
                    console.log(c)
                    console.log("DP N"+c+" just data :"+datapurp) 
                   
                             console.log(purposeArray.length)
                 for (let d =0; d<purposeArray.length; d++){
                
                     datapurp.purpose.push(purposeArray[d]._id)
                   console.log("DP N"+c+" data and purpose :"+datapurp) 
                      datapurp.save()
                 
                   
                }
                   
                               if (c == dataArray.length){
                       service.save()
                       res.render("admin", {message : "Nouveau service enregistré!" })
                                   
                               }
                callback5()
            })})})})
       
    
function splitArrays(callback8){


           for(var i=0; i<purposeNamesArray.length;  i++) {
    if(purposeNamesArray[i] !== "") {
       
       purposeNames.push(purposeNamesArray[i])
       console.log(purposeNames)
    }
               
           }
             
    
    
           
       for(var j=0; j< dataNamesArray.length ; j++) {
    if(dataNamesArray[j] !== "") {
    dataNames.push(dataNamesArray[j])
    console.log(dataNames)
   

    }
     if(j==dataNamesArray.length-1){callback8()}
    
          
       }
         
        
}  
       
function getData(callback4){
  
   async.eachSeries(dataNames, function iteratee(dataName, callback3){
       console.log(dataName)
    
       dataModel.findOne({name : dataName}, function(err, data) {
             if (err) console.log(err)
                if (data == null && dataName !== "")
                {
                  data = new dataModel({name : dataName})
                  data.save()
                  dataArray.push(data)
                }
               
                else 
                {
                    dataArray.push(data)

                }
                 if (dataArray.length == dataNames.length){

            callback4()}
                callback3()
        })
       
       
   })}



function createPurposes(callback){

   
   async.eachSeries(purposeNames, function iteratee(purposeName, callback2){

       
                
        purposeModel.findOne({name : purposeName}, function(err, purpose){
            
            if (err) console.log(err)
                if (purpose == null && purposeName !== "")
                {
                     purpose = new purposeModel({name : purposeName})
                     purpose.save()
                     purposeArray.push(purpose)
                }
               
               else if (purposeName !== "")
               {
                   purposeArray.push(purpose)

               }
               if (purposeArray.length == purposeNames.length){

        callback()}
               callback2()
        })
    
    
})}
}
       


    

    /*
    services.create({name : name, Data : dataNamesArray, Purposes : purposeNamesArray}).then(function(service){ 
            
        var promise1 = new Promise(function (resolve, reject){
            for (let a = 0; a<dataNamesArray.length; a++){
    
                dataModel.findOne({name : dataNamesArray[a]}, function(err, data){
                     if (err) console.log(err)
                        if (data == null && dataNamesArray[a] !== "")
                        {
                         data = new dataModel({name : dataNamesArray[a]})
                          data.save()
                          dataArray.push(data)
                          if (dataArray.length == dataNamesArray.length){resolve(dataArray)}
                        }
                       
                        else {
                            dataArray.push(data)
                            if (dataArray.length == dataNamesArray.length){resolve(dataArray)}
                        }
                        
                        
                })
            }})
            
            var promise2 = new Promise(function (resolve, reject){
    
            for (let b = 0; b<purposeNamesArray.length; b++){
                
                purposeModel.findOne({name : purposeNamesArray[b]}, function(err, purpose){
                     if (err) console.log(err)
                        if (purpose == null && purposeNamesArray[b] !== "")
                        {
                         purpose = new purposeModel({name : purposeNamesArray[b]})
                          purpose.save()
                          purposeArray.push(purpose)
                          if (purposeArray.length == purposeNamesArray.length){resolve(purposeArray)}
                        }
                       
                       else{
                           purposeArray.push(purpose)
                           if (purposeArray.length == purposeNamesArray.length){resolve(purposeArray)}
                       }
                })
                
            }})
            promise1.then(function(array1){
            promise2.then(function(array2){
             
                for (let c = 0; c<array1.length; c++){
                
               dataPurposeModel.create({data : array1[c]._id}).then(function(datapurp){
                        service.DataUse.push(datapurp._id)
                        service.save()
                        return datapurp}).then(function(datapurp){
               
                     
                         for (let d =0; d<array2[d].length; d++){
                        
                        datapurp.purpose.push(array2[d]._id)
                         datapurp.save()
                         console.log(datapurp)
                    }
                   
                 
                     })
                    
                }})
            
                
            })
                    
            
    
           
                })
            
        }




*/












/*

for (let a = 0; a<dataNamesArray.length; a++){
    
dataModel.findOne({name : dataNamesArray[a]}, function(err, data){
    if (err) console.log(err)
    if (data == null){
        data = new dataModel({name : dataNamesArray[a]})
       
    }
     data.save()
    dataArray.push(data)
})

}*/