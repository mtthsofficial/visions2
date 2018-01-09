var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');

exports.index = function (req, res){
    console.log('yes')
var uniqueArray = function(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });
};


if(req.body.state == "out"){
  console.log("out")
  userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        
    if (err) console.log(err)
    
    let purpose = req.body.purpose
    let data = req.body.data
    
    let datas = ["Bancaires", "Famille", "Amis", "Email", "Emploi", "Adresse", "Education"]
    
    if(purpose == 0){
      let dataIndex = user.Preferences.Personnalisation.indexOf(datas[data]);
      user.Preferences.Personnalisation.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 1){      
      let dataIndex = user.Preferences.Marketing.indexOf(datas[data]);
      user.Preferences.Marketing.splice(dataIndex, 1);
      user.save()
        
    }
    if(purpose == 2){      
      let dataIndex = user.Preferences.Recherche.indexOf(datas[data]);
      user.Preferences.Recherche.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 3){      
      let dataIndex = user.Preferences.Publicite.indexOf(datas[data]);
      user.Preferences.Publicite.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 4){      
      let dataIndex = user.Preferences.Revente.indexOf(datas[data]);
      user.Preferences.Revente.splice(dataIndex, 1);
      user.save()
    }
    
    
    
    })
  
}
    else {
    userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
        
    if (err) console.log(err)
    
    let purpose = req.body.purpose
    let data = req.body.data
    
    let datas = ["Bancaires", "Famille", "Amis", "Email", "Emploi", "Adresse", "Education"]
    
    if(purpose == 0){
       user.Preferences.Personnalisation.push(datas[data])
        let newArray = uniqueArray(user.Preferences.Personnalisation)
         user.Preferences.Personnalisation = newArray
        user.save()
    }
    if(purpose == 1){user.Preferences.Marketing.push(datas[data])
         let newArray = uniqueArray(user.Preferences.Marketing)
         user.Preferences.Marketing = newArray

        user.save()
        
    }
    if(purpose == 2){user.Preferences.Recherche.push(datas[data])
         let newArray = uniqueArray(user.Preferences.Recherche)
         user.Preferences.Recherche = newArray
        user.save()
    }
    if(purpose == 3){user.Preferences.Publicite.push(datas[data])
         let newArray = uniqueArray(user.Preferences.Publicite)
         user.Preferences.Publicite = newArray        
         user.save()
    }
    if(purpose == 4){user.Preferences.Revente.push(datas[data])
         let newArray = uniqueArray(user.Preferences.Revente)
         user.Preferences.Revente = newArray        
         user.save()
    }

    })
    
    }
}