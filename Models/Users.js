var sqlite = require('sqlite3').verbose();

function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

// Table users_ServiceName (idUser, username, mail, password, idUserService, idData)

exports.setUserRegisterInfo = function(idUser, password){
    
}

exports.setUserServiceInfo = function(idUser, idServiceUser, servicePassword, idService){
    
}

exports.setAuthorization = function(idUser, idData, idPurpose, idService){
    
}

exports.deleteAuthorization = function(idUser, idServiceUser, servicePassword, idService){
    
}

exports.getServices = function(idUser){
    
}

exports.getData = function(idUser){
    
}

exports.getPurposes = function(idUser, idService){
    
}


