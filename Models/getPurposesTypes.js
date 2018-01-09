var sqlite = require('sqlite3').verbose();

        
function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

exports.getPurposesTypes = function (serviceName, dataNamesArray, idUser){
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

}