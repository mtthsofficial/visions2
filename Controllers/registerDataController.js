var User = require("../Models/UserModel")
let authorization = ("../Models/AuthorizationModel")
let dataPurpose = require("../Models/DataPurposeModel")
let dataModel = require("../Models/DataModel")
let services = require("../Models/ServiceModel")


exports.index = function(req, res){
  User.findOne({name : req.body.userId}).exec(function(err, user){
      if (err) console.log(err)
      
      console.log("user:"+user)
      
      dataModel.findOne({name:req.body.dataName}).exec(function(err, data){
        if(err) console.log(err)
        console.log("data:"+data)
        
        if(data==null){dataModel.create({name: req.body.dataName}, function(err, data2){
          if(err) console.log(err)
          console.log("data2:"+data2)
          user.availableData.push(data2._id) 
        })}
        else{
          console.log("data if pushed:"+data)
          user.availableData.push(data._id)
          user.save()
          console.log("user:"+user)
        }
        
      })
      

    
          
    let serviceName = req.body.serviceName
    let dataNames = []
    let purposeNames = []
    let idUser = req.body.userId
    
    services.findOne({name : serviceName}).exec(function(err, service){
        if (err) console.log(err)

        dataNames = service.Data
        purposeNames = service.Purposes
        
        
        res.render('service', {serviceName : serviceName, dataNames : dataNames, purposeNames : purposeNames, idUser: idUser})
        
    })
        
          
      
      
  })  
    
} 