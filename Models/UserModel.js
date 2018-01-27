var mongoose = require('mongoose');
var Data = require("../Models/DataModel");
var Purpose = require("../Models/PurposeModel");
var Service = require('../Models/ServiceModel');
var DataPurpose = require('../Models/DataPurposeModel');
var Authorization = require('../Models/AuthorizationModel');
var User = require('../Models/UserModel');
var async = require('async');
var SchemaTypes = mongoose.Schema.Types;
require('mongoose-double')(mongoose)
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var userSchema = new Schema({ 
    name : {type : String, required : true, unique : true},
    password: String,
    Jollyclick : String,
    Kawaa : String,
    email: {type : String, required : true, unique : true}, 
    services: [{type: Schema.ObjectId, ref: 'Service'}],
    infoServices: [{type:[String]}],
    authorizations : [{type: Schema.ObjectId, ref: 'Authorization'}],
    availableData: [{type: Schema.ObjectId, ref: 'Data'}],
    preferedAuthorizations : {type: Schema.ObjectId, ref: 'Authorization'},
    Data : { id : Number,
                avalaible : false,
                FacebookPhotos : String, 
                FacebookLocation : String,
                FacebookRelationship : String,
                FacebookReligion : String,
                FacebookWork : [],
                FacebookEducation : [], 
                FacebookPosts : [],
                TwiiterPosts : [],
                GoogleDriveData : [],
                
                Personnel : {
                    Birthday : " ",
                    Address : " ",
                    Gender : " ""
                },
                Professionnel : {
                    EducationLevel : " ",
                    SchoolsAttended : [],
                    Fields : [],
                    PreviousWorks : [],
                    CurrentWork : " ",
                    Salary : " "
                },
                Intime : {
                    Family : " ",
                    Kids : " ",
                    Sexuality : " ",
                    LeasureSpendings : " ",
                    CommoditySpendings : " ",
                    Hobbies : [],
                    Sports : [],
                    Smoking : " ",
                    Weight : " ",
                    Religion : " ",
                    MovieFav : " ",
                    BookFav : " ",
                    DocFreq : " "
                }
    },
    Preferences : {
        Personnalisation : [],
        Marketing : [],
        Recherche : [],
        Publicite : [],
        Revente : []
    },
    Wallet : {type : SchemaTypes.Double, default: 0.0},
    Associations : [],
    GoogleTokens : {
        access_token : String,
        refresh_token : String
    },
    AskedServices : [], 
    Payed : {
        service1 : false,
        service2 : false,
        service3 : false
    }
});

mongoose.model('User', userSchema)

userSchema.statics.registerUser = function(idUser, pw){
   var user = new userSchema({
     
        name : idUser,
        password: pw
    })
    
    user.save(function (err){
        if (err) return console.log(err)
    });
}

userSchema.methods.getServicesNames = function(idUser){
    var servicesNames = []
    userSchema.findOne({name : idUser}).populate('services').exec(function (err, user){
    
    if (err) return console.log(err)
    
    for (let i=0; i<user.services.length; i++){
        
        servicesNames.push(user.services[i].name)
    }})
    return servicesNames
}



userSchema.statics.setPreferedAuthorizations = function(idUser, preferences1, preferences2, preferences3){
    
    let dataNames = ['Email', "Genre", 'Formation']
    let purposeNames = ['Publicité', 'Recherche','Marketing', 'Personnalisation', 'Echange']
  
  
    
    async.series([getData, getPurposes, getService, getUser, createDataPurposes], 
        function(err, results){
        if (err) return console.log(err)
        
        Authorization.create({user : results[3]._id, service : results[2]._id}, function (err, authorization){
             if (err) return console.log(err)
             
             
        async.series([function(callback7){
            for (let j =0; j<dataNames.length; j++){
                 
                results[4][j].data = results[0][j]._id
                
                results[4][j].save()
                
                if (j == dataNames.length-1){callback7()}
                 
             }},function(callback8){
                 for (let r = 0; r<preferences1.length; r++){
                
                    if (preferences1[r]=='on'){
                       results[4][0].purposes.push(results[1][r])
                       results[4][0].save()
                        
                    }     
                    
                     if (preferences2[r]=='on'){
                       results[4][1].purposes.push(results[1][r])
                       results[4][1].save()
                        
                    } 
                    
                     if (preferences3[r]=='on'){
                       results[4][2].purposes.push(results[1][r])
                       results[4][2].save()
                        
                    } 
                     
                 }
                 
             }, function(err, results2){
                 if (err) return console.log(err)
                 for (let g=0; g<results[4].length; g++){
                      authorization.authorizations.push(results[4][g]._id) 
                      authorization.save()
                      
                      if (authorization.authorizations.length==results[4].length){
                          
                          results[3].authorizations.push(authorization)
                          results[3].save()
                      }

                 }
                 
                 
                 
             }])
            
        })
        
        
    })
    
    function getUser(callback6){
    userSchema.findOne({name : idUser}, function (err, user){
        if (err) console.log(err)
        
        callback6(user)
    })
    
    
}
    
    function getData(callback1){
          let datas = []
        for(let i =0; i<dataNames.length; i++){
            
        Data.findOne({name : dataNames[i]}).exec(function(err, data) {
            if (err) return console.log(err)
            datas.push(data)
            
            if(dataNames.length==datas.length){callback1(null, datas)}
        
        })
        
        
        
        
            
    }
    
}

    function getPurposes(callback2){
            let purposes = []
        for(let i =0; i<purposeNames.length; i++){
            
        Purpose.findOne({name : purposeNames[i]}).exec(function(err, purpose) {
            if (err) return console.log(err)
            purposes.push(purpose)
            
            if(purposeNames.length==purposes.length){callback2(null, purposes)}
        
        })
        
        
        
        
            
    }
    
}

function getService(callback4){

    Service.findOne({name : 'Prefered'}).exec(function(err, service) {
          if (err) return console.log(err)

         callback4(null, service)
          
    })
    
}

function createDataPurposes(callback5){
    let authorizations = []
    for (let i = 0; i<dataNames.length; i){
            DataPurpose.create(function(err, datapurp){
                 if (err) return console.log(err)
                 authorizations.push(datapurp)
                if (dataNames.length == authorizations.length){
                    callback5(authorizations)
                }
                
            })
            
        }
    
    
}
}



userSchema.statics.setAuthorizations = function(idUser, preferences1, preferences2, preferences3, idService){
    
    let dataNames = ['Email', "Genre", 'Formation']
    let purposeNames = ['Publicité', 'Recherche','Marketing', 'Personnalisation', 'Echange']
  
  
    
    async.series([getData, getPurposes, getService, getUser, createDataPurposes], 
        function(err, results){
        if (err) return console.log(err)
        
        Authorization.create({user : results[3]._id, service : results[2]._id}, function (err, authorization){
             if (err) return console.log(err)
             
             
        async.series([function(callback7){
            for (let j =0; j<dataNames.length; j++){
                 
                results[4][j].data = results[0][j]._id
                
                results[4][j].save()
                
                if (j == dataNames.length-1){callback7()}
                 
             }},function(callback8){
                 for (let r = 0; r<preferences1.length; r++){
                
                    if (preferences1[r]=='on'){
                       results[4][0].purposes.push(results[1][r])
                       results[4][0].save()
                        
                    }     
                    
                     if (preferences2[r]=='on'){
                       results[4][1].purposes.push(results[1][r])
                       results[4][1].save()
                        
                    } 
                    
                     if (preferences3[r]=='on'){
                       results[4][2].purposes.push(results[1][r])
                       results[4][2].save()
                        
                    } 
                     
                 }
                 
             }, function(err, results2){
                 if (err) return console.log(err)
                 for (let g=0; g<results[4].length; g++){
                      authorization.authorizations.push(results[4][g]._id) 
                      authorization.save()
                      
                      if (authorization.authorizations.length==results[4].length){
                          
                          results[3].authorizations.push(authorization)
                          results[3].save()
                      }

                 }
                 
                 
                 
             }])
            
        })
        
        
    })

function getUser(callback6){
    userSchema.findOne({name : idUser}, function (err, user){
        if (err) console.log(err)
        
        callback6(user)
    })
    
    
}
    
    function getData(callback1){
          let datas = []
        for(let i =0; i<dataNames.length; i++){
            
        Data.findOne({name : dataNames[i]}).exec(function(err, data) {
            if (err) return console.log(err)
            datas.push(data)
            
            if(dataNames.length==datas.length){callback1(null, datas)}
        
        })
        
        
        
        
            
    }
    
}

    function getPurposes(callback2){
            let purposes = []
        for(let i =0; i<purposeNames.length; i++){
            
        Purpose.findOne({name : purposeNames[i]}).exec(function(err, purpose) {
            if (err) return console.log(err)
            purposes.push(purpose)
            
            if(purposeNames.length==purposes.length){callback2(null, purposes)}
        
        })
        
        
        
        
            
    }
    
}

function getService(callback4){

    Service.findOne({name : idService}).exec(function(err, service) {
          if (err) return console.log(err)

         callback4(null, service)
          
    })
    
}

function createDataPurposes(callback5){
    let authorizations = []
    for (let i = 0; i<dataNames.length; i){
            DataPurpose.create(function(err, datapurp){
                 if (err) return console.log(err)
                 authorizations.push(datapurp)
                if (dataNames.length == authorizations.length){
                    callback5(authorizations)
                }
                
            })
            
        }
    
    
}
    
    
}


userSchema.methods.setAuthorization = function(idUser, rowIndex, cellIndex, serviceName){
   let user = mongoose.model('User', userSchema).findOne({name : idUser}).populate('authorizations').exec(function (err, user){
        if (err) return console.log(err)
        else return user;
    });
    let service = Service.findOne({name : serviceName}).exec(function (err, service){
        if (err) return console.log(err)
        else return service
    });
    let purpose = Purpose.findOne({uniqueID : cellIndex}).exec(function (err, purpose){
        if (err) return console.log(err)
        else return purpose
    });
    let data = Data.findOne({uniqueID: rowIndex}).exec(function (err, data){
        if (err) return console.log(err)
        else return data
    });
    
    let dataPurpose = new DataPurpose({data: data._id, purpose: [purpose._id]});
    dataPurpose.save(function (err){if (err) return console.log(err)});
    let bool = false
   
    
    for (let i=0; i<user.authorizations.length; i++){
        if (user.authorizations[i].service == service._id){
            user.authorizations[i].authorizations.push(dataPurpose._id)
            bool = true
        }

    }
    // how do we add just one element to property of object that is array ?
    // we store the same info several times, how do we prevent this ?
    if (bool == false){
        let authorization = new Authorization({user : user._id, service: service._id, authorizations: [dataPurpose._id]})
        authorization.save(function (err){if (err) return console.log(err)});
        user.authorizations.push(authorization._id)
        user.services.push(service._id)
    }
    user.save()
    
}

userSchema.plugin(uniqueValidator)

mongoose.model('User', userSchema)


module.exports = mongoose.model('User', userSchema)
