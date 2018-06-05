
var express = require('express')
  , router = express.Router()

router.use('/account', require('./account'))
router.use('/user', require('./user'))
router.use('/course', require('./course'))
router.use('/message', require('./message'))

router.use('/timeline', require('./message'))
router.use('/userSession', require('./userSession'))
//router.use('/article', require('./article'))

router.get('/', function(req, res) {
	console.log("index call /");
	res.status(214).send('hello index there');
	res.end();
})

module.exports = router
