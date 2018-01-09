var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment'); 
mongoose.Promise = require('bluebird');

var index = require('./routes/index');
var facebook = require('./routes/facebook');
var authorizations = require('./routes/authorizations');
var users = require('./routes/users');
var echanger = require('./routes/echanger');
var pay = require('./routes/pay');
var donate = require('./routes/donate');
var association = require('./routes/association');
var data4good = require('./routes/data4good');
var displayUserData = require('./routes/displayUserData');
var twitterData = require('./routes/twitterData');
var register = require('./routes/register')
var google = require('./routes/google')
var googleData = require('./routes/googleData') 
var recuperer = require('./routes/recuperer')
var accueil = require('./routes/accueil')
var services = require("./routes/services")
var setAuthor = require("./routes/setAuthor")
var dataBank = require("./routes/dataBank") 
var twitter = require("./routes/twitter") 
var purpose = require("./routes/purpose") 
var controler = require("./routes/controler") 
var authorize = require("./routes/authorize") 

//var checkAuthor = require("./routes/checkAuthor");
var home = require("./routes/home")
var create = require("./routes/create")
var admin = require("./routes/admin")
var adminEntreprise = require("./routes/adminEntreprise")
var adminPurposeData = require("./routes/adminPurposeData")
var askData = require("./routes/askData")
var adminService = require("./routes/adminService")
var userPreferences = require('./routes/userPreferences');
var servicesSimulation = require('./routes/servicesSimulationHome')
var registerData = require('./routes/registerData');

/*var userModel = require('./Models/UserModel')
var serviceModel = require('./Models/ServiceModel')
var PurposeModel = require('./Models/PurposeModel')
//var DataModel = require('./Models/DataModel')
var DataPurpose = require('./Models/DataPurposeModel')
var AuthorizationModel = require('./Models/AuthorizationModel')*/


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', home);
app.use('/facebook', facebook);
app.use('/authorizations', authorizations);
app.use('/askData', askData);
app.use('/displayUserData', displayUserData);
app.use('/twitter', twitter);
app.use('/google', google);
app.use('/googleData', googleData);
app.use('/recuperer', recuperer);
app.use('/controler', controler);
app.use('/twitterData', twitterData);
app.use('/admin', admin);
app.use('/pay', pay);
app.use('/donate', donate);
app.use('/association', association);
app.use('/setAuthor', setAuthor);
app.use('/accueil', accueil);
app.use('/data4good', data4good);
app.use('/dataBank', dataBank);
app.use('/authorize', authorize);
app.use('/echanger', echanger);
app.use('/adminEntreprise', adminEntreprise);
app.use('/adminService', adminService)
app.use('/create', create) 
app.use('/adminPurposeData', adminPurposeData) 
app.use('/users', users);
app.use('/login', index)
app.use('/register', register)
app.use('/services', services)
app.use('/setAuthor', setAuthor)
app.use('/purpose', purpose) 
app.use('/userPreferences', userPreferences)
app.use('/servicesSimulation', servicesSimulation)
app.use('/registerData', registerData) 
//app.use('/checkAuthor', checkAuthor)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {'msg': err.message});
});



var mongoDB = 'mongodb://mtths:Visions-database-19@ds161455.mlab.com:61455/visions';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
autoIncrement.initialize(db);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));





app.listen(process.env.PORT, process.env.IP)



module.exports = app;


/*

function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}

function tag(name, attrs) {
  var el = document.createElement(name.toString());

  !!attrs && Object.keys(attrs).forEach(function(key) {
    el.setAttribute(key, attrs[key]);
  });

  return el;
}

//window.document.getElementById("register").addEventListener('click', function(){



app.post('/Register' , function (req, res) {

let idUser = req.id;
let pw = req.password;

Register(idUser, pw);
let serviceNames = getServicesNames(idUser)


res.render('services', {idUser: idUser, servicesNames: serviceNames, title: 'Services'})})

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
    
    ;
   
    
        
    
 

app.post('/Services' , function (req, res) {
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

}

    
app.post('/setAuthor', function(req, res){
    let rowIndex = req.rowIndex
    let cellIndex = req.cellIndex
    let idUser = req.idUser
    let d = req.d
    
    setAuthor(idUser, rowIndex, cellIndex, d)
    
})

function setAuthor(idUser, rowIndex, cellIndex, serviceName){
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
*/

