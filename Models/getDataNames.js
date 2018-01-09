var sqlite = require('sqlite3').verbose();

        
function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

exports.getDataNames = function(serviceName, idUser){
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