var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
let causeModel = require("../Models/CauseModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var async = require('async');
var backoff = require('backoff');
const drive = google.drive('v3');
var aesjs = require('aes-js');


//need to make sure userID is passed to this request !!!


exports.index = function (req, res){
    console.log(req.query) 
    var code = req.query.code 
    var filesIDs = []
    
var oauth2Client = new OAuth2(
  '1062718516916-0cam7cggf18l1sjhqsia5oitq181legn.apps.googleusercontent.com',"fQYSseaWA4w5_ZSPb9_G1i2v","https://visions-data.herokuapp.com/googleData"
);

    
    oauth2Client.getToken(code, function (err, tokens) {
        if (err) console.log(err) 

  if (!err) {
    oauth2Client.credentials = tokens;
    


drive.files.list({auth: oauth2Client}, function(err, response){
    if (err) console.log(err)
    console.log('gettin files')

    for(let i=0; i<response.files.length; i++){
        
        filesIDs.push(response.files[i].id)
        
    }
    
    //Pour voir avec backoff retourner au 28/12/17 à 1718
          for(let j=0; j<10; j++){  
            drive.files.get({
            fileId: filesIDs[j],
            auth: oauth2Client
                    }, function (err, response1) {
                            if (err) console.log(err)
                        userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
                            if (err) console.log(err)
                            var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
                            
                            var aesCtrDrive = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                            var encryptedDrive = aesCtrDrive.encrypt(aesjs.utils.utf8.toBytes(response1));
                            var encryptedDriveHex = aesjs.utils.hex.fromBytes(encryptedDrive);  
                                
                                
                                
                                user.Data.GoogleDriveData.push(encryptedDriveHex)
                                user.save()
        
                        })
    
                })
              
          }
    res.redirect('https://visions-data.herokuapp.com/recuperer')
    
})
    
/*drive.files.get({
  fileId: 'me',
  auth: oauth2Client
}, function (err, response) {
if (err) console.log(err)
    
    
})
    
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        if (err) console.log(err)
        
        user.GoogleTokens.access_token = tokens.access_token
        user.GoogleTokens.refresh_token = tokens.refresh_token
        user.save() 
        
    })*/
    
  }
});
}


