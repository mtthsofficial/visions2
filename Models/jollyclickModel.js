var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jollyclickSchema = new Schema({
    username : String,
    Location : String,
    Education : [], 
    Work : []

})

module.exports = mongoose.model('JollyClick', jollyclickSchema);