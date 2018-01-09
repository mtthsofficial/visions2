//var db;
import {setAuthorizations, exchangeData} from 'setAuthor.js'
var sqlite3 = require("sqlite3");

function createDB(){
  
    var db = new sqlite3.Database('node-sqlite/VISIONS2.db');
    return db;
}

function tag(name, attrs) {
  var el = document.createElement(name.toString());

  !!attrs && Object.keys(attrs).forEach(function(key) {
    el.setAttribute(key, attrs[key]);
  });

  return el;
}

function go(idService, idUser){
    let name = window.document.getElementById('srv'+idService).textContent;
    getDataNames(name, idUser);
    
   
    
}

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
    getPurposesTypes(serviceName, dataNames, idUser);
   
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
    

    generatePageAuthor(serviceName, dataNamesArray, purposesNames, idUser);
}
// GEnerate HTML code for the exchange
function generatePageAuthor(name, DataNamesArray, PurposeNamesArray, idUser){
    window.location.href = "/setAuthor.html";
    let doc = window.document;
    doc.getElementById('idAgent').textContent = print(name);
    for(let i = 0; i<PurposeNamesArray.length; i++){
   //doc.getElementById('purpose'+i).textContent = print(PurposeTypesArray[i])
   let purposeHeader = tag('th',{'id': 'purpose'+i});
   purposeHeader.innerHTML = PurposeNamesArray[i];
   window.document.body.getElementById('Purposes').appendChild(purposeHeader);
   
    }
    for(let i = 0; i<DataNamesArray.length; i++){
    //doc.getElementById('dataType'+i).textContent = print(DataNamesArray[i])
    let row = tag('tr',{'id': 'row'+(i+1)});
    window.document.body.getElementById('authorTable').appendChild(row);
    let dataTypeCell = tag('td',{'id': 'dataType'+(i+1)});
   dataTypeCell.innerHTML = DataNamesArray[i];
   window.document.body.getElementById('row'+(i+1)).appendChild(dataTypeCell);
   for (let i = 0; i<PurposeNamesArray.length; i++){
   let button = tag('td', {'class':'b'})
   window.document.body.getElementById('row'+(i+1)).appendChild(button);
    }
    }
    let buttonClick = tag('button',{'onclick':"'select()'"})
    buttonClick.innerHTML = print('Authoriser');
    window.document.body.getElementByClassName('b').appendChild(buttonClick);
    setAuthorizations(idUser);
    exchangeData(idUser);
}
    