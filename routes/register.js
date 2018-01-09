var express = require('express');
var router = express.Router();
//var sqlite = require('sqlite3').verbose();
var registerController = require("../Controllers/registerController")

/*function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}*/



router.post('/' , registerController.index) 
module.exports = router;

/*{

let idUser = req.id;
let pw = req.password;

Register(idUser, pw);
let serviceNames = getServicesNames(idUser)


res.render('services', {idUser: idUser, servicesNames: serviceNames, title: 'Services'})
    
})

function Register(idUser, password){
    var db = createDB();
    var sqlUser = 'INSERT INTO USERS(idUser, PW) VALUES ('+idUser+','+password+');';
    db.run(sqlUser, function(err, insertUser){
        
        if (err) return alert(err)});}
        
function getServicesNames(idUser){
    //Test query    
    //var services = 'SELECT idAgent FROM SERVICES WHERE idUser = '+id+';'
    var services = "SELECT idUserS1, idUserS2, idUserS3, idUserS4, idUserS5 FROM USERS WHERE idUser = "+idUser+";";
    //var queryServices = 
    var db = createDB();
    let userServicesIds = db.all(services, function(err, userServicesIds){
        
        if (err) alert(err);
        else return userServicesIds;
    
    })
    
     let serviceIds = [];
       //let serviceNames = [];
       
       
       
       for(let i = 0; i<userServicesIds.length; i++){
           if(userServicesIds[i]!==''){
               serviceIds.push(i+1);
           }
       }
       let serviceNames = []
      for (let i=0; i<serviceIds.length; i++){
       let sqlGetName = 'SELECT Name FROM SERVICES WHERE idAgent ='+serviceIds[i]+';';
       
       db.all(sqlGetName, function(err, serviceName){
        
        if (err) {return alert(err);}
           
       
       
       else {serviceNames.push(serviceName)
}})}
    return serviceNames
    
}
    
    ;*/