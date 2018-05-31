var express = require('express');
var router = express.Router();
const Article = require('../models/article');

router.route('/')
	//get all Articles
	.get((req, res, next) => {
		Article.find({},{_id:0, course:1, headline:2, author:3, text:4, created_at:5}, function(err, articles){
			if (err) {
				console.log('error occured in the database');
	        	return res.send('error occured in the database');
			} else {
				return res.send(articles); 
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


		
		// Save the new Article
		const newArticle = new Article();
		newArticle.course = course;
		newArticle.headline = headline;
		newArticle.author = author;
		newArticle.text = text;
		newArticle.created_at = created_at;
		
		newArticle.save(function(err){
			if(err) handleError(err); 
			else {
			return res.send({
				success: true,
				article: "new Article is saved"
				});
			}
		});
	})

router.route('course/:id')
	
	// get all articles between course and headline sorted by most resently posted
	.get((req, res, next) => {
		var id = req.params.course; 
		
		Article.find({course: course, headline:headline},{_id:0, course:1, headline:2, author:3, text:4, created_at:5},
		function(err, articles){
			if (err){
				console.log('error occured in the database');
	        	return res.send('error occured in the database');
	       	}else {
				return res.send(articles); 
	       	}
		})
	})

	router.route('/:id')

		.get((req, res, next) => {
			var id = req.params.id;
			Article.findById(id,{_id:0, course:1, headline:2, author:3, text:4, created_at:5}, function(err, article){
				if (err){
					console.log('error occured in the database');
		        	return res.send('error occured in the database');
		       	}else {
					return res.send(article); 
		       	}
			})
		})

		.delete((req, res, next) => {
			var id = req.params.id;

			Article.deleteOne({_id:id}, function(err){
				if (err){
					console.log('error occured in the database');
		        	return res.send('error occured in the database');
		       	} else {
					return res.send({success : true, article : "Article is deleted"}); 
		       	}
			})
		})

	module.exports = router
