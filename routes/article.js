var express = require('express');
var router = express.Router();
const Article = require('../models/article');
const Course = require('../models/course');
const User = require('../models/user');

router.route('/course/:name')
	// get all articles of a course, sorted by most resently post
	.get((req, res, next) => {
		var cname = req.params.name;

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
		//const { data } = body;
		const { type } = body;
		const { created_at } = body; //könnte auch automatisch gespeichert werden
		
		console.log(course, author);

		Course.findOne({name: course}).exec(function(err, courseE){
			if(err) return res.status(500).send('error occured in the database');
			else if(courseE == null ) {
				console.log(courseE)
				return res.status(404).send('course could not be found');
			}
			User.findOne({email:author}).exec(function(err, userE){
				if(err) return res.status(500).send('error occured in the database');
				else if(userE == null ) return res.status(404).send('author could not be found');
				// Save the new Article
				const newArticle = new Article();
				newArticle.course = courseE._id;
				newArticle.headline = headline;
				newArticle.author = userE._id;
				newArticle.text = text;
				//console.log(data);
				//newArticle.file = data;
				newArticle.type = type;
				newArticle.created_at = new Date();
				newArticle.save(function(err){
					if(err) return res.status(500).send('error occured in the database');
					else {
					return res.status(200).send({
						success: true,
						article: "new Article is saved",
						});
					}
				});

			})
		})
	})

	router.route('/:coursename/:author/:text').put((req, res, next) => {

		var kurs = req.params.coursename;
		var autor = req.params.author;
		var inhalt = req.params.text;
		var kursid = "";
		ObjectId = require('mongodb').ObjectId;

		Course.findOne({name: kurs}, function(err, foundCourse){
			if (err){
				console.log(err.message);
				res.status(500).send({
					success: false,
				})
			} else if(!foundCourse){
				console.log("Course not found (404)");
				res.status(404).send({
					success:false,
				});
			} else {
				kursid = ObjectId(foundCourse._id);
			}
		})

		console.log(kurs+"---"+autor+"---"+inhalt);

		User.findOne({email: autor}, function(err, foundUser){
			if(err){
				console.log('error occured in the database');
				res.status(500).send({
					success: false,
					message: 'Server Error'
				});
			} else if(!foundUser){
				console.log("no User found (404)");
				res.status(404).send({
					success: false,
					message: 'No User found (404)'
				});

			} else {
				userid =  ObjectId(foundUser._id);
				Article.findOne({course: kursid, author: userid, text: inhalt}, function(errr, foundArticle){
					if(errr){
						console.log(errr.message);
						res.status(500).send({
							success: false,
							message: 'Server Error'
						});
					} else if(!foundArticle){
						console.log('No matching Article found (404)');
						res.status(404).send({
							success: false,
							message: 'No matching Article found (404)'
						});
					} else {

						req.on('data', function (chunk) {
							console.log("Are you inside?");
							foundArticle.data += chunk;
						});

					  	req.on('end', function () {
					  		console.log("The end.")
					  		foundArticle.save((error, doc) => {
						        if (error) {
						          	console.log(err.message);
					            	res.status(500).send({
					            		success: false,
					            		message: 'Error: server error'
						          	});
						        }
						        else{
									
					    			console.log('File uploaded');

					    			res.writeHead(200);
					    			res.end();
									/*res.status(200).send({

										success: true,
										message: 'checked and updated User Session'
									});*/
								}
							});
					  	});


					}
				})
			}
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
