var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")

exports.index = function (req, res){
    let serviceName = 'JollyClick' 
    let idUser = req.body.idUser
    var dataNamesArray = []
    var purposeNamesArray = []
    
    let dataUseLength = service.findOne({name : serviceName}).populate('DataUse').DataUse.length
    let purposeLength = service.findOne({name : serviceName}).populate('DataUse').DataUse.then(function(err, dataUse){
        if (err) console.log(err)
        dataPurpose.findById(dataUse)}).purpose.length
    
for (let i = 0; i<dataUseLength; i++){
service.findOne({name : serviceName}).populate('DataUse').DataUse[i].then(function (err, dataUse){
    
       if (err) console.log(err)
       //console.log(service)

         dataPurpose.findById(dataUse)}).populate('data').data.name.then(function(err, dataName){
              if (err) console.log(err)
           
            dataNamesArray.push(dataName)})}
            
for (let j = 0; j<purposeLength; j++){
service.findOne({name : serviceName}).populate('DataUse').DataUse[0].then(function (err, dataUse){
       if (err) console.log(err)
       //console.log(service)

         dataPurpose.findById(dataUse)}).populate('purpose').purpose[j].name.then(function(err, dataName){
              if (err) console.log(err)
           
            purposeNamesArray.push(dataName)})}
            
            
            
            
     
                res.render('setAuthor',
                {serviceName: serviceName, idUser: idUser, 
                DataNamesArray: dataNamesArray, 
                PurposeNamesArray : purposeNamesArray})


    
    
}
       
       
/*let dataService = service.DataUse.populate('data')
        let NamesArray = []
        let datasArray = dataService.DataUse
        for (let i=0; i<datasArray.length; i++){
            NamesArray.push(dataService.DataUse[i].data.name)
        }
        return NamesArray*/

        
    
    
       
     /*  
       var dataNamesArray = []
    for (let i=0; i<service.DataUse.length; i++){
        dataNamesArray.push(service.DataUse[i].data.name)
    }
    return dataNamesArray
   });
    

    
    res.render('setAuthor',{serviceName: serviceName, idUser: idUser, DataNamesArray: DataNamesArray, PurposeNamesArray:PurposeNamesArray})
    
}*/