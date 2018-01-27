var User = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var aesjs = require('aes-js');


exports.index = function (req, res){
User.findOne({name : req.cookies.userID}).exec(function(err, user){
    if(err) console.log(err)

if(user.Data.FacebookWork.length==0 && user.Data.FacebookEducation.length==0 && user.Data.FacebookPosts.length==0 && user.Data.TwiiterPosts.length==0 && user.Data.GoogleDriveData.length==0 &&  user.Data.Professionnel.SchoolsAttended.length==0 && user.Data.Professionnel.PreviousWorks.length==0 ) {
    res.render('dataBank2') 
}


else {var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];


//Adress
var encryptedBytesA = aesjs.utils.hex.toBytes(user.Data.Personnel.Address);
 
var aesCtrA = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesA = aesCtrA.decrypt(encryptedBytesA);
 
var decryptedTextA = aesjs.utils.utf8.fromBytes(decryptedBytesA);
var adress = decryptedTextA

//Birthday
var encryptedBytesB = aesjs.utils.hex.toBytes(user.Data.Personnel.Birthday);
 
var aesCtrB = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesB = aesCtrB.decrypt(encryptedBytesB);
 
var decryptedTextB = aesjs.utils.utf8.fromBytes(decryptedBytesB);
var bd = decryptedTextB

//Gender
var encryptedBytesG = aesjs.utils.hex.toBytes(user.Data.Personnel.Gender);
 
var aesCtrG = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesG = aesCtrG.decrypt(encryptedBytesG);
 
var decryptedTextG = aesjs.utils.utf8.fromBytes(decryptedBytesG);
var gender = decryptedTextG

//Schools
var el =""
for(let i=0; i<user.Data.Professionnel.SchoolsAttended.length; i++){

var encryptedBytesE = aesjs.utils.hex.toBytes(user.Data.Professionnel.SchoolsAttended[i]);
 
var aesCtrE = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesE = aesCtrE.decrypt(encryptedBytesE);
 
var decryptedTextE = aesjs.utils.utf8.fromBytes(decryptedBytesE);
el =el+ decryptedTextE+", "
}

//Fields
var f = ""
for(let j=0; j<user.Data.Professionnel.Fields.length; j++){

var encryptedBytesF = aesjs.utils.hex.toBytes(user.Data.Professionnel.Fields[j]);
 
var aesCtrF = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesF = aesCtrF.decrypt(encryptedBytesF);
 
var decryptedTextF = aesjs.utils.utf8.fromBytes(decryptedBytesF);
f = f+ decryptedTextF+", "}

//Previous works
var p =""
for(let i=0; i<user.Data.Professionnel.PreviousWorks.length; i++){

var encryptedBytesP = aesjs.utils.hex.toBytes(user.Data.Professionnel.PreviousWorks[i]);
 
var aesCtrP = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesP = aesCtrP.decrypt(encryptedBytesP);
 
var decryptedTextP = aesjs.utils.utf8.fromBytes(decryptedBytesP);
console.log(decryptedTextP)
p = p + decryptedTextP+", "}

//Current Work
var encryptedBytesW = aesjs.utils.hex.toBytes(user.Data.Professionnel.CurrentWork);
 
var aesCtrW = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesW = aesCtrW.decrypt(encryptedBytesW);
 
var decryptedTextW = aesjs.utils.utf8.fromBytes(decryptedBytesW);
var w = decryptedTextW

//Salary
var encryptedBytesS = aesjs.utils.hex.toBytes(user.Data.Professionnel.Salary);
 
var aesCtrS = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesS = aesCtrS.decrypt(encryptedBytesS);

var decryptedTextS = aesjs.utils.utf8.fromBytes(decryptedBytesS);
var s = decryptedTextS

//Leasure Spendings
var encryptedBytesSex = aesjs.utils.hex.toBytes(user.Data.Intime.LeasureSpendings);
 
var aesCtrSex = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesSex = aesCtrSex.decrypt(encryptedBytesSex);
 
var decryptedTextSex = aesjs.utils.utf8.fromBytes(decryptedBytesSex);
var ls = decryptedTextSex

// Commodity Spendings
var encryptedBytesC = aesjs.utils.hex.toBytes(user.Data.Intime.CommoditySpendings);
 
var aesCtrC = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesC = aesCtrC.decrypt(encryptedBytesC);
 
var decryptedTextC = aesjs.utils.utf8.fromBytes(decryptedBytesC);
var cs = decryptedTextC

// Hobbies
var h =""
for(let i=0; i<user.Data.Intime.Hobbies.length; i++){

var encryptedBytesH = aesjs.utils.hex.toBytes(user.Data.Intime.Hobbies[i]);
 
var aesCtrH = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesH = aesCtrH.decrypt(encryptedBytesH);
 
var decryptedTextH = aesjs.utils.utf8.fromBytes(decryptedBytesH);

h = h + decryptedTextH+", "}

//Sports
var sp =""
for(let i=0; i<user.Data.Intime.Sports.length; i++){

var encryptedBytesSp = aesjs.utils.hex.toBytes(user.Data.Intime.Sports[i]);
 
var aesCtrSp = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesSp = aesCtrSp.decrypt(encryptedBytesSp);

var decryptedTextSp = aesjs.utils.utf8.fromBytes(decryptedBytesSp);

sp = sp + decryptedTextSp+", "}

// Weight

var encryptedBytesSm = aesjs.utils.hex.toBytes(user.Data.Intime.Weight);
 
var aesCtrSm = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesSm = aesCtrSm.decrypt(encryptedBytesSm);

var decryptedTextSm = aesjs.utils.utf8.fromBytes(decryptedBytesSm);
var sm = decryptedTextSm

// Movie
var encryptedBytesM = aesjs.utils.hex.toBytes(user.Data.Intime.MovieFav);
 
var aesCtrM = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesM = aesCtrM.decrypt(encryptedBytesM);
 
var decryptedTextM = aesjs.utils.utf8.fromBytes(decryptedBytesM);
var movie = decryptedTextM

//Book
var encryptedBytesBo = aesjs.utils.hex.toBytes(user.Data.Intime.BookFav);
 
var aesCtrBo = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
var decryptedBytesBo = aesCtrBo.decrypt(encryptedBytesBo);
 
var decryptedTextBo = aesjs.utils.utf8.fromBytes(decryptedBytesBo);
var book = decryptedTextBo

   
   res.render('dataBank2', {adresse : adress, date : bd, genre : gender, ecoles : el, domaines : f, emploisPrecedents : p, emploisActuels : w, salaire : s, depensesLoisirs : ls, depensesCommodites : cs, loisirs : h, sports : sp, poids : sm, film : movie, livre : book }); 
}})

}


