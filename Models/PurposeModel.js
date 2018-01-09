var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

var purposeSchema = new Schema({

    uniqueID : Number,
    name : String
});
purposeSchema.plugin(autoIncrement.plugin, { model: 'Purpose', field: 'uniqueID', startAt : 5});
module.exports = mongoose.model('Purpose', purposeSchema);