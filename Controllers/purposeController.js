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
    
    async.parallel([getService, getPurpose], function (err, results){
        if(err) console.log(err)
        purposeDataModel.findOne({purpose : results[1]._id, service : results[0]._id}).exec(function(err, purposeData){
            if(err) console.log(err)
            res.render('purpose', {purposeName : req.body.purposeName, serviceName : req.body.serviceName, purposeRevenue : purposeData.revenue, description : purposeData.explanation, control : purposeData.control})
            
        })
        
        
        
    })

function getService(callback){
    services.findOne({name : req.body.serviceName}).exec(function(err, service){
        if(err) console.log(err)
        callback(service)
    })
    
    
}

function getPurpose(callback2){
    purposeModel.findOne({name : req.body.purposeName}).exec(function(err, purpose){
        if(err) console.log(err)
        callback2(purpose)
    })
    
    
}

    
}