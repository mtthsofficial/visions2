var dataPurposeModel = require("../Models/DataPurposeModel")
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
    let causeName = req.body.cause
    let userID = req.body.userID

userModel.findOne({name : userID}).exec(function(err, user){
    if(err) console.log(err)
    let userAvailableData = user.availableData
    
    causeModel.findOne({name : causeName}).populate('DataPurposes').exec(function(err, cause){
        if(err) console.log(err)
        let description = cause.description
        let DataPurposes = []
        for(let i=0; i<cause.DataPurposes.length; i++){
            dataPurposeModel.findById(cause.DataPurposes[i]).populate('data').exec(function(err, dataPurpose){
                if(err) console.log(err)
                
                DataPurposes.push(dataPurpose)
                
                if(i==cause.DataPurposes.length-1){
                    res.render('cause', {description : description, causeName: causeName, DataPurposes: DataPurposes, userAvailableData: userAvailableData})
                }
                
                
            })
            
        }
        
        
        
    })
    
})
}