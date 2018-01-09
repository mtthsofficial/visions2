var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
let purposeDataModel = require("../Models/PurposeDataModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async'); 

exports.index = function (req, res){ 
    
    let service = {}
    
    async.series([getService, getData, getPurpose], function(err, results){
        if (err) console.log(err)
        console.log(results)
        
        purposeDataModel.create({data : results[1], purpose : results[2]._id, explanation : req.body.explanation, 
        revenue : req.body.revenue, control : req.body.control, service : results[0]._id
        }) 
        
        res.render('adminPurposeData', {message : 'Enregistré!'}); 
        
        
    })
    
function getService(callback){
    services.findOne({name : req.body.serviceName}).exec(function(err, service1){
        if (err) console.log(err)
        
        service = service1;
        
        callback(err, service1)

    })
    
}






function getData(callback2){
    let dataArray = [];
    
    for(let i=0; i<service.Data.length;i++){
        dataModel.findOne({name : service.Data[i]}).exec(function(err, data){
            if (err) console.log(err) 
            dataArray.push(data._id)
            
            if(i==service.Data.length-1){
                
                callback2(err, dataArray) 
            }
        })
        
        
    }
    
    
}


function getPurpose(callback3){
    purposeModel.findOne({name : req.body.purposeName}).exec(function(err, purpose){
        if (err) console.log(err)
        
        if(purpose == null){
            purposeModel.create({name : req.body.purposeName}, function(err, purpose){
                if (err) console.log(err)
                
                callback3(purpose)
                
            })
            
        }
        else{
            callback3(err, purpose)
        }
        
        
    })
    
    
}
    
    
}