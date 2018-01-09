var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PurposeDataSchema = new Schema({
   
     data : [{type : Schema.ObjectId, ref : 'Data'}],
    purpose : {type : Schema.ObjectId, ref : 'Purpose'},
     explanation : String,
     revenue : String, 
     control : String,
      service : [{type : Schema.ObjectId, ref : 'Service'}],
})



module.exports = mongoose.model('PurposeData', PurposeDataSchema);