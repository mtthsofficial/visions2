var sqlite = require('sqlite3').verbose();

exports.registerUser = function(idUser, password){
    var db = createDB();
    var sqlUser = 'INSERT INTO USERS(idUser, PW) VALUES ('+idUser+','+password+');';
    db.run(sqlUser, function(err, insertUser){
        
        if (err) return alert(err)});}
        
        
function createDB(){
var db = new sqlite.Database('VISIONS2.db', (err) => {
if (err) {
    return console.error(err.message);
  }
  return db;
});
    
}