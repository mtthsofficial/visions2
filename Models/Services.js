var sqlite = require('sqlite3').verbose();

function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

// Table Types (idService, name, dataType, recommandation, exchange, advertisement, contact, analytics)

exports.setServiceInfo = function (idService, serviceName, dataTypes, purposes){
    
}

exports.getPurposes= function (idService){
    
}

exports.getDataTypes = function(idService){
    
}

exports.getUsers = function (idService, serviceName, dataTypes, purposes){
    
}

