var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var dataPurposeSchema = new Schema({
   
     data : {type : Schema.ObjectId, ref : 'Data'},
    purpose : [{type : Schema.ObjectId, ref : 'Purpose'}],
     description : String
})



module.exports = mongoose.model('DataPurpose', dataPurposeSchema);
