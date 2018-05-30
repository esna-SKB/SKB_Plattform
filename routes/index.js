
var express = require('express')
  , router = express.Router()

router.use('/account', require('./account'))
router.use('/user', require('./user'))
router.use('/course', require('./course'))

router.get('/', function(req, res) {
	console.log("index call /"); 
	res.send('hello index there');
	res.end();
})
module.exports = router