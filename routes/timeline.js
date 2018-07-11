var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');
const User = require('../models/user');

router.route('/user/:email/course/article')
	//get all articles for the timeline of a usere. 
	.get((req, res, next) => {
		var email = req.params.email;
		User.findOne({email:email},{}, function(err, user){
			Enrollment.find({user: user._id}).exec(function(err, enroll){
				if(err) return res.status(500).send('error occured in the database');
				else if(enroll.length == null) return res.status(404).send('no courses found');
				else {
					var array = enroll.map(c => c.theChosenModel.ModelId); 
					console.log(array); 
					Article.find({'theChosenModel.ModelId': {$in: array}})
							.populate('author')
							.populate('theChosenModel.ModelId')
							.sort({created_at: -1})
							.exec(function(err, articles){
								if (err){
									console.log('error occured in the database');
						        	return res.status(500).send('error occured in the database');
						       	}else {
									return res.status(200).send(articles); 
						       	}
							});
				}
			})
		})
	})

module.exports = router