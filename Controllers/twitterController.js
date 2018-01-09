var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")
var OAuth = require("oauth")


exports.index = function (req, res){
   var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'IA33jH0cmfJIReEwHl50RZBxT',
      'A7SgfGrqh0YM9waFoQ5HziV0L7jBp49RItAv6xZTBMvPkVKaDq',
      '1.0A',
      "https://visions-2-mtths.c9users.io/twitterData",
      'HMAC-SHA1'
    );
    
    var orderedParameters = oauth._prepareParameters("IA33jH0cmfJIReEwHl50RZBxT", "A7SgfGrqh0YM9waFoQ5HziV0L7jBp49RItAv6xZTBMvPkVKaDq", "POST", "https://api.twitter.com/oauth/request_token")
    oauth._buildAuthorizationHeaders(orderedParameters) 
    oauth.getOAuthRequestToken(orderedParameters, function(err, token, token_secret, parsedQueryString) {
        if(err) console.log(err);
        console.log('token1 :'+token)
        
        res.cookie("token_secret", token_secret).redirect("https://api.twitter.com/oauth/authorize?oauth_token="+token)
    })
    
    //oauth.getOAuthAccessToken()
    
    
    
    
  
}

