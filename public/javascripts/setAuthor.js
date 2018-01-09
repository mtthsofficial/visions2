//var db;
var sqlite = require("sqlite3");
import {getData} from 'requestDataModel.js'

function createDB(){
    var db = new sqlite.Database(':memory:/Utilisateurs/Matthias/Bureau/Visions');
    return db;
}
  


// Could this work for when we click on the buttons for authorizations ?
function setAuthorizations(idUser){
    window.document.getElementsByClassName('b').addEventListener('click', function(){
  let cellIndex = this.cellIndex;
        let rowIndex = this.parentNode.rowIndex;
        let d = window.document.getElementById("idAgent").innerHTML;
        //First query to get the right idData and idPurpose according to the service (its not always gonna be email;stats etc at the same place)
        //Table is called INDECES and rows are : index, datatype, purposetype
        let sqlDataType = 'SELECT datatype FROM '+d+' WHERE index = '+ rowIndex+";";
        let sqlPurposeType = 'SELECT purposetype FROM '+d+' WHERE index = '+ cellIndex+";";
        let sqlAddAuthor = "INSERT INTO data (P"+idPurpose+") VALUES (" + d+ ") WHERE idData ="+idData+"AND idPurpose = "+idPurpose+" AND idUser = "+idUser+";";
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
    });}

function exchangeData(idUser){
window.document.getElementsByClassName('c').addEventListener('click', function(){
    let doc = window.document;
    let rowIndex = this.parentNode.rowIndex;
    let dataName = doc.getElementById('dataType'+rowIndex).textContent;
    let serviceName = doc.getElementById('idAgent').textContent;
    
    var dbV = createDB('node-sqlite/VISIONS2.db');
    
    let sqlIdData = 'SELECT idData FROM DATATYPES WHERE Name = '+dataName+';';
    let sqlIdService = 'SELECT idAgent FROM SERVICES WHERE Name = '+serviceName+';';
    
    let idData = dbV.get(sqlIdData, function(err, result) {
        if (err) return alert(err);
        else return result;
    })
    let idService = dbV.get(sqlIdService, function(err, result) {
        if (err) return alert(err);
        else return result;
    })
    getData(idUser, idData, idService);
    
})}

export {setAuthorizations, exchangeData};
    

/*Other options to store authorizations
function select(){
    
    let doc = window.document
    let table = doc.querySelector("table")
    let btn = doc.getElementByClassName('b')

    btn.click(function(){
        
        this.className.textContent = 'selected'
        let selected = doc.getElementsByClassName('selected')
        
        for(let i=0; i<selected.length; i++){
            let idPurpose = selected[i].cellIndex
            let idData = selected[i].parentNode.rowIndex
            let d = document.getElementById("idAgent").innerHTML
            let sql = 'INSERT INTO data VALUES (' + d+ ') WHERE idData ='+idData+'AND idPurpose = '+idPurpose+' AND idUser = '+global.id+';'
            
        }
        
        
        
    })}
    
    function select2(){
        let cellIndex = this.cellIndex
        let rowIndex = this.parentNode.rowIndex
        let d = window.document.getElementById("idAgent").innerHTML
        let sqlDataType = 'SELECT datatype FROM '+d+' WHERE index = '+ rowIndex+";"
        let sqlPurposeType = 'SELECT purposetype FROM '+d+' WHERE index = '+ cellIndex+";"
        let sqlAddAuthor = 'INSERT INTO data VALUES (' + d+ ') WHERE idData ='+idData+'AND idPurpose = '+idPurpose+' AND idUser = '+global.id+';'
        createDB()
        let idData = db.query(sqlDataType, function(err, result) {
    if (err) return alert(err)
});     
        let idPurpose = db.query(sqlPurposeType, function(err, result) {
    if (err) return alert(err)
});     
        db.query(sqlAddAuthor, function(err, result) {
    if (err) return alert(err)
});     
    }
    */
   


