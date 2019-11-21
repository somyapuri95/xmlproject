//Express, is a web application framework require
let express = require('express');
//Web frameworks provide resources such as HTML pages routes
let router = express.Router();

/* GET users listing. */
router.get('/', function(res) {
  res.send('respond with a resource');
});

module.exports = router;
