var express = require('express');
var router = express.Router();
var stock = require('../Controllers/stockController')

router.post('/', stock.setAuthor)



module.exports = router;