var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var User = require("../Models/UserModel") 
var async = require('async');
var Jollyclick = require('../Models/jollyclickModel');
var aesjs = require('aes-js');

exports.jollyClick = function (req, res){

var uniqueArray = function(arrArg) {
  return arrArg.filter(function(elem, pos,arr) {
    return arr.indexOf(elem) == pos;
  });
};
    
    Jollyclick.findOne({userVisions : req.body.username}).exec(function(err, user){
        if(err) console.log(err)
        
    
        if(req.body.remove == true){
            
    let purpose = req.body.purpose
    let data = req.body.data
    
    let datas = ["Nom", "Age", "Sexe", "Localisation", "Compétences","Objectifs", "Profession", "Personnalité", "Activité et matériel","Profils favoris", "Demandes", "Navigation"]
    
    if(purpose == 0){
      let dataIndex = user.Personnalisation.indexOf(datas[data]);
      user.Personnalisation.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 1){      
      let dataIndex = user.Matching.indexOf(datas[data]);
      user.Matching.splice(dataIndex, 1);
      user.save()
        
    }
    if(purpose == 2){      
      let dataIndex = user.Publicite.indexOf(datas[data]);
      user.Publicite.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 3){      
      let dataIndex = user.Statistiques.indexOf(datas[data]);
      user.Statistiques.splice(dataIndex, 1);
      user.save()
    }
    if(purpose == 4){      
      let dataIndex = user.Recherche.indexOf(datas[data]);
      user.Recherche.splice(dataIndex, 1);
      user.save()
    }
            
            
        }
        
        else {
            let purpose = req.body.purpose
    let data = req.body.data
    
    let datas = ["Nom", "Age", "Sexe", "Localisation", "Compétences", "Profession", "Personnalité", "Activité et matériel"]
    
    if(purpose == 0){
       user.Personnalisation.push(datas[data])
        let newArray = uniqueArray(user.Personnalisation)
         user.Personnalisation = newArray
        user.save()
    }
    if(purpose == 1){user.Matching.push(datas[data])
         let newArray = uniqueArray(user.Matching)
         user.Matching = newArray

        user.save()
        
    }
    if(purpose == 2){user.Publicite.push(datas[data])
         let newArray = uniqueArray(user.Publicite)
         user.Publicite= newArray
        user.save()
    }
    if(purpose == 3){user.Statistiques.push(datas[data])
         let newArray = uniqueArray(user.Statistiques)
         user.Statistiques = newArray        
         user.save()
    }
    if(purpose == 4){user.Recherche.push(datas[data])
         let newArray = uniqueArray(user.Recherche)
         user.Recherche = newArray        
         user.save()
    }
            
        }
        
    })
}