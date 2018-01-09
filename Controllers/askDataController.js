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
    
    services.findOne({name : req.body.serviceName}).exec(function(err, service){
        if (err) console.log(err)
        
      service.Data.push(req.body.dataName)
        
    })
    
}