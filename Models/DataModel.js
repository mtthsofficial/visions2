var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var db = mongoose.connection;
autoIncrement.initialize(db);

var dataSchema = new Schema({

    uniqueID : Number,
    name : String,
    causes : [{type : Schema.ObjectId, ref : 'Cause'}] 
});


dataSchema.plugin(autoIncrement.plugin, { model: 'Data', field: 'uniqueID', startAt : 5});

module.exports = mongoose.model('Data', dataSchema);
