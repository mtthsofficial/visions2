var express = require('express');
var create = require("../Controllers/createController")
var router = express.Router();
var services = require("../Controllers/servicesSimulationController")
var service = require("../Models/ServiceModel")

/* GET home page. */
router.post('/Facebook', function(req, res) {
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
        
        
        res.render('service', {serviceName : serviceName, dataNames : dataNames, purposeNames : purposeNames, idUser : idUser})
        
    })
  
  
}
)
router.get('/', function(req, res, next) {
  res.render('servicesSimulation')
});

module.exports = router;