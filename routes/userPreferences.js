var express = require('express');
var user = require("../Controllers/userPreferencesController")
var adminServiceController = require("../Controllers/adminServiceController")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
res.render('userPreferences', {userID : req.query.userID})
}
);

router.post('/', 
user.index
);


module.exports = router;