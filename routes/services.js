var express = require('express');
var router = express.Router();
//var sqlite = require('sqlite3').verbose();
var services = require("../Controllers/servicesController")

/*function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}*/


router.post('/' , services.index) 
module.exports = router;

/*{
    let serviceName = req.serviceName
    let idUser = req.idUser
    
    let DataNamesArray = getDataNames(serviceName, idUser)
    let PurposeNamesArray = getPurposesTypes(serviceName, DataNamesArray, idUser)
    
    res.render('setAuthor',{serviceName: serviceName, idUser: idUser, DataNamesArray: DataNamesArray, PurposeNamesArray:PurposeNamesArray})
    
    
})
    
function getDataNames(serviceName, idUser){
        var db = createDB();
        let sql ="SELECT D1, D2, D3, D4, D5, D6, D7, D8, D9, D10 FROM SERVICES WHERE name =  '"+serviceName+"' ;";
        let dataTypes = [];
        let dataNames =[];
       
        db.all(sql, function(err, query1){
        
        if (err) {return alert(err)}
    

    for (let i=0; i<query1.length; i++){
        if (query1[i]!==0){
            dataTypes.push(i+1) ;
        }
    }})
    for (let i=0; i<dataTypes.length; i++){
        let sqlNames = 'SELECT Name FROM DATATYPES WHERE idData = '+dataTypes[i];
        db.get(sqlNames, function(err, dataName){
        
        if (err) {return alert(err)}
        else {dataNames.push(dataName)}
    
});
    }
    return dataNames

}

function getPurposesTypes(serviceName, dataNamesArray, idUser){
        let sql ="SELECT D1, D2, D3, D4, D5, D6, D7, D8, D9, D10 FROM SERVICES WHERE name = '"+serviceName+"';";
        var db = createDB();
        let purposesNames = [];
        var purposesTypes = db.all(sql, function(err, purposesTypes){
        
        if (err) {return alert(err)}
        
    
        else{ return purposesTypes}})
        
    for (let i=0; i<purposesTypes.length; i++){
    if (purposesTypes[i]===0){
        purposesTypes.splice(i, 1);
    }}
    
    for (let i=0; i<purposesTypes.length; i++){
        let sqlNames = 'SELECT Name FROM PURPOSES WHERE idPurpose = '+purposesTypes[i];
        db.get(sqlNames, function(err, purposeName){
        
        if (err) {return alert(err)}
        else{purposesNames.push(purposeName)}})}
    return purposesNames

}*/