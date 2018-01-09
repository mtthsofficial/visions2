var dataPurposeModel = require("../Models/DataPurposeModel")
var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');



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
                
               for (let y=0; y<req.body.data.length; y++){
                   if(req.body.data[y] != '')
                   service.Data.push(req.body.data[y])
               }
            
               async.eachSeries(dataArray, function iteratee(data, callback5){
                        c++ 
                   dataPurposeModel.create({data : data._id}, function(err, datapurp){
                       if (err) console.log(err)
                        service.DataUse.push(datapurp._id)
               
                
                    console.log(c)

                             console.log(purposeArray.length)
                 for (let d =0; d<purposeArray.length; d++){
                
                     datapurp.purpose.push(purposeArray[d]._id)
                      datapurp.save()
                 
                   
                }
                   
                               if (c == dataArray.length){
                       service.save()
                       res.render("admin", {message : "Nouvelles demandes envoyées!" })
                                   
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
}
       