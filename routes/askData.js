var express = require('express');
var router = express.Router();
var service = require('../Models/ServiceModel')
var authorization = require('../Controllers/setAuthorController')

router.post('/', function(req, res){
    console.log(req)
    
    service.findOne({name : 'JollyClick'}).exec(function(err, service){
        
        if(err) console.log(err)
        
        service.Data.push(req.body.dataName)
        service.save()
    })
    
    res.render('displayUserData', {availableData : ['Politique', 'Navigation', 'Sexualité']})
    
})
module.exports = router;