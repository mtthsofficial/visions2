var User = require("../Models/UserModel")
let authorization = ("../Models/AuthorizationModel")
let services = require("../Models/ServiceModel")


exports.index = function(req, res){
    
    User.findOne({name : req.cookies.userID}).exec(function(err, user){
        if(err) console.log(err)
        
        let idsArray = []
        
        for(let i =0; i<user.Preferences.Personnalisation.length; i++){
            if(user.Preferences.Personnalisation[i]=="Personnel"){idsArray.push("1")}
            if(user.Preferences.Personnalisation[i]=="Professionnel"){idsArray.push("6")}
            if(user.Preferences.Personnalisation[i]=="Intime"){idsArray.push("11")}

        }
        for(let i =0; i<user.Preferences.Publicite.length; i++){
            if(user.Preferences.Publicite[i]=="Personnel"){idsArray.push("2")}
            if(user.Preferences.Publicite[i]=="Professionnel"){idsArray.push("7")}
            if(user.Preferences.Publicite[i]=="Intime"){idsArray.push("12")}

        }
        for(let i =0; i<user.Preferences.Recherche.length; i++){
            if(user.Preferences.Recherche[i]=="Personnel"){idsArray.push("3")}
            if(user.Preferences.Recherche[i]=="Professionnel"){idsArray.push("8")}
            if(user.Preferences.Recherche[i]=="Intime"){idsArray.push("13")}

        }
        for(let i =0; i<user.Preferences.Marketing.length; i++){
            if(user.Preferences.Marketing[i]=="Personnel"){idsArray.push("4")}
            if(user.Preferences.Marketing[i]=="Professionnel"){idsArray.push("9")}
            if(user.Preferences.Marketing[i]=="Intime"){idsArray.push("14")}

        }
        for(let i =0; i<user.Preferences.Revente.length; i++){
            if(user.Preferences.Revente[i]=="Personnel"){idsArray.push("5")}
            if(user.Preferences.Revente[i]=="Professionnel"){idsArray.push("10")}
            if(user.Preferences.Revente[i]=="Intime"){idsArray.push("15")}

        }
            console.log(idsArray)
            console.log(JSON.stringify(idsArray))
            res.cookie("idsArray", idsArray.toString()).render("controler")
    })
    
    
}