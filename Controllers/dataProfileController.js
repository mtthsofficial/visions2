var User = require("../Models/UserModel")
let authorization = ("../Models/AuthorizationModel")
let services = require("../Models/ServiceModel")


exports.index = function(req, res){
    
    User.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
        let idsArray = []
        
        for(let i =0; i<user.Preferences.Personnalisation.length; i++){
            if(user.Preferences.Personnalisation[i]=="Email"){idsArray.push("1")}
            if(user.Preferences.Personnalisation[i]=="Bancaires"){idsArray.push("6")}
            if(user.Preferences.Personnalisation[i]=="Famille"){idsArray.push("11")}
            if(user.Preferences.Personnalisation[i]=="Amis"){idsArray.push("16")}
            if(user.Preferences.Personnalisation[i]=="Emploi"){idsArray.push("21")}
            if(user.Preferences.Personnalisation[i]=="Adresse"){idsArray.push("26")}
            if(user.Preferences.Personnalisation[i]=="Education"){idsArray.push("31")}
        }
        for(let i =0; i<user.Preferences.Publicite.length; i++){
            if(user.Preferences.Publicite[i]=="Email"){idsArray.push("2")}
            if(user.Preferences.Publicite[i]=="Bancaires"){idsArray.push("7")}
            if(user.Preferences.Publicite[i]=="Famille"){idsArray.push("12")}
            if(user.Preferences.Publicite[i]=="Amis"){idsArray.push("17")}
            if(user.Preferences.Publicite[i]=="Emploi"){idsArray.push("22")}
            if(user.Preferences.Publicite[i]=="Adresse"){idsArray.push("27")}
            if(user.Preferences.Publicite[i]=="Education"){idsArray.push("32")}
        }
        for(let i =0; i<user.Preferences.Recherche.length; i++){
            if(user.Preferences.Recherche[i]=="Email"){idsArray.push("3")}
            if(user.Preferences.Recherche[i]=="Bancaires"){idsArray.push("8")}
            if(user.Preferences.Recherche[i]=="Famille"){idsArray.push("13")}
            if(user.Preferences.Recherche[i]=="Amis"){idsArray.push("18")}
            if(user.Preferences.Recherche[i]=="Emploi"){idsArray.push("23")}
            if(user.Preferences.Recherche[i]=="Adresse"){idsArray.push("28")}
            if(user.Preferences.Recherche[i]=="Education"){idsArray.push("33")}
        }
        for(let i =0; i<user.Preferences.Marketing.length; i++){
            if(user.Preferences.Marketing[i]=="Email"){idsArray.push("4")}
            if(user.Preferences.Marketing[i]=="Bancaires"){idsArray.push("9")}
            if(user.Preferences.Marketing[i]=="Famille"){idsArray.push("14")}
            if(user.Preferences.Marketing[i]=="Amis"){idsArray.push("19")}
            if(user.Preferences.Marketing[i]=="Emploi"){idsArray.push("24")}
            if(user.Preferences.Marketing[i]=="Adresse"){idsArray.push("29")}
            if(user.Preferences.Marketing[i]=="Education"){idsArray.push("34")}
        }
        for(let i =0; i<user.Preferences.Revente.length; i++){
            if(user.Preferences.Revente[i]=="Email"){idsArray.push("5")}
            if(user.Preferences.Revente[i]=="Bancaires"){idsArray.push("10")}
            if(user.Preferences.Revente[i]=="Famille"){idsArray.push("15")}
            if(user.Preferences.Revente[i]=="Amis"){idsArray.push("20")}
            if(user.Preferences.Revente[i]=="Emploi"){idsArray.push("25")}
            if(user.Preferences.Revente[i]=="Adresse"){idsArray.push("30")}
            if(user.Preferences.Revente[i]=="Education"){idsArray.push("35")}
        }
            console.log(idsArray)
            console.log(JSON.stringify(idsArray))
            res.cookie("idsArray", idsArray.toString()).render("controler")
    })
    
    
}