var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

router.route('/user/:email/course/:name')

	.post((req, res, next) => {
		var email = req.params.email; 
		var name = req.params.name; 
		User.findOne({email: email}, {_id:0}).exec(function(err, user){
			if (err) return res.status(500).send('');
			Course.findOne({name:name}, {_id:0}).exec(function(err, course){
				if(err) return res.status(500).send('');
				Enrollment.findOne({user:user._id, course:course._id}).exec(function(err, enroll){
					if(err) return res.status(500).send('');
					if(enroll != null) return res.status(401).send('');
					else{
						const newEnroll = new Enrollment();
						newEnroll.user = user._id;
						newEnroll.course = course._id; 
						newEnroll.save(function(err){
							if(err) handleError(err); 
							else {
							return res.status(200).send({
								success: true,
								message: "new Enrollment is saved"
								});
							}
						})
					}
				})
				
			})
		})
	})

module.exports = router
