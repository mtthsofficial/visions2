var dataPurposeModel = require("../Models/DataPurposeModel")
var userModel = require("../Models/UserModel")
let services = require("../Models/ServiceModel")
let authorization = require("../Models/AuthorizationModel")
let dataModel = require("../Models/DataModel")
let purposeModel = require("../Models/PurposeModel")
let causeModel = require("../Models/CauseModel")
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');
var async = require('async');


//need to make sure userID is passed to this request !!!


exports.index = function (req, res){

    var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '1062718516916-0cam7cggf18l1sjhqsia5oitq181legn.apps.googleusercontent.com',"fQYSseaWA4w5_ZSPb9_G1i2v","https://visions-mtths.c9users.io/googleData"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
/*var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];*/

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: 'https://www.googleapis.com/auth/drive',

  // Optional property that passes state parameters to redirect URI
  // state: 'foo'
});

res.redirect(url)

    
    
}