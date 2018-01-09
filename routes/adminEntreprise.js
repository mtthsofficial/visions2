var express = require('express');
var router = express.Router();
var adminEntrepriseController = require("../Controllers/adminEntrepriseController")


router.get('/', function(req, res){
    res.render('adminEntreprise')
});

router.post('/', adminEntrepriseController.updateService);

module.exports = router;