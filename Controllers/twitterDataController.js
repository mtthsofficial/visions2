var service = require("../Models/ServiceModel")
var dataPurpose = require("../Models/DataPurposeModel")
var data = require("../Models/DataModel")
var Purpose = require("../Models/PurposeModel")
var userModel = require("../Models/UserModel")
var OAuth = require("oauth")
var aesjs = require('aes-js');


exports.index = function (req, res){
   var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'IA33jH0cmfJIReEwHl50RZBxT',
      'A7SgfGrqh0YM9waFoQ5HziV0L7jBp49RItAv6xZTBMvPkVKaDq',
      '1.0A',
      "https://visions-2-mtths.c9users.io/",
      'HMAC-SHA1'
    );
     console.log("verifier: "+req.query.oauth_verifier)
     console.log("verifier: "+req.query.oauth_token)
     
     console.log("cookies: "+req.cookies.token_secret)
     
     res.render('accueil')
     
 //var orderedParameters = oauth._prepareParameters("IA33jH0cmfJIReEwHl50RZBxT", "A7SgfGrqh0YM9waFoQ5HziV0L7jBp49RItAv6xZTBMvPkVKaDq", "POST", "https://api.twitter.com/oauth/request_token")

        


    oauth.getOAuthAccessToken(req.query.oauth_token, req.cookies.token_secret,  req.query.oauth_verifier, function(err, oauth_access_token, oauth_access_token_secret, results){
       if(err) console.log(err)
       console.log("getAT: "+oauth_access_token) 
     //var orderedParameters2 = oauth._prepareParameters(token, token_secret, "GET", "https://api.twitter.com/1.1/statuses/user_timeline.json", [["oauth_token"][res]])
       
       
       oauth.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json',
      oauth_access_token, //test user token
      oauth_access_token_secret,
      function (e, data, res){
        if (e) console.error(e);        
        userModel.findOne({name : req.cookies.userID}).exec(function(err, user){
            if(err) console.log(err)
          var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];  
        var aesCtrPosts = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
        var encryptedPosts = aesCtrPosts.encrypt(aesjs.utils.utf8.toBytes(data));
        var encryptedPostsHex = aesjs.utils.hex.fromBytes(encryptedPosts);   
            
            user.Data.TwiiterPosts.push(encryptedPostsHex)
            user.save()
            
        })

            
      });   
       
       
       
    })
    
    //oauth.getOAuthAccessToken()
    
    
    
    
  
}