var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Course = require('../models/course');
const User = require('../models/user');

router.route('/course/:name')
	// get all articles of a course, sorted by most resently post
	.get((req, res, next) => {
		var cname = req.params.name;
		console.log(cname) 

		Course.findOne({name: cname}).exec(function(err, course){
			if (err) return res.status(500).send('error occured in the database');
			else if(course == null) return res.status(404).send('error occured in the database');
			else {
				Article.find({course: course}).populate('author').exec(function(err, articles){
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
	//post new Article
	.post((req, res, next) => {
		const { body } = req;
		const { course } = body;
		const { headline } = body;
		const { author } = body;
		const { text } = body;
		const { created_at } = body;
		console.log(course, author); 

		Course.findOne({name: course}).exec(function(err, courseE){
			if(err) return res.status(500).send('error occured in the database'); 
			else if(courseE == null ) return res.status(404).send('course could not be found'); 

			User.findOne({email:author}).exec(function(err, userE){
				if(err) return res.status(500).send('error occured in the database'); 
				else if(userE == null ) return res.status(404).send('author could not be found');
				// Save the new Article
				const newArticle = new Article();
				newArticle.course = courseE._id;
				newArticle.headline = headline;
				newArticle.author = userE._id;
				newArticle.text = text;
				newArticle.created_at = created_at;
				
				newArticle.save(function(err){
					if(err) return res.status(500).send('error occured in the database'); 
					else {
					return res.status(200).send({
						success: true,
						article: "new Article is saved"
						});
					}
				});

			})
		})
	})
	
	
	router.route('/:id')

		.get((req, res, next) => {
			var id = req.params.id;
			Article.findById(id).populate('teacher').populate('course').exec(function(err, article){
				if (err){
		        	return res.status(500).send('error occured in the database');
		       	}else {
					return res.status(200).send(article); 
		       	}
			})
		})

		.delete((req, res, next) => {
			var id = req.params.id;

			Article.deleteOne({_id:id}, function(err){
				if (err){
					console.log('error occured in the database');
		        	return res.status(500).send('error occured in the database');
		       	} else {
					return res.status(200).send({success : true, article : "Article is deleted"}); 
		       	}
			})
		})

	module.exports = router
