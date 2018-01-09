var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")


exports.index = function (req, res){
    let serviceName = req.body.serviceName
    console.log(serviceName)
    let dataNames = []
    let purposeNames = []
    let idUser = req.body.idUser
    
    service.findOne({name : serviceName}).exec(function(err, service){
        if (err) console.log(err)
        console.log(service) 
        dataNames = service.Data
        purposeNames = service.Purposes
        
        
        res.render('service', {serviceName : serviceName, dataNames : dataNames, purposeNames : purposeNames, idUser: idUser})
        
    })
}

