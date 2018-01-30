var User = require("../Models/UserModel")
let authorization = ("../Models/AuthorizationModel")
let dataPurpose = require("../Models/DataPurposeModel")
let services = require("../Models/ServiceModel")


exports.checkAuthorization = function(req, res){
  var idUser = req.body.idUserService;
  var service = req.body.serviceName;
  var dataPurpose = req.body.DataPurpose;
  
  res.contentType("application/json");
  
  var authorBool = User.findOne({name : idUser}, function(err, user){
      if (err) console.log(err)
      var userId = user._id
      
    var servicestep = services.findOne({name : service}, function (err, service){
          if (err) console.log(err)
          var serviceId = service._id
   var authorizationStep = authorization.find({user : userId, service: serviceId}, function(err, authorization){
              if (err) console.log(err)
              var author = false
              for (let i=0; i<authorization.authorizations.length; i++){
                 if (authorization.authorizations[i] == dataPurpose){
                     author = true
                 }
                 
              }
              return author;
          })
          return authorizationStep  
      })
   return servicestep
  })
  
  var author = {author : authorBool}
  
  var authorJSON = JSON.stringify(author)
  
  
  
  res.send(authorJSON)


    
}