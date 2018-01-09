var sqlite = require('sqlite3').verbose();

function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

exports.setAuthor = function(idUser, rowIndex, cellIndex, serviceName){
     let sqlDataType = 'SELECT datatype FROM '+serviceName+' WHERE index = '+ rowIndex+";";
        let sqlPurposeType = 'SELECT purposetype FROM '+serviceName+' WHERE index = '+ cellIndex+";";
        let sqlAddAuthor = "INSERT INTO data (P"+idPurpose+") VALUES (" + serviceName + ") WHERE idData ="+idData+"AND idPurpose = "+idPurpose+" AND idUser = "+idUser+";";
        let db = createDB();
        let idData = db.get(sqlDataType, function(err, idData) {
    if (err) return alert(err);
    else return idData
});     
        let idPurpose = db.get(sqlPurposeType, function(err, idPurpose) {
    if (err) return alert(err);
    else return idPurpose
});     
        db.run(sqlAddAuthor, function(err, result) {
    if (err) return alert(err);
});
    
}