//Express, is a web application framework require
let express = require('express');
//Web frameworks provide resources such as HTML pages routes
let router = express.Router();

/* GET home page. */
router.get('/', function(res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
