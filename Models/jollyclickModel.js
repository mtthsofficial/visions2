var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JollyclickSchema = new Schema({
 
    user : String,
    userVisions : String,
    DataKeys : [],
    Personnalisation : [],
    Recherche : [],
    Statistiques : [],
    Matching : [],
    Publicite : []
   
})

module.exports = mongoose.model('Jollyclick', JollyclickSchema);