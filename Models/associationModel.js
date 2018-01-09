var mongoose = require('mongoose');
var SchemaTypes = mongoose.Schema.Types;
require('mongoose-double')(mongoose)

var Schema = mongoose.Schema;

var associationSchema = new Schema({
    name : String,
    money : {type : SchemaTypes.Double, default: 0.0},
    dataDonations : 0

})

module.exports = mongoose.model('Association', associationSchema);