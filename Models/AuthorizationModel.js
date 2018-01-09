var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorizationSchema = new Schema({
 
    user : {type : Schema.ObjectId, ref : 'User'},
    service : {type : Schema.ObjectId, ref : 'Service'},
    authorizations : [{type: Schema.ObjectId, ref: 'DataPurpose'}]
   
})

module.exports = mongoose.model('Authorization', authorizationSchema);
