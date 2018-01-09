var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ServiceExempleSchema = new Schema({
    name : String,
    Purpose : String,
    Price : String, 
    Logo : String

})

module.exports = mongoose.model('ServiceExemple', ServiceExempleSchema);