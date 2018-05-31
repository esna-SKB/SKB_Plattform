
var express = require('express')
  , router = express.Router()

router.use('/api/account', require('./account'))
router.use('/user', require('./user'))


router.get('/', function(req, res) {
	console.log("index call /");
	res.send('hello index there');
	res.end();
})

router.get('/test', function(req, res) {
  res.send('test there');
  res.end();
})


module.exports = router
