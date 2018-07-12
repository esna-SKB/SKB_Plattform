
var express = require('express')
  , router = express.Router()

router.use('/account', require('./account'))
router.use('/user', require('./user'))
router.use('/course', require('./course'))
router.use('/message', require('./message'))
router.use('/article', require('./article'))
router.use('/group', require('./group'))
router.use('/timeline', require('./timeline'))
router.use('/userSession', require('./userSession'))
router.use('/enrollment', require('./enrollment'))
router.use('/invitation', require('./invitation'))
router.use('/channel', require('./channel'))
router.use('/image', require('./image'))
router.use('/preference', require('./preference'))



router.get('/', function(req, res) {
	console.log("index call /");
	res.status(214).send('hello index there');
	res.end();
})

module.exports = router
