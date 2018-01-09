var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
let purposeDataModel = require("../Models/PurposeDataModel")
let PictosModel = require("../Models/PictosModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');

exports.index = function (req, res){
    let userID = req.cookies.userID
    let userDatas = [] 
    

    
    userModel.findOne({name : userID}).exec(function(err, user){
        if(err) console.log(err)
        
       if(user.Data.FacebookPhotos != null){userDatas.push("/images/photos.png")}
       if(user.Data.FacebookReligion != null){userDatas.push("/images/religion.png")}
       if(user.Data.FacebookLocation != null){userDatas.push("/images/localisation.png")}
       if(user.Data.FacebookPhotos != null){userDatas.push("/images/relation.png")}
       if(user.Data.FacebookWork.length != 0){userDatas.push("/images/emploi.png")}
       if(user.Data.FacebookEducation.length != 0){userDatas.push("/images/education.png")}
       if(user.Data.FacebookPosts.length != 0){userDatas.push("/images/facebook.png")}
       if(user.Data.TwiiterPosts.length != 0){userDatas.push("/images/tweet.png")}
       if(user.Data.GoogleDriveData.length != 0){userDatas.push("/images/googledrive.png")}
       
       
       console.log(userDatas)  
       
       if(userDatas.length == 0){res.render('recuperer', {message : "Vous n'avez pas encore de données", userDatas : userDatas})}
       else{res.render('recuperer', {userDatas : userDatas})}
    })
    
    
}