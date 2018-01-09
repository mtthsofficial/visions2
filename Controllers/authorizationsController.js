var dataPurposeModel = require("../Models/DataPurposeModel")
var serviceModel = require("../Models/ServiceModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
let causeModel = require("../Models/CauseModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');


//need to make sure userID is passed to this request !!!


exports.index = function (req, res){
    
    let serviceName = req.body.serviceName
    let serviceObject
  let AuthorizationsArray =[] 
  
  
async.series([getService, getAuthorizations], function(err, results){
    if(err) console.log(err)
    
    
})



function getService(callback){
    serviceModel.findOne({name : serviceName}).exec(function(err, service){
         if(err) console.log(err)
         serviceObject = service
         callback(err, service)
        
    })
    
    
}

function getAuthorizations(callback2){
    authorization.find({service : serviceObject._id}).populate('user').populate('authorizations').exec(function(err, authorizations){
  if(err) console.log(err)
  console.log('authorizations '+authorizations)
  let dataNamesArray = []
  let purposeNamesArray = []
console.log(authorizations)
  
  for(let i=0; i<authorizations.length; i++){

      
      let userName = authorizations[i].user.name
      
      for(let j=0; j<authorizations[i].authorizations.length;j++){
          dataModel.findById(authorizations[i].authorizations[j].data).exec(function(err, data){
              if(err) console.log(err)
              
              dataNamesArray.push(data.name)
              
 
                for(let h =0; h<authorizations[i].authorizations[j].purpose.length;h++){
                    
                   purposeModel.findById(authorizations[i].authorizations[j].purpose[h]).exec(function(err, purpose){
                       if(err) console.log(err)
                       let tempPurposeArray = []
                       
                       tempPurposeArray.push(purpose.name)
                       
                       if(h==authorizations[i].authorizations[j].purpose.length-1){
                       
                       purposeNamesArray.push(tempPurposeArray)}
       if(j==authorizations[i].authorizations.length-1){
                AuthorizationsArray.push({user : userName, data: dataNamesArray, purposes : purposeNamesArray})
                console.log('DATA'+AuthorizationsArray[0].data)
            }
            if(i==authorizations.length-1 && AuthorizationsArray.length==authorizations.length){

          res.render('authorizations', {authorizationsArray : AuthorizationsArray})
      }
                       
                   })
                
                
            }
           
              
          })
          
      }
      

      
      
      
      //authorizationsArray.push({user : , data: [], purposes : [[]]})
  }
  

})
    
}
    
    
}