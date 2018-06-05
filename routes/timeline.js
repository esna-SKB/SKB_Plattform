var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Course = require('../models/course');

router.route('/user/:email/course/article')
	//get all articles for the timeline of a usere. 
	.get((req, res, next) => {
		var email = req.params.email; 
		Course.find({user: email},{_id:0, name:1}, function(err, courses){
			if(err)
				return res.status(500).send('error occured in the database');
			else if(courses.length > 0){
				var array = courses.map(e => e.name); 
				Article.find({course: {$in: array}},{_id:0, course:1, headline:2, author:3, text:4, created_at:5},
				{$sort: {created_at: -1}}, function(err, articles){
					if (err){
						console.log('error occured in the database');
			        	return res.status(500).send('error occured in the database');
			       	}else {
						return res.status(200).send(articles); 
			       	}
				})
			}
		})
		
	})

module.exports = router