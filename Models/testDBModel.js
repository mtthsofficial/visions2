var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestDBSchema = new Schema({
    username : String,
    Publicite : {
    Location : String,
    Education : [], 
    Work : [],
    Relationship : String},
    Marketing : {
    Location : String,
    Education : [], 
    Work : [],
    Relationship : String},
     Personnalisation : {
    Location : String,
    Education : [], 
    Work : [],
    Relationship : String},
     Recherche : {
    Location : String,
    Education : [], 
    Work : [],
    Relationship : String}

})

module.exports = mongoose.model('TestDB', TestDBSchema);