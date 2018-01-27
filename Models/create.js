var mongoose = require('mongoose');
var aesjs = require('aes-js');
var Service = require('../Models/ServiceModel')
var DataPurpose = require('../Models/DataPurposeModel')
var Authorization = require('../Models/AuthorizationModel')
var association = require('../Models/associationModel')
var User = require('../Models/UserModel')
var testDB = require('../Models/testDBModel');

var Data = require('../Models/DataModel')
var Purpose = require('../Models/PurposeModel')
var jollyclick = require('../Models/jollyclickModel')

var mongoDB = 'mongodb://mtths:Visions-database-19@ds161455.mlab.com:61455/visions';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*var twiaup = new Service({name : 'TwiAUP'})
twiaup.save( function (err, service) {
  if (err) return console.log(err);

})*/
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
            var aesCtrSalary = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedSalary = aesCtrSalary.encrypt(aesjs.utils.utf8.toBytes(" "));
            var encryptedSalaryHex = aesjs.utils.hex.fromBytes(encryptedSalary);
            console.log(encryptedSalaryHex)



/*
User.findOne({name : 'testuser'}, function (err, user){
  if (err) {console.log(err)}
  
  Service.findOne({name : 'TwiAUP'}, function(err, service){
    if (err) {console.log(err)}
    
    var serviceID = service._id
    var dataPurp = service.DataUse[0]
    
    user.services.push(serviceID)
    
    Authorization.create({user : user._id, service : serviceID, authorizations : dataPurp}, function (err, result){
      if (err) {console.log(err)}
      
      user.authorizations.push(result._id)
      user.save()
      
    })
    
    
  })
  
  
})


// UPDATE SERVICE WITH DP
/*
Data.findOne({uniqueID : 4}, function(err, res1){
  if (err){console.log(err)}
  
  var dataID = res1._id
  
  Purpose.findOne({uniqueID : 4}, function(err, res2){
  if (err){console.log(err)}
  var purposeID = res2._id
  
  DataPurpose.create({data : dataID, purpose : [purposeID]}, function (err, res){
    if (err) console.log(err)
    
    var dpID = res._id
    
    Service.findOneAndUpdate({name : 'TwiAUP'}, {DataUse : [dpID]}, function(err, result){
      if(err) {console.log(err)}
      
      
    })
    
  })
  
  })
  
})*/

/*ADD DATA TO DATA PURPOSES
Data.find(function (err, datas){
    if (err) console.log(err)
  
DataPurpose.find(function(err, datapurposes){
    if (err) console.log(err)
    
        datapurposes[0].data = datas[0]._id
        datapurposes[0].save(function(err){
                if(err) console.log(err)
            })
    
     datapurposes[1].data = datas[1]._id
        datapurposes[1].save(function(err){
                if(err) console.log(err)
            })
             datapurposes[2].data = datas[2]._id
        datapurposes[2].save(function(err){
                if(err) console.log(err)
            })
    })
    })
        
    
    

        
    
    
    


/*ADD ALL PURPOSES TO DATAPURPOSES
Purpose.find( function(err, purposes){
    if (err) console.log(err)
    for(let j=0; j<purposes.length;j++){
    
DataPurpose.find(function (err, datapurposes){
        if(err) console.log(err)
        for(let i=0; i<datapurposes.length; i++){
            datapurposes[i].purpose.push(purposes[j]._id)
            datapurposes[i].save(function(err){
                if(err) console.log(err)
            })
        }
    })}
    
})


/*UPDATE SERVICE IN USER
var service1Id = Service.findOne({name :'JollyClick'},function (err, service) {
  if (err) return console.log(err);


User.findOneAndUpdate({name: 'testuser'}, {services:[service._id]},function(err, doc){
    if(err){
        console.log(err);
    }})})*/








/* CREATE USER SERVICE AND DATA PURPOSES
var testuser = new User({name : 'testuser', password :'love'})
testuser.save( function (err, user) {
  if (err) return console.log(err);

})

var data1 = Data.findOne({name : 'Email'}, function (err, data) {
  if (err) return console.log(err);
  return data
})

var data2 = Data.findOne({name : 'Profession'}, function (err, data) {
  if (err) return console.log(err);
  return data
})

var data3 = Data.findOne({name : 'Formation'}, function (err, data) {
  if (err) return console.log(err);
  return data
})

var purpose1 = Purpose.findOne({name : 'Personnalisation'}, function (err, purpose) {
  if (err) return console.log(err);
  return purpose
})

var purpose2 = Purpose.findOne({name : 'Statistiques'}, function (err, purpose) {
  if (err) return console.log(err);
  return purpose
})

var purpose3 = Purpose.findOne({name : 'Echange'}, function (err, purpose) {
  if (err) return console.log(err);
  return purpose
})*/




/*
var datapurpose1 = new DataPurpose()
    
datapurpose1.save( function (err, datapurpose) {
  if (err) return console.log(err);

});

var datapurpose2 = new DataPurpose()
    
datapurpose2.save( function (err, datapurpose) {
  if (err) return console.log(err);

});

var datapurpose3 = new DataPurpose()
    
datapurpose3.save( function (err, datapurpose) {
  if (err) return console.log(err);

});


Service.findOne({name: 'JollyClick'}, function(err, service){
    if(err) console.log(err)
    service.DataUse = [datapurpose1._id, datapurpose2._id, datapurpose3._id]
    service.save(function(err){
        if (err) console.log(err)
    })
})

/*CREATE SERVICE
var service1 = new Service({name : 'JollyClick', DataUse : [
    datapurpose1._id,  datapurpose2._id,  datapurpose3._id
    ], users : [testuser._id]})
    
service1.save(function (err, service) {
  if (err) return console.log(err);

})



/*PURPOSE CREATORS
var data1 = new Purpose({ uniqueID: 1, name : 'Personnalisation' });
data1.save( function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});

var data2 = new Purpose({ uniqueID: 2, name : 'Statistiques' });
data2.save( function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});

var data3 = new Purpose({ uniqueID: 3, name : 'Echange' });
data3.save( function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});

//DATA CREATORS
/*dataSchema.create({ uniqueID: 2, name : 'Formation' }, function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});
dataSchema.create({ uniqueID: 3, name : 'Profession' }, function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!


/*
var data2 = new Data({ uniqueID: 2, name : 'Profession' });
data2.save( function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});

var data3 = new Data({ uniqueID: 3, name : 'Formation' });
data3.save( function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});
/*dataSchema.create({ uniqueID: 2, name : 'Formation' }, function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});
dataSchema.create({ uniqueID: 3, name : 'Profession' }, function (err, awesome_instance) {
  if (err) return console.log(err);
  // saved!
});*/