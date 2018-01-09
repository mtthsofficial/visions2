var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")


exports.index = function (req, res){
    let serviceName = req.body.name 
    console.log(serviceName)
    let userID = req.body.userID
    console.log(req.body)
        
service.findOne({name : serviceName}).populate('DataUse').exec(function (err, service){
       if (err) console.log(err)
       console.log(service)
         var dataNamesArray = service.Data 
        var purposeNamesArray = service.Purposes
        
                res.render('setAuthor',
                {serviceName: serviceName, userID: userID, 
                DataNamesArray: dataNamesArray, 
                PurposeNamesArray : purposeNamesArray})
                

      
 })}
      
       
  
    




    
    

       
       
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
    

    
    res.render('setAuthor',{serviceName: serviceName, userID: userID, DataNamesArray: DataNamesArray, PurposeNamesArray:PurposeNamesArray})
    
}*/