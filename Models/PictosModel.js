var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PictosModelSchema = new Schema({
    Education : String,
    Religion : String,
    Photos : String,
    Localisation : String,
    TwitterPosts : String,
    GoogleDriveData : String, 
    SituationAmoureuse : String,
    Emploi : String,
    FacebookPosts : String
    
})


module.exports = mongoose.model('PictosModel', PictosModelSchema);