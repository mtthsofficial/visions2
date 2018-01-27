var Authorization = require("../Models/AuthorizationModel")
var User = require("../Models/UserModel")
var Service = require("../Models/ServiceModel")
var Data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")
var testDB = require('../Models/testDBModel');
var DataPurpose = require('../Models/DataPurposeModel')
var jollyclick = require('../Models/jollyclickModel')
var async = require('async')
var aesjs = require('aes-js');


exports.setAuthor = function(req, res){
    console.log(req.body)
    let userID = req.cookies.userID
    
    let form = req.body.category
    
    let data = req.body.data
    
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    
    console.log(data) 
    
    if (form == 'personnel'){
        
        User.findOne({name : userID}).exec(function(err, user){
            if (err) console.log(err)
            
            user.Data.avalaible = true
            
            var aesCtrAddress = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedAddress = aesCtrAddress.encrypt(aesjs.utils.utf8.toBytes(data[0]));
            var encryptedAddressHex = aesjs.utils.hex.fromBytes(encryptedAddress);
            user.Data.Personnel.Address = encryptedAddressHex
            
            var aesCtrGender= new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedGender = aesCtrGender.encrypt(aesjs.utils.utf8.toBytes(data[1]));
            var encryptedGenderHex = aesjs.utils.hex.fromBytes(encryptedGender);
            user.Data.Personnel.Gender = encryptedGenderHex
            
            var aesCtrBirthday = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBirthday = aesCtrBirthday.encrypt(aesjs.utils.utf8.toBytes(data[2]));
            var encryptedBirthdayHex = aesjs.utils.hex.fromBytes(encryptedBirthday);
            user.Data.Personnel.Birthday = encryptedBirthdayHex 
            
            user.save()
            
        })
        
    }

    if (form == 'professionnel'){
        
        console.log(data)
        
        User.findOne({name : userID}).exec(function(err, user){
            if (err) console.log(err)
            
            
                        user.Data.avalaible = true

            
            var aesCtrEducationLevel = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedEducationLevel = aesCtrEducationLevel.encrypt(aesjs.utils.utf8.toBytes(data[0]));
            var encryptedEducationLevelHex = aesjs.utils.hex.fromBytes(encryptedEducationLevel);
            user.Data.Professionnel.EducationLevel = encryptedEducationLevelHex
            
            let schools = data[1].split(",")
            user.Data.Professionnel.SchoolsAttended = []
            for(let i=0; i<schools.length; i++){
            var aesCtrSchoolsAttended = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedSchoolsAttended = aesCtrSchoolsAttended.encrypt(aesjs.utils.utf8.toBytes(schools[i]));
            var encryptedSchoolsAttendedHex = aesjs.utils.hex.fromBytes(encryptedSchoolsAttended);
            user.Data.Professionnel.SchoolsAttended.push(encryptedSchoolsAttendedHex)
            }
            
            let fields = data[2].split(",")
            user.Data.Professionnel.Fields = []
            for(let i=0; i<fields.length; i++){
                var aesCtrField = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                var encryptedField = aesCtrField.encrypt(aesjs.utils.utf8.toBytes(fields[i]));
                var encryptedFieldHex = aesjs.utils.hex.fromBytes(encryptedField);
                user.Data.Professionnel.Fields.push(encryptedFieldHex)                
            }
            
            let previousWorks = data[3].split(",")
            user.Data.Professionnel.PreviousWorks=[]
            for(let j=0; j<previousWorks.length; j++){
                var aesCtrpreviousWork = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                var encryptedPreviousWork = aesCtrpreviousWork.encrypt(aesjs.utils.utf8.toBytes(previousWorks[j]));
                var encryptedPreviousWorkHex = aesjs.utils.hex.fromBytes(encryptedPreviousWork);
                user.Data.Professionnel.PreviousWorks.push(encryptedPreviousWorkHex)                
                
            }
            
            var aesCtrCurrentWork = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedCurrentWork = aesCtrCurrentWork.encrypt(aesjs.utils.utf8.toBytes(data[4]));
            var encryptedCurrentWorkHex = aesjs.utils.hex.fromBytes(encryptedCurrentWork);            
            user.Data.Professionnel.CurrentWork = encryptedCurrentWorkHex
            
            var aesCtrSalary = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedSalary = aesCtrSalary.encrypt(aesjs.utils.utf8.toBytes(data[5]));
            var encryptedSalaryHex = aesjs.utils.hex.fromBytes(encryptedSalary);
            user.Data.Professionnel.Salary = encryptedSalaryHex
            
            
            user.save()
            
        })
        
    }

    if (form == 'intime'){
     
        console.log(data)
        User.findOne({name : userID}).exec(function(err, user){
            if (err) console.log(err)
            
                        user.Data.avalaible = true

            var aesCtrFamily = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedFamily = aesCtrFamily.encrypt(aesjs.utils.utf8.toBytes(data[0]));
            var encryptedFamilyHex = aesjs.utils.hex.fromBytes(encryptedFamily);            
            user.Data.Intime.Family = encryptedFamilyHex
            
            var aesCtrKids = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedKids = aesCtrKids.encrypt(aesjs.utils.utf8.toBytes(parseInt(data[1])));
            var encryptedKidsHex = aesjs.utils.hex.fromBytes(encryptedKids);
            user.Data.Intime.Kids = encryptedKidsHex
            
            var aesCtrSexuality = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedSexuality = aesCtrSexuality.encrypt(aesjs.utils.utf8.toBytes(data[2]));
            var encryptedSexualityHex = aesjs.utils.hex.fromBytes(encryptedSexuality);
            user.Data.Intime.Sexuality = encryptedSexualityHex
            
            var aesCtrLeasureSpendings = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedLeasureSpendings = aesCtrLeasureSpendings.encrypt(aesjs.utils.utf8.toBytes(data[3]));
            var encryptedLeasureSpendingsHex = aesjs.utils.hex.fromBytes(encryptedLeasureSpendings);
            user.Data.Intime.LeasureSpendings = encryptedLeasureSpendingsHex
            
            var aesCtrCommoditySpendings = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedCommoditySpendings = aesCtrCommoditySpendings.encrypt(aesjs.utils.utf8.toBytes(parseInt(data[4])));
            var encryptedCommoditySpendingsHex = aesjs.utils.hex.fromBytes(encryptedCommoditySpendings);
            user.Data.Intime.CommoditySpendings = encryptedCommoditySpendingsHex
            
            let hobbies = data[5].split(",")
            console.log(hobbies)
            user.Data.Intime.Hobbies=[]
            for(let i=0; i<hobbies.length;i++){
            var aesCtrHobbies = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedHobbies = aesCtrHobbies.encrypt(aesjs.utils.utf8.toBytes(hobbies[i]));
            var encryptedHobbiesHex = aesjs.utils.hex.fromBytes(encryptedHobbies);
            user.Data.Intime.Hobbies.push(encryptedHobbiesHex)}
            
            
            let sports= data[6].split(',')
            user.Data.Intime.Sports = []
            for(let i =0; i<sports.length; i++){
                
                var aesCtrSport = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                var encryptedSport = aesCtrSport.encrypt(aesjs.utils.utf8.toBytes(sports[i]));
                var encryptedSportHex = aesjs.utils.hex.fromBytes(encryptedSport);
                user.Data.Intime.Sports.push(encryptedSportHex)   
                
            }

            
            var aesCtrSmoking = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedSmoking = aesCtrSmoking.encrypt(aesjs.utils.utf8.toBytes(data[7]));
            var encryptedSmokingHex = aesjs.utils.hex.fromBytes(encryptedSmoking);            
            user.Data.Intime.Smoking = encryptedSmokingHex

            var aesCtrWeight = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedWeight = aesCtrWeight.encrypt(aesjs.utils.utf8.toBytes(parseInt(data[8])));
            var encryptedWeightHex = aesjs.utils.hex.fromBytes(encryptedWeight);              
            user.Data.Intime.Weight = encryptedWeightHex
            
            var aesCtrReligion = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedReligion = aesCtrReligion.encrypt(aesjs.utils.utf8.toBytes(data[9]));
            var encryptedReligionHex = aesjs.utils.hex.fromBytes(encryptedReligion);   
            user.Data.Intime.Religion = encryptedReligionHex
            
            var aesCtrPolitics = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedPolitics = aesCtrPolitics.encrypt(aesjs.utils.utf8.toBytes(data[10]));
            var encryptedPoliticsHex = aesjs.utils.hex.fromBytes(encryptedPolitics);   
            user.Data.Intime.Politics = encryptedPoliticsHex      
            
            var aesCtrDoc = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedDoc = aesCtrDoc.encrypt(aesjs.utils.utf8.toBytes(parseInt(data[11])));
            var encryptedDocHex = aesjs.utils.hex.fromBytes(encryptedDoc);   
            user.Data.Intime.DocFreq = encryptedDocHex
            
            console.log(data[12])
            
            var aesCtrMovie = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedMovie = aesCtrMovie.encrypt(aesjs.utils.utf8.toBytes(data[12]));
            var encryptedMovieHex = aesjs.utils.hex.fromBytes(encryptedMovie);   
            user.Data.Intime.MovieFav = encryptedMovieHex
            
            console.log(data[13])

            var aesCtrBookFav = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
            var encryptedBookFav = aesCtrBookFav.encrypt(aesjs.utils.utf8.toBytes(data[13]));
            var encryptedBookFavHex = aesjs.utils.hex.fromBytes(encryptedBookFav);   
            user.Data.Intime.BookFav = encryptedBookFavHex
            
            user.save()

            
        })
        
    }

}