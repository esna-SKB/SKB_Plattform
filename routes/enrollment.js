var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

router.route('/user/:email/course/:name')

	.post((req, res, next) => {
		var email = req.params.email; 
		var name = req.params.name; 

		User.findOne({email: email}, {}).exec(function(err, user){
			if (err) return res.status(500).send('1');
			if(user == null) return res.status(404).send('user does not exists');

			Course.findOne({name:name}, {}).exec(function(err, course){
				if(err) return res.status(500).send('2');
				if(course == null) return res.status(404).send('course does not exists');

				Enrollment.findOne({user:user._id, course:course._id}).exec(function(err, enroll){
					if(err) return res.status(500).send('');
					if(enroll != null) return res.status(404).send({success: false,message: 'enrollment allready exists'});
					else{
						var en = new Enrollment({user: user._id, course: course._id})
						en.save(function(err){
							if(err) return res.status(500).send('err'); 
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
