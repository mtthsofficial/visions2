var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var serviceSchema = new Schema(
    {
    name: String,
    DataUse: [{type : Schema.ObjectId, ref : 'DataPurpose'}],
    Purposes : [],
    Personnalisation : [],
    Recherche : [],
    Statistiques : [],
    Matching : [],
    Publicite : [],
    Data : [],
    users : [{type : Schema.ObjectId, ref : 'User'}]
    });

serviceSchema.methods.getDataNames = function(serviceName, idUser){
    var service = mongoose.model('Service', serviceSchema).findOne({name : serviceName});
    var dataNamesArray = []
    for (let i=0; i<service.DataUse.length; i++){
        dataNamesArray.push(service.DataUse[i].data.name)
    }
    return dataNamesArray
}

serviceSchema.methods.getPurposeNames = function(serviceName, idUser){
    var service = mongoose.model('Service', serviceSchema).findOne({name : serviceName});
    var purposeNamesArray = []
    for (let i=0; i<service.DataUse.length; i++){
        purposeNamesArray.push(service.DataUse[i].purpose.name)
    }
    return purposeNamesArray
}
    
module.exports = mongoose.model('Service', serviceSchema);
