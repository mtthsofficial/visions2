var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var causeSchema = new Schema({
    name : String,
    datas : [{type : Schema.ObjectId, ref : 'Data'}],
    purposes : [{type : Schema.ObjectId, ref : 'Purpose'}],
    DataPurposes : [{type: Schema.ObjectId, ref: 'DataPurpose'}]

})

module.exports = mongoose.model('Cause', causeSchema);
