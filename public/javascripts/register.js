var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
  res.render('error');
});


const sqlite = require("sqlite3").verbose();





// open the database for reading if file exists
// create new database file if not
//the database connection is done


function createDB(){
var db = new sqlite.Database('./node-sqlite/VISIONS2.db', (err) => {
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

window.document.getElementById("register").addEventListener('click', function(){
    
var db = createDB();
let id = window.document.getElementById("idUser").textContent;
let pw = window.document.getElementById("password").textContent;
    var sqlUser = 'INSERT INTO USERS(idUser, PW) VALUES ('+id+','+pw+');';
    db.run(sqlUser, function(err, insertUser){
        
        if (err) return alert(err)});
    //Test query    
    //var services = 'SELECT idAgent FROM SERVICES WHERE idUser = '+id+';'
    var services = "SELECT idUserS1, idUserS2, idUserS3, idUserS4, idUserS5 FROM USERS WHERE idUser = "+id+";";
    //var queryServices = 
    db.all(services, function(err, userServicesIds){
        
        if (err) alert(err);
        else redirect(id, userServicesIds);
    
    });
    });
    

    // I added the query parameter bc bf there were () missing and it consider redirect()
    // as part of createDB() but since its not display services, couldn't access query

 function redirect(idUser, query){
     
            window.location.href = "/Services.html";
            displayServices(idUser, query);
           
     }
        
    
 function displayServices(idUser, query){
       let doc = window.document;
       let serviceIds = [];
       //let serviceNames = [];
       
       var db = createDB();
       
       for(let i = 0; i<query.length; i++){
           if(query[i]!==''){
               serviceIds.push(i+1);
           }
       }
       
       for (let i=0; i<serviceIds.length; i++){
       let sqlGetName = 'SELECT Name FROM SERVICES WHERE idAgent ='+serviceIds[i]+';';
       //serviceNames = 
       db.get(sqlGetName, function(err, serviceName){
        
        if (err) {return alert(err);}
           
       
       
       else {
           let buttonService = tag('button', {'id':'service'+(i+1), 'onclick':"'go("+(i+1)+"," +idUser+")'"});
           buttonService.innerHTML = serviceName;
           doc.body.appendChild(buttonService);
       }});
    
        
        //doc.getElementById('srv1').textContent = print(query)
        
}}
