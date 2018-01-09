var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")


exports.index = function (req, res){
    let serviceName = 'JollyClick' 
    let idUser = req.body.idUser
          var dataNamesArray = []
        var purposeNamesArray = []
        
service.findOne({name : serviceName}).populate('DataUse').exec(function (err, service){
       if (err) console.log(err)
       //console.log(service)
       
 dataPurpose.findById(service.DataUse[0]._id).populate('purpose').exec(function (err, purp){
            if (err) console.log(err)
            
            for (let j =0; j<purp.purpose.length; j++){
                    console.log(purp.purpose.length) 
               Purpose.findById(purp.purpose[j]).exec(function(err, purpose){
                    if (err) console.log(err)
                    purposeNamesArray.push(purpose.name)
                    console.log(purposeNamesArray) 
            
       })}
  
 
       for (let i=0; i<(service.DataUse.length); i++){
dataPurpose.findById(service.DataUse[i]._id).populate('data').exec(function(err, data){
          
              if (err) console.log(err)

              
              dataNamesArray.push(data.data.name)
           
            
        
      })}

          if (purposeNamesArray.length== purp.purpose.length && 
          dataNamesArray.length == 
          service.DataUse.length)
        {
            console.log(dataNamesArray)
            console.log(purposeNamesArray)
                res.render('setAuthor',
                {serviceName: serviceName, idUser: idUser, 
                DataNamesArray: dataNamesArray, 
                PurposeNamesArray : purposeNamesArray})}
                

      
 })
      
       
  
    
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
    

    
    res.render('setAuthor',{serviceName: serviceName, idUser: idUser, DataNamesArray: DataNamesArray, PurposeNamesArray:PurposeNamesArray})
    
}*/