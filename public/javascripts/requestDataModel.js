const sqlite = require("sqlite3");
const fetch = require("fetch");

function createDB(dbName){
    var db = new sqlite.Database(dbName, (err) => {
  if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

function getData(idUser, idData, idDemandingService){
    let sqlGivingService = 'SELECT D'+idData+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlUrl = 'SELECT URL FROM SERVICES WHERE idAgent = '+idGivingService+';';
    let sqlUserId = 'SELECT idUserS'+idGivingService+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlUserPw = 'SELECT PWService'+idGivingService+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlServiceDBInfo ='SELECT UsersTableName, UserIdColumnName,'+idData+' FROM SERVICES WHERE idAgent = '+idGivingService+';';
    let sqlFinal = 'SELECT '+serviceDBInfo[2]+' FROM '+serviceDBInfo[0]+' WHERE '+serviceDBInfo[1]+' = '+userServiceId+';';
    var dbV = createDB('VISIONS2.db');
    var dbGS = createDB(url);
    
    let idGivingService = dbV.get(sqlGivingService, function(err, result){
        if (err) {return alert(err);}
        else {
            return result;
        }
    })
    
   
    
    let url = dbV.get(sqlUrl, function(err, result){
        if (err) {return alert(err);}
        else {
            return result;
        }
    } );
    let userServiceId = dbV.get(sqlUserId, function(err, result){
        if (err) {return alert(err);}
        else{
            return result;
        }
        
    })
    
    let userPW = dbV.get(sqlUserPw, function(err, result){
        if (err) {return alert(err);}
        else{
            return result;
        }
        
    });
    let serviceDBInfo = dbV.all(sqlServiceDBInfo, function(err, result){
         if (err) {return alert(err);}
        else{
            return result;
        }
    })

    let data = dbGS.get(sqlFinal, function(err, result){
         if (err) {return alert(err);}
        else{
            return result;
        }
    })
    
    return sendData(data, idDemandingService, idUser, idData);
    
}

// Add conditionnals to sendData() to check if Service already has a column for that data
// if not : ALTER TABLE
// for test we assume it has
function sendData(data, idDemandingService, idUser, idData){
        let sqlUrl = 'SELECT URL FROM SERVICES WHERE idAgent = '+idDemandingService+';';
        let sqlUserId = 'SELECT idUserS'+idDemandingService+' FROM USERS WHERE idUser = '+idUser+';';
        let sqlServiceDBInfo ='SELECT UsersTableName, UserIdColumnName,'+idData+' FROM SERVICES WHERE idAgent = '+idDemandingService+';';
        let sqlFinal ='UPDATE '+serviceDBInfo[0]+' SET '+serviceDBInfo[2]+' = '+data+' WHERE '+serviceDBInfo[1]+' = '+userServiceId+';';
        
        
        var dbV = createDB('VISIONS2');
        var dbDS = createDB(url);
        
        let url = dbV.get(sqlUrl, function(err, result){
         if (err) {return alert(err);}
        else{
            return result;
        }
    })
    
     let userServiceId = dbV.get(sqlUserId, function(err, result){
        if (err) {return alert(err);}
        else{
            return result;
        }
        
    })
    
     let serviceDBInfo = dbV.all(sqlServiceDBInfo, function(err, result){
         if (err) {return alert(err);}
        else{
            return result;
        }
    })
        
   let request = dbDS.run(sqlFinal, function(err){
       if(err){return false}
       return true
   });
    
  return request;  
    
}
    



/*
async function getData(idUser, idData, idDemandingService){
    let sqlGivingService = 'SELECT D'+idData+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlUrl = 'SELECT url FROM SERVICES WHERE idAgent = '+idGivingService+';';
    let sqlUserId = 'SELECT UserIdService'+idGivingService+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlUserPw = 'SELECT PWService'+idGivingService+' FROM USERS WHERE idUser = '+idUser+';';
    let sqlServiceDBInfo ='SELECT '+idData+' FROM SERVICES WHERE idAgent = '+idGivingService+';';
    let sqlFinal = 'SELECT '+serviceDBInfo[0]+' FROM '+serviceDBInfo[1]+' WHERE '+serviceDBInfo[2]+' = '+userServiceId+';';
    var db = createDB();
    
    let arrayGivingServices = db.get(sqlGivingService, function(err, result){
        if (err) {return alert(err);}
        else {
            return result;
        }
    })
    
    let idGivingService = arrayGivingServices[0];
    
    let url = db.get(sqlUrl, function(err, result){
        if (err) {return alert(err);}
        else {
            return result;
        }
    } );
    let userServiceId = db.get(sqlUserId, function(err, result){
        if (err) {return alert(err);}
        else{
            return result;
        }
        
    })
    
    let userPW = db.get(sqlUserPw, function(err, result){
        if (err) {return alert(err);}
        else{
            return result;
        }
        
    });
    
    // In table 'SERVICES' we have a column for each datatype name after the dataId (1,2,3 etc)
    //Each field contains an array with the name of the datatype [0] in the service's DB  
    //the name of the table [1]where the data is stored
    // the name of the column with user's ID [2]
    
    let serviceDBInfo = db.all(sqlServiceDBInfo, function(err, result){
         if (err) {return alert(err);}
        else{
            return result;
        }
    })
    
    try{
        let retrievedData = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(sqlFinal),
            headers: {'Authentication':{userServiceId, userPW}}
        })
        
        
        if (retrievedData.ok){
            let jsonData = retrievedData.json()
            sendData(jsonData, idDemandingService, idUser, idData)
        }throw new Error('Request Failed!')
        
    }
    catch(error){console.log(error)}
    
    
}

function sendData(data, idDemandingService, idUser, idData){
    // function to send the data to the demanding service 
}*/